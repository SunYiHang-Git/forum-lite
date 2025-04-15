<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const emits = defineEmits<{
  (e: 'goPage', page: 'register' | 'forget'): void
}>()
interface RuleForm {
  username: string
  password: string
}

/** 是否记住状态 */
const isRememberStatus = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '此为必填项', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  console.log('ruleForm--->', ruleForm)
}

/** 忘记密码 */
const forgetPwd = () => {
  emits('goPage', 'forget')
}
/** 注册 */
const register = () => {
  emits('goPage', 'register')
}
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
        <k-form-item prop="username">
          <k-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="IconUser" />
        </k-form-item>
        <k-form-item prop="password">
          <k-input v-model="ruleForm.password" placeholder="请输入密码" type="password" prefix-icon="IconLock" />
        </k-form-item>
        <k-form-item>
          <k-row class="row-forget">
            <k-checkbox v-model="isRememberStatus">记住登录状态</k-checkbox>
            <k-button text @click="forgetPwd">忘记密码</k-button>
          </k-row>
        </k-form-item>
        <k-form-item>
          <k-button style="width: 100%" main @click="submitForm(ruleFormRef)">{{ $t('login.login') }}</k-button>
        </k-form-item>
        <k-form-item>
          <k-row class="immediately-register">
            没有账号？
            <k-button text @click="register">立即注册</k-button>
          </k-row>
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
    font-family: Alibaba PuHuiTi 3;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    color: #38363c;
  }
  .login-form {
    margin-top: 40px;
    .row-forget {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .immediately-register {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
</style>
