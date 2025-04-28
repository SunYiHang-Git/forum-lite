<script setup lang="ts">
import { useCI18n } from '@/i18n'
import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc, MD5 } from '@ksware/micro-lib-web-temp'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
const { ct, t } = useCI18n()
const emits = defineEmits<{
  (e: 'goPage', page: 'login'): void
}>()
interface RuleForm {
  phone: string
  password: string
  code: string
  username: string
}

const env = import.meta.env
const isDev = env.DEV

/** 是否记住状态 */
const isRememberStatus = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  phone: '',
  password: '',
  code: '',
  username: '',
})
// 定义手机号的正则表达式
const phonePattern = /^1[3-9]\d{9}$/
const rules = reactive<FormRules<RuleForm>>({
  phone: [
    { required: true, message: ct('login.phone', 'common.inputNoNull'), trigger: 'blur' },
    {
      pattern: phonePattern,
      message: t('common.checkTip', { cnt: ct('login.validity', 'login.phone') }),
      trigger: 'blur',
    },
  ],
  password: [{ required: true, message: ct('common.pwd', 'common.inputNoNull'), trigger: 'blur' }],
  code: [{ required: true, message: ct('login.verificationCode', 'common.inputNoNull'), trigger: 'blur' }],
  username: [
    { required: true, message: ct('login.username', 'common.inputNoNull'), trigger: 'blur' },
    {
      min: 1,
      max: 18,
      message: t('login.max18'),
      trigger: 'blur',
    },
  ],
})

const phoneCoseTime = ref<number>(0)
/** 获取手机号验证码 */
const getPhoneCode = async () => {
  if (!ruleForm.phone) return KMessage.warning(ct('login.phone', 'common.inputNoNull'))
  if (!phonePattern.test(ruleForm.phone))
    return KMessage.warning(t('common.checkTip', { cnt: ct('login.validity', 'login.phone') }))
  let timer: any = 0
  const data = { PhoneTo: ruleForm.phone, SendCodeType: 0 }
  try {
    const res: any = await callServerFunc('TRPADM', 'SendPhoneCode', data)
    if (isDev) {
      const { sPhoneCode } = res
      ruleForm.code = sPhoneCode
    }
    phoneCoseTime.value = 60
    timer = setInterval(() => {
      if (phoneCoseTime.value > 0) {
        phoneCoseTime.value--
      } else {
        clearInterval(timer) // 当倒计时结束时，清除定时器
      }
    }, 1000)
  } catch (error) {
    clearInterval(timer)
  }
}
/** 发送验证码文字 */
const sendCodeBtnText = computed(() => {
  if (phoneCoseTime.value > 0) {
    return ct('login.gain', 'login.verificationCode') + phoneCoseTime.value
  }
  return ct('login.gain', 'login.verificationCode')
})

/** 注册 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  const data = {
    PhoneTo: ruleForm.phone,
    PhoneCode: ruleForm.code,
    UserName: ruleForm.username,
    Pass: MD5(ruleForm.password),
    IsLite: true,
    icon: 'userIcon/avatar-default-' + 1 + '.jpg',
  }
  await callServerFunc('TRPADM', 'RPAUserRegister', data)
}

const goLogin = () => {
  emits('goPage', 'login')
}
</script>

<template>
  <div class="cloud-register">
    <div class="name">{{ $t('login.register') }}</div>
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
        <k-form-item prop="phone">
          <k-input
            v-model="ruleForm.phone"
            :placeholder="$t('common.checkTip', { cnt: $t('login.phone') })"
            prefix-icon="IconDeviceMobile"
          />
        </k-form-item>
        <k-form-item prop="password">
          <k-input
            v-model="ruleForm.password"
            :placeholder="$t('common.checkTip', { cnt: $t('common.pwd') })"
            type="password"
            prefix-icon="IconLock"
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
            <k-button :disabled="phoneCoseTime !== 0" @click="getPhoneCode" style="flex: 1">
              {{ sendCodeBtnText }}
            </k-button>
          </k-row>
        </k-form-item>
        <k-form-item prop="username">
          <k-input
            v-model="ruleForm.username"
            :placeholder="$t('common.checkTip', { cnt: $t('login.username') })"
            prefix-icon="IconUser"
          />
        </k-form-item>
        <k-form-item>
          <k-button style="width: 100%" main @click="submitForm(ruleFormRef)">{{ $t('login.register') }}</k-button>
        </k-form-item>
        <k-form-item>
          <k-row class="immediately-register">
            {{ $ct('login.have', { pt: true }, 'login.account') }}？
            <span @click="goLogin">{{ $ct('login.immediately', 'login.login') }}</span>
          </k-row>
        </k-form-item>
      </k-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cloud-register {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
  overflow: hidden;
  .name {
    font-family: Alibaba PuHuiTi 3;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: 0em;
    color: #38363c;
    margin-bottom: 20px;
  }
  .form-box {
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
