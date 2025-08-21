<script setup lang="ts">
import { SendEMailCodeAPI } from '@/api/user'
import { MailText } from '@/const/home'
import { isEmailStrict } from '@/utils/check'
import { KMessage } from '@ksware/ksw-ux'
import { computed, onBeforeUnmount, ref } from 'vue'
const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)
const env = import.meta.env
/** 身份验证 验证码 */
const authenticationValue = ref('')

/** 邮箱号 */
const emailValue = ref('')

/** 旧密码 */
const pastPwd = ref('')
/** 新密码 */
const newPwd = ref('')
/** 确认新密码 */
const confirmPwd = ref('')

/** 是否禁用倒计时按钮 */
const isDisabledCode = ref(false)
/** 倒计时 */
const countdown = ref(0)
/** 验证码文字 */
const codeMsg = computed(() => {
  if (countdown.value > 0) {
    return `重新获取（${countdown.value})`
  }
  return '获取验证码'
})

/** 获取验证码 */
let timer: number | null = null
/** 取消倒计时定时器 */
function clearTimer() {
  if (timer !== null) {
    clearInterval(Number(timer))
  }
  timer = null
  countdown.value = 0
  authenticationValue.value = ''
  isDisabledCode.value = false
}
/** 获取验证码---验证码 */
const getEMailCodeFn = async (eMail: string, sendCodeType: number) => {
  try {
    const data = await SendEMailCodeAPI({
      MailTo: eMail,
      PhoneTo: eMail,
      SendCodeType: sendCodeType,
      MailText,
      IsSend: true,
    })
    const { sPhoneCode } = data
    countdown.value = 60
    isDisabledCode.value = true
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value = countdown.value - 1
      } else {
        clearTimer()
      }
    }, 1000)
    return sPhoneCode
  } catch (error) {
    clearTimer()
  }
}
/** 验证身份 */
const checkIdentify = async () => {
  const code = await getEMailCodeFn(params.email, 2)
  authenticationValue.value = code
}
/** 修改密码---验证码 */
const editEMail = async () => {
  const code = await getEMailCodeFn(emailValue.value, 0)
  authenticationValue.value = code
}
/** 取消 */
const handleClose = () => {
  params.cancel?.()
}
// 验证码检查
const checkAuthenticationValue = () => {
  const sixDigitsRegex = /^[A-Za-z\d]{6}$/
  if (!sixDigitsRegex.test(authenticationValue.value)) {
    KMessage.warning('请输入六位有效验证码!')
    return false
  }
  return true
}

// 手机号检查
const checkEMail = () => {
  if (!isEmailStrict(emailValue.value)) {
    return false
  }
  return true
}

// 密码检查
const checkPassword = (pwd: string, msg: string) => {
  if (!pwd) {
    KMessage.warning(msg)
    return false
  }
  return true
}
/** 提交 */
const onSubmit = () => {
  switch (params.type) {
    case 'authentication':
      if (!checkAuthenticationValue()) return
      params.confirm?.(authenticationValue.value)
      break

    case 'editEMail':
      if (!checkEMail() || !checkAuthenticationValue()) return
      params.confirm?.({ eMail: emailValue.value, code: authenticationValue.value })
      break

    case 'editPassWord':
      if (
        !checkPassword(pastPwd.value, '请输入有效的旧密码!') ||
        !checkPassword(newPwd.value, '请输入新密码!') ||
        !checkPassword(confirmPwd.value, '请输入确认密码!')
      ) {
        return
      }

      if (newPwd.value !== confirmPwd.value) {
        KMessage.warning('确认密码与新密码不一致,请重新输入!')
        newPwd.value = ''
        confirmPwd.value = ''
        pastPwd.value = ''
        return
      }
      params.confirm?.({ pastPwd: pastPwd.value, newPwd: newPwd.value })
      break

    default:
      break
  }
  clearTimer()
}

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <k-dialog v-model="dialogVisible" width="600" class="info-dialog" :show-close="false">
    <template #header>
      <div class="my-header">
        <div class="dialog-title">{{ params.title }}</div>
        <k-button @click="handleClose" text color="#484848">
          <IconClose :size="20" />
        </k-button>
      </div>
    </template>
    <template #default>
      <div class="desc">{{ params.desc }}</div>
      <!-- 身份验证 -->
      <div v-if="params.type === 'authentication'" class="authentication-box">
        <k-input v-model="authenticationValue" size="lg" />
        <k-button :disabled="isDisabledCode" size="lg" @click="checkIdentify">{{ codeMsg }}</k-button>
      </div>
      <!-- 修改邮箱号 -->
      <div v-if="params.type === 'editEMail'" class="edit-phone-box">
        <div class="phone">
          <k-input v-model="emailValue" placeholder="请输入邮箱号" size="lg" />
        </div>
        <div class="code-box">
          <k-input v-model="authenticationValue" placeholder="请输入验证码" size="lg" />
          <k-button :disabled="isDisabledCode" size="lg" @click="editEMail">
            {{ codeMsg }}
          </k-button>
        </div>
      </div>
      <!-- 修改密码 -->
      <div v-if="params.type === 'editPassWord'" class="edit-pwd-box">
        <k-input v-model="pastPwd" type="password" placeholder="请输入旧密码" size="lg" />
        <k-input v-model="newPwd" type="password" placeholder="请输入新密码" size="lg" />
        <k-input v-model="confirmPwd" type="password" placeholder="确认新密码" size="lg" />
      </div>
    </template>
    <template #footer>
      <div class="btn-box">
        <k-button @click="handleClose">取 消</k-button>
        <k-button main @click="onSubmit">确 定</k-button>
      </div>
    </template>
  </k-dialog>
</template>

<style lang="scss" scoped>
.info-dialog {
  .my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dialog-title {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      color: #171717;
    }
  }
  .desc {
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    color: #736f78;
    margin-bottom: 20px;
    white-space: wrap;
  }
  .authentication-box {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
    width: 100%;
    .k-button {
      width: 220px;
      height: 38px;
    }
  }
  .edit-phone-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 16px;
    width: 100%;
    .phone {
      width: 100%;
    }
    .code-box {
      display: flex;
      justify-content: start;
      gap: 16px;
      align-items: center;
      width: 100%;
      .k-button {
        width: 220px;
      }
    }
  }
  .edit-pwd-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 16px;
  }
  .btn-box {
    margin-top: 15px;
    width: 100%;
    .k-button {
      width: 120px;
    }
  }
}
</style>
