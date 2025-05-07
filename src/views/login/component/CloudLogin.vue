<script setup lang="ts">
import { maturityDays } from '@/utils/format'
import { callServerFunc, MD5, setToken } from '@ksware/micro-lib-web-temp'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useUser } from '@/store/modules/user'
import { loginByAccountAPI, RPALitePhoneCodeLoginAPI } from '@/api/login'
import { KMessage } from '@ksware/ksw-ux'
import { useCI18n } from '@/i18n'
const { ct, t } = useCI18n()

const emits = defineEmits<{
  (e: 'goPage', page: 'register' | 'forget'): void
  (e: 'loginSuccess'): void
}>()
interface RuleForm {
  phone: string
  account: string
  password: string
}

const { setUserInfo } = useUser()

/** 是否记住状态 */
const isRememberStatus = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  phone: '',
  account: '',
  password: '',
})
const rules = reactive<FormRules<RuleForm>>({
  account: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  phone: [{ required: true, message: '此为必填项', trigger: 'blur' }],
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

// 定义手机号的正则表达式
const phonePattern = /^1[3-9]\d{9}$/

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
    if (!ruleForm.phone) return KMessage.warning('请输入手机号')
    if (!phonePattern.test(ruleForm.phone)) return KMessage.warning('请输入有效手机号')
    const codeReg = /[\d]{6}/
    if (!codeReg.test(verificationCode.value)) {
      KMessage.warning('请输入有效验证码')
      return
    }
    const par = { loginType: 1, Phone: ruleForm.phone, PhoneCode: verificationCode.value }
    res = await RPALitePhoneCodeLoginAPI(par)
  }
  const userInfoObj = {
    ...res,
    rememberInfo: isRememberStatus.value,
  }
  setUserInfo(userInfoObj)
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

let timer: number | null = null
/** 倒计时 */
const countdown = ref(0)
/** 是否禁用倒计时按钮 */
const isDisabledCode = ref(false)
/** 取消倒计时定时器 */
function clearTimer() {
  if (timer !== null) {
    clearInterval(Number(timer))
  }
  timer = null
  countdown.value = 0
  isDisabledCode.value = false
}
/** 验证码文字 */
const codeMsg = computed(() => {
  if (countdown.value > 0) {
    return `重新获取（${countdown.value})`
  }
  return '获取验证码'
})
/** 获取验证码--登录 */
const handleGetCode = async () => {
  if (!ruleForm.phone) return KMessage.warning(ct('login.phone', 'common.inputNoNull'))
  if (!phonePattern.test(ruleForm.phone))
    return KMessage.warning(t('common.checkTip', { cnt: ct('login.validity', 'login.phone') }))
  try {
    const data = { PhoneTo: ruleForm.phone, SendCodeType: 2 }
    const res: any = await callServerFunc('TRPADM', 'SendPhoneCode', data)
    console.log('res--->', res)
    if (import.meta.env.DEV) {
      const { sPhoneCode } = res.data
      verificationCode.value = sPhoneCode
    }
    countdown.value = 60
    isDisabledCode.value = true
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value = countdown.value - 1
      } else {
        clearTimer()
      }
    }, 1000) as any
  } catch (error) {
    clearTimer()
  }
}

onUnmounted(() => {
  clearTimer()
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
        <k-form-item v-if="isCodeLogin" prop="phone">
          <k-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="IconUser" />
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
            <k-button :disabled="isDisabledCode" @click="handleGetCode" style="width: 120px">{{ codeMsg }}</k-button>
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
