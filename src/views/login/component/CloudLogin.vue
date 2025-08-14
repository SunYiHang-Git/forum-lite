<script set,p lang="ts">
import { maturityDays } from '@/utils/format'
import { callServerFunc, MD5, setToken } from '@ksware/micro-lib-web-temp'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useUser } from '@/store/modules/user'
import { loginByAccountAPI, RPALiteEMailCodeLoginAPI } from '@/api/login'
import { KMessage } from '@ksware/ksw-ux'
import { useCI18n } from '@/i18n'
import { addTokenActiveTime } from '@/api/home'
import { useCountdown } from '@/hooks/useCountdown'
import { MailText } from '@/const/home'
const { ct, t } = useCI18n()

const emits = defineEmits<{
  (e: 'goPage', page: 'register' | 'forget'): void
  (e: 'loginSuccess'): void
}>()
interface RuleForm {
  eMail: string
  account: string
  password: string
}
const { isCounting, seconds, startCountdown, clearLocalTempCache } = useCountdown(60, 'cloudLogin-forum')
// 定义邮箱的正则表达式
const eMailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const { setUserInfo, exitLogin } = useUser()
exitLogin()

/** 是否记住状态 */
const isRememberStatus = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  eMail: '',
  account: '',
  password: '',
})
const rules = reactive<FormRules<RuleForm>>({
  account: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  eMail: [
    { required: true, message: '此为必填项', trigger: 'blur' },
    {
      pattern: eMailPattern,
      message: t('common.checkTip', { cnt: ct('login.validity', 'login.eMail') }),
      trigger: 'blur',
    },
  ],
})

/** 验证码 */
const verificationCode = ref('')

/** 是否验证码登录 */
const isCodeLogin = ref(false)
const loginTextMsg = computed(() => {
  if (isCodeLogin.value) {
    return '密码登录'
  } else {
    return '验证码登录'
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  let res = {}
  if (!isCodeLogin.value) {
    // 账号密码登录
    if (!formEl) return
    await formEl.validate()
    const params = {
      IsForumLogin: true,
      IsLite: true,
      User: ruleForm.account,
      Pass: MD5(ruleForm.password),
    }
    res = await loginByAccountAPI(params)
  } else {
    // 验证码登录
    if (!ruleForm.eMail) return KMessage.warning('请输入邮箱')
    if (!eMailPattern.test(ruleForm.eMail)) return KMessage.warning('请输入有效的邮箱')
    const codeReg = /^[a-zA-Z0-9]{6}$/
    if (!codeReg.test(verificationCode.value)) {
      KMessage.warning('请输入有效验证码')
      return
    }
    const par = { MailTo: ruleForm.eMail, EmailCode: verificationCode.value, IsLite: true }
    res = await RPALiteEMailCodeLoginAPI(par)
  }
  const userInfoObj = {
    ...res,
    rememberInfo: isRememberStatus.value,
  }
  setUserInfo(userInfoObj)
  addTokenActiveTime()
  emits('loginSuccess')
}

/** 忘记密码 */
const forgetPwd = () => {
  emits('goPage', 'forget')
}
/** 注册 */
const register = () => {
  emits('goPage', 'register')
}
/** 验证码文字 */
const codeMsg = computed(() => {
  if (seconds.value > 0) {
    return `${t('login.retrieve')}（${seconds.value})`
  }
  return ct('login.gain', 'login.verificationCode')
})
/** 获取验证码--登录 */
const handleGetCode = async () => {
  if (!ruleForm.eMail) return KMessage.warning(ct('login.eMail', 'common.inputNoNull'))
  if (!eMailPattern.test(ruleForm.eMail))
    return KMessage.warning(t('common.checkTip', { cnt: ct('login.validity', 'login.eMail') }))
  const data = { PhoneTo: ruleForm.eMail, MailTo: ruleForm.eMail, SendCodeType: 2, MailText, IsSend: true }
  try {
    const res: any = await callServerFunc('TRPADM', 'SendSecurityCode', data)
    startCountdown()
    if (import.meta.env.DEV) {
      const { sPhoneCode } = res.data
      verificationCode.value = sPhoneCode
    }
  } catch (error) {
    console.error(error)
  }
}

onUnmounted(() => {
  clearLocalTempCache()
})
</script>

<template>
  <div class="login-box">
    <div class="header-title">登录</div>
    <div class="login-form">
      <k-form
        ref="ruleFormRef"
        style="max-width: 500px"
        label-width="0"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <k-form-item v-if="!isCodeLogin" prop="account">
          <k-input v-model="ruleForm.account" placeholder="请输入账号" prefix-icon="IconUser" />
        </k-form-item>
        <k-form-item v-if="isCodeLogin" prop="eMail">
          <k-input v-model="ruleForm.eMail" placeholder="请输入邮箱" prefix-icon="IconUser" />
        </k-form-item>
        <k-form-item v-if="!isCodeLogin" prop="password">
          <k-input v-model="ruleForm.password" placeholder="请输入密码" type="password" prefix-icon="IconLock" />
        </k-form-item>
        <k-form-item v-if="isCodeLogin">
          <k-row class="item-box">
            <k-input
              v-model="verificationCode"
              :placeholder="$t('common.checkTip', { cnt: $t('login.verificationCode') })"
              prefix-icon="IconShield"
              style="flex: 1"
            />
            <k-button :disabled="isCounting" @click="handleGetCode" style="width: 120px">{{ codeMsg }}</k-button>
          </k-row>
        </k-form-item>
        <k-form-item>
          <k-row class="row-forget">
            <k-checkbox v-model="isRememberStatus">记住登录状态</k-checkbox>
            <k-button text @click="isCodeLogin = !isCodeLogin">{{ loginTextMsg }}</k-button>
          </k-row>
        </k-form-item>
        <k-form-item>
          <k-button style="width: 100%" main @click="submitForm(ruleFormRef)">{{ $t('login.login') }}</k-button>
          <div class="immediately-register">
            没有账号？
            <k-button text @click="register">立即注册</k-button>
          </div>
          <div class="forget-text">
            <k-button text @click="forgetPwd">忘记密码</k-button>
          </div>
        </k-form-item>
      </k-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
  .header-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    color: #38363c;
  }
  .login-form {
    margin-top: 16px;
    .row-forget {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .immediately-register {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 12px;
    }
    .forget-text {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 20px;
    }
  }
}
</style>
