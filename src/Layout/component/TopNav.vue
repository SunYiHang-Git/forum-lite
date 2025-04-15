<script setup lang="ts">
import logoSvg from '@/assets/svg/logo.svg'
import { ref } from 'vue'

const searchValue = ref<string>('')
const activeName = ref('community')
// 获取 url
function getWindowUrl() {
  const a = window.location.href
  console.log('a--->', a)
}
getWindowUrl()
const menuList = ref([
  {
    name: 'home',
    label: '首页',
    src: 'https://krpalite.com/',
  },
  {
    name: 'document',
    label: '文档',
    src: 'https://krpalite.com/HelpDoc/Conditional/IF%20Condition',
  },
  {
    name: 'community',
    label: '社区',
    src: 'http://192.168.104.11:8071/',
  },
])
const routerToPage = (name: string, src: string) => {
  activeName.value = name
  if (name === 'community') return
  window.open(src)
}
</script>

<template>
  <div class="top-nav">
    <div class="logo-box">
      <div class="logo">
        <img :src="logoSvg" />
      </div>
      <div class="logo-title">K-RPA Lite 社区</div>
    </div>
    <div class="top-menu">
      <k-button
        text
        v-for="(item, index) in menuList"
        :key="index"
        class="link"
        :color="activeName === item.name ? '#0A5CFF' : '#171717'"
        @click="routerToPage(item.name, item.src)"
      >
        {{ item.label }}
      </k-button>
      <!-- <k-button text class="link" color="#000" @click="routerToPage('document')">文档</k-button>
      <k-button text class="link" color="#000" @click="routerToPage('community')">社区</k-button> -->
    </div>
    <div class="search-box">
      <KInput v-model="searchValue" style="width: 180px" placeholder="搜索..." suffix-icon="IconSearch" />
    </div>
    <div class="opt-but">
      <k-button text>登录</k-button>
      <k-button main>注册</k-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 60px;
  .logo-box {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 15px;
    width: fit-content;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 30px;
    }
    .logo-title {
      font-family: Alibaba PuHuiTi 3;
      font-size: 22.59px;
      font-weight: bold;
      color: #000;
    }
  }
  .top-menu {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 40px;
    gap: 32px;
    .link {
      font-family: Alibaba PuHuiTi 3;
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
    }
  }
  .search-box {
    flex: 1;
    display: flex;
    justify-content: end;
  }
  .opt-but {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 32px;
    gap: 32px;
    .k-button {
      font-size: 14px;
    }
  }
}
</style>
