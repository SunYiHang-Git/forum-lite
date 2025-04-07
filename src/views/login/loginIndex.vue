<script setup>
import {
  callServerFunc,
  encryptByDES,
  getToken,
  MD5,
  removeToken,
  saveUserInfo,
  setToken,
} from '@ksware/micro-lib-web-temp/index'
import { ref } from 'vue'

import { delRouteCache } from '@/store/routerCache'
import router from '@/utils/router'
import { clearLocalStorage, clearSessionStorage, setSessionStorage } from '@/utils/auth'

// 打开页面时清空原有Token
clearSessionStorage()
clearLocalStorage()
const formData = ref({
  user: '',
  pass: '',
})

const formRef = ref('')

const loginAPI = async () => {
  if (!formRef.value) return
  await formRef.value.validate()
  const data = { IsForumLogin: true, User: formData.value.user, Pass: MD5(formData.value.pass) }
  const res = await callServerFunc('TRPADM', 'RPAUserLogin', data)
  setToken(res.data.Token)
  setSessionStorage('userLogin', res.data)
  router.push('/')
  delRouteCache('/login')
}
</script>
<template>
  <AppContainer>
    <div class="login-container">
      <div class="title-div">
        <p>登录RPA账号</p>
      </div>
      <el-form ref="formRef" :model="formData" size="default" label-width="80px" status-icon>
        <el-form-item label="登录名称" prop="user" :rules="[{ required: true, message: '登录名称不能为空' }]">
          <el-input v-model="formData.user" placeholder="请输入用户登录名称" />
        </el-form-item>
        <el-form-item label="登录密码" prop="pass" :rules="[{ required: true, message: '登录密码不能为空' }]">
          <el-input
            v-model="formData.pass"
            placeholder="请输入用户登录密码"
            type="password"
            @keydown.enter="loginAPI"
          />
        </el-form-item>
        <el-form-item label="">
          <el-form-item>
            <el-button type="primary" @click="loginAPI">登录</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </AppContainer>
</template>
<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  padding: 30px 80px 50px;
  border-radius: 5px;

  box-shadow: 0 0 2px 2px #eee;

  .title-div {
    margin-top: 0;
    margin-bottom: 50px;

    font-size: 22px;
    color: #333;
    text-align: center;
  }
}
</style>
