<script setup lang="ts">
import logoSvg from '@/assets/svg/logo.svg'
import { nextTick, onMounted, ref } from 'vue'
import { useUser } from '@/store/modules/user'
import { KMessageBox } from '@ksware/ksw-ux'
import { useRouter } from 'vue-router'
import { clearLocalStorage, clearSessionStorage } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { helpDocumentUel, liteHomeUrl } from '@/views/home'
import { MD5 } from '@ksware/micro-lib-web-temp'
const { clearUserInfoStore } = useUser()
const { userInfo } = storeToRefs(useUser())
const router = useRouter()
const searchValue = ref<string>('')
const menuList = ref([
  {
    name: 'home',
    label: '首页',
    src: liteHomeUrl,
    color: '#171717',
  },
  {
    name: 'document',
    label: '文档',
    src: helpDocumentUel,
    color: '#171717',
  },
  {
    name: 'community',
    label: '社区',
    src: '/home',
    color: '#0A5CFF',
  },
])

const userDownList = ref([
  {
    label: '我的主页',
    name: 'myHome',
    click: myHome,
  },
  {
    label: '我的发表',
    name: 'myPublish',
  },
  {
    label: '我的收藏',
    name: 'myCollect',
  },
  {
    label: '账号资料',
    name: 'accountInformation',
    click: accountInfo,
  },
  {
    label: '退出',
    name: 'exit',
  },
])
/** 账号资料 */
function accountInfo() {
  router.push('/user-info')
}
/** 我的主页 */
function myHome() {
  router.push('/user')
}
const routerToPage = (name: string, src: string) => {
  if (src === '') return
  if (name === 'community') {
    router.push(src)
    return
  }
  window.open(src)
}
/** 退出登录 */
async function layout() {
  await KMessageBox.confirm('是否确认退出?', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  clearUserInfoStore()
  clearLocalStorage()
  clearSessionStorage()
  await nextTick()
  // TODO 是否清楚路由
  // router.replace('/login')
}
function handleCommand(name: string) {
  switch (name) {
    case 'exit':
      layout()
      return

    default:
      return
  }
}

/** 去登录 */
function goLogin() {
  router.push({ path: '/login', query: { type: 'login' } })
}
/** 去注册 */
function goRegister() {
  router.push({ path: '/login', query: { type: 'register' } })
}

/** 发帖 */
const postArticle = async () => {
  router.push('/article/' + MD5('add'))
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
        :color="item.color"
        @click="routerToPage(item.name, item.src)"
      >
        {{ item.label }}
      </k-button>
    </div>
    <div class="search-box">
      <KInput v-model="searchValue" style="width: 180px" placeholder="搜索..." suffix-icon="IconSearch" />
    </div>
    <div v-if="!userInfo.loginStatus" class="opt-but">
      <k-button text @click="goLogin">登录</k-button>
      <k-button main @click="goRegister">注册</k-button>
    </div>
    <div v-if="userInfo.loginStatus" class="opt-but">
      <k-button text color="#000" @click="postArticle">发帖</k-button>
      <k-button text color="#000">消息</k-button>

      <k-dropdown trigger="click" @command="handleCommand">
        <template #title>
          <div class="user-box dfc">
            <div class="icon dfc">{{ userInfo.userName?.slice(0, 1) || '' }}</div>
            <div class="user-name dfc">{{ userInfo.userName }}</div>
          </div>
        </template>
        <template #default>
          <k-dropdown-item v-for="(item, index) in userDownList" :key="index" :command="item.name">
            <div @click="item.click" style="width: 100%; display: flex; justify-content: center">
              {{ item.label }}
            </div>
          </k-dropdown-item>
        </template>
      </k-dropdown>
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
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
    width: fit-content;
    gap: 10px;
    .k-button {
      font-size: 14px;
    }
    .user-box {
      max-width: 130px;
      height: 30px;
      justify-content: start;
      gap: 4px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        color: #fff;
        background-color: #05bfee;
        overflow: hidden;
      }
      .user-name {
        justify-content: start;
        max-width: 100px;
        height: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
