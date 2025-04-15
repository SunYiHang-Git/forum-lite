<script setup lang="ts">
import imgBg from '@/assets/images/login_bg.png'
import CloudLogin from './component/index.vue'
</script>

<template>
  <div class="login-big-box dfc">
    <div class="login-box">
      <div class="title-box">
        <div class="k">K</div>
        <div class="title">K-RPA Lite</div>
      </div>
      <div class="content dfc">
        <div class="login-bg">
          <div class="bg">
            <img :src="imgBg" />
          </div>
        </div>
        <div class="login-form-box">
          <div class="main">
            <CloudLogin />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-big-box {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: gradient(238deg, rgba(239, 246, 255, 0.5) 2%, rgba(245, 243, 255, 0.5) 100%), #ffffff;
}
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 1200px;
  min-width: 800px;
  width: 100%;
  height: 100%;
  .title-box {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    width: fit-content;
    height: 50px;
    .k {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      background: #2882ff;
      color: #fff;
    }
    .title {
      font-family: Alibaba PuHuiTi 3;
      font-size: 20px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: 0em;
      color: #38363c;
    }
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .login-bg {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 50%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    .bg {
      max-width: 23.75rem;
      min-width: 10rem;
      height: 100%;
      max-height: 33.75rem;
      aspect-ratio: 38/54;
      box-sizing: border-box;
      padding-right: 20px;
      overflow: hidden;
    }
  }
  .login-form-box {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 50%;
    min-width: 23.75rem;
    height: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    .main {
      width: 380px;
      height: 540px;
      border-radius: 16px;
      background-color: #fff;
      margin-bottom: 2rem;
      box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
      overflow: hidden;
    }
  }
}
</style>
