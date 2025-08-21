<script setup lang="ts">
import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc, MD5 } from '@ksware/micro-lib-web-temp'
import { computed, nextTick, onUnmounted, reactive, ref } from 'vue'
import { useCI18n } from '@/i18n'
import type { FormInstance, FormRules } from 'element-plus'
import { useCountdown } from '@/hooks/useCountdown'
import { MailText } from '@/const/home'
const { ct, t } = useCI18n()
interface RuleForm {
  eMail: string
  password: string
  code: string
}
const env = import.meta.env
const isDev = env.DEV

const emits = defineEmits<{
  (e: 'goPage', page: 'login'): void
}>()
const { isCounting, seconds, startCountdown, clearLocalTempCache } = useCountdown(60, 'forget-forum')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  eMail: '',
  password: '',
  code: '',
})
// 定义邮箱/手机号的正则表达式
const phonePattern = /^(1[3-9]\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const rules = reactive<FormRules<RuleForm>>({
  eMail: [
    { required: true, message: t('login.eMail') + '/' + t('login.phone') + t('common.inputNoNull'), trigger: 'blur' },
    {
      pattern: phonePattern,
      message: t('common.checkTip', { cnt: ct('login.validity', 'login.eMail') }) + '/' + t('login.phone'),
      trigger: 'blur',
    },
  ],
  password: [{ required: true, message: ct('common.pwd', 'common.inputNoNull'), trigger: 'blur' }],
  code: [
    { required: true, message: ct('login.verificationCode', 'common.inputNoNull'), trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6}$/,
      message: ct('common.checkTip', 'login.validity', 'login.verificationCode'),
      trigger: 'blur',
    },
  ],
})
/** 获取手机号验证码 */
const getPhoneCode = async () => {
  if (!ruleForm.eMail) return KMessage.warning(ct('login.eMail', 'common.inputNoNull'))
  if (!phonePattern.test(ruleForm.eMail))
    return KMessage.warning(t('common.checkTip', { cnt: ct('login.validity', 'login.eMail') + '/' + t('login.eMail') }))
  const data = { PhoneTo: ruleForm.eMail, MailTo: ruleForm.eMail, SendCodeType: 1, MailText, IsSend: true }
  try {
    const res: any = await callServerFunc('TRPADM', 'SendSecurityCode', data)
    startCountdown()
    if (isDev) {
      const { sPhoneCode } = res
      ruleForm.code = sPhoneCode
    }
  } catch (error) {
    console.error(error)
  }
}
/** 发送验证码文字 */
const sendCodeBtnText = computed(() => {
  if (seconds.value > 0) {
    return `${t('login.retrieve')}（${seconds.value})`
  }
  return ct('login.gain', 'login.verificationCode')
})

/** 去登录页 */
const goLogin = () => {
  emits('goPage', 'login')
}

/** 重置密码 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    const data = {
      MailTo: ruleForm.eMail,
      MailCode: ruleForm.code,
      Pass: MD5(ruleForm.password),
      TextPass: ruleForm.password,
    }
    await callServerFunc('TRPADM', 'RPAUserForget', data)
    KMessage.success(ct('login.reset', 'common.pwd', 'login.success', { pt: true }))
    await nextTick()
    goLogin()
  } catch (error) {
    console.error(error)
  } finally {
    clearLocalTempCache()
  }
}

/** 是否禁用确定按钮 */
const isDisabledSubmitBtn = computed(() => {
  return !ruleForm.eMail || !ruleForm.password || !ruleForm.code
})
/** 是否展示密码 */
const isShowPwd = ref<boolean>(false)

onUnmounted(() => {
  clearLocalTempCache()
})
</script>

<template>
  <div class="forget-pwd">
    <div class="go-back" @click="goLogin">
      <IconLeft />
      返回
    </div>
    <div class="name">{{ ct('login.reset', 'common.pwd') }}</div>
    <div class="form-box">
      <k-form
        ref="ruleFormRef"
        style="width: 100%"
        label-width="0"
        :model="ruleForm"
        :rules="rules"
        :hide-required-asterisk="true"
        class="demo-ruleForm"
        status-icon
      >
        <k-form-item prop="eMail">
          <k-input
            v-model.trim="ruleForm.eMail"
            :placeholder="$t('common.checkTip', { cnt: $t('login.eMail') }) + '/' + $t('login.phone')"
            prefix-icon="IconUser"
          />
        </k-form-item>
        <k-form-item prop="code">
          <k-row class="code-box">
            <k-input
              v-model="ruleForm.code"
              :placeholder="$t('common.checkTip', { cnt: $t('login.verificationCode') })"
              prefix-icon="IconShield"
              style="width: 50%"
            />
            <k-button :disabled="isCounting" style="flex: 1" @click="getPhoneCode">
              {{ sendCodeBtnText }}
            </k-button>
          </k-row>
        </k-form-item>
        <k-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            :placeholder="$t('common.checkTip', { cnt: $t('common.pwd') })"
            :type="isShowPwd ? 'text' : 'password'"
            prefix-icon="IconLock"
          >
            <template #suffix>
              <el-icon @click="() => (isShowPwd = !isShowPwd)">
                <IconEye v-if="isShowPwd" />
                <IconEyeOff v-if="!isShowPwd" />
              </el-icon>
            </template>
          </el-input>
        </k-form-item>

        <k-form-item>
          <k-button :disabled="isDisabledSubmitBtn" style="width: 100%" main @click="submitForm(ruleFormRef)">
            {{ $ct('login.reset', 'common.pwd') }}
          </k-button>
        </k-form-item>
        <!-- <k-form-item>
          <k-row class="immediately-register">
            <span @click="goLogin">{{ $ct('common.goBack', 'login.login') }}</span>
          </k-row>
        </k-form-item> -->
      </k-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forget-pwd {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: hidden;
  .go-back {
    width: fit-content;
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    color: #111827;
    cursor: pointer;
  }
  .name {
    margin-top: 16px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: 0em;
    color: #38363c;
  }
  .form-box {
    margin-top: 16px;
    .code-box {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 10px;
      width: 100%;
    }
    .immediately-register {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-family: Alibaba PuHuiTi 2;
      font-size: 14px;
      color: #6b7280;
      span {
        color: #2882ff;
        cursor: pointer;
      }
    }
  }
}
</style>
