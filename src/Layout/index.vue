<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TopNav from './component/TopNav.vue'
import { useUser } from '@/store/modules/user'
import { getToken, setToken } from '@ksware/micro-lib-web-temp'
const { userInfo } = storeToRefs(useUser())
function init() {
  /** 解决记住密码登录问题 */
  const { rememberInfo, token } = userInfo.value
  if (!rememberInfo) return
  if (getToken()) return
  /** 没有 token 才存 token */
  setToken(token)
}
init()
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header>
        <TopNav />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: center;
  max-width: 100vw;
  min-height: 100vh;
  min-width: 1280px;
  box-sizing: border-box;
  .el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;
    .el-header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 60px;
      padding: 0;
      display: flex;
      justify-content: center;
      z-index: 999;
      background-color: #fff;
      border-bottom: 1px solid rgb(242, 243, 245);
    }
    .el-main {
      margin-top: 60px;
      min-height: calc(100vh - 60px);
      flex: 1;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow: visible;
    }
  }
}
</style>
