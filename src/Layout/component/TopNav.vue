<script setup lang="ts">
import logoSvg from '@/assets/svg/logo.svg'
import { nextTick, onMounted, ref } from 'vue'
import { useUser } from '@/store/modules/user'
import { KMessageBox } from '@ksware/ksw-ux'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { helpDocumentUel, liteHomeUrl } from '@/views/home'
import { MD5 } from '@ksware/micro-lib-web-temp'
import { useRouterInfo } from '@/store/modules/useRouterInfo'
import MessageInfo from './MessageInfo.vue'
import { GetRPAUserAPI } from '@/api/login'
const { clearBreadcrumbList } = useRouterInfo()
const { userInfo } = storeToRefs(useUser())
const router = useRouter()
const searchValue = ref<string>('')
const menuList = ref([
  // {
  //   name: 'home',
  //   label: '首页',
  //   src: liteHomeUrl,
  //   color: '#171717',
  // },
  {
    name: 'community',
    label: '首页',
    src: '/home',
    color: '#0A5CFF',
  },
  {
    name: 'document',
    label: '帮助文档',
    src: helpDocumentUel,
    color: '#171717',
  },
])

const userDownList = ref([
  {
    label: '我的主页',
    name: 'myHome',
    click: myHome,
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
  const { exitLogin } = useUser()
  exitLogin()
  clearBreadcrumbList()
  // await nextTick()
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
  router.push('/article/add/' + MD5('add'))
}

/** 获取用户信息 */
const getUserInfo = async () => {
  const { setUserInfo } = useUser()
  try {
    const data = await GetRPAUserAPI({ isShowErrorMsg: false })
    setUserInfo(data)
  } catch (error) {
    // 退出登录
    const { exitLogin } = useUser()
    exitLogin()
    clearBreadcrumbList()
  }
}
getUserInfo()
</script>

<template>
  <div class="top-nav">
    <div class="logo-box">
      <div class="logo" @click="routerToPage('home', liteHomeUrl)">
        <img :src="logoSvg" />
      </div>
      <div class="w-[1px] h-5 bg-gray-300"></div>
      <div class="logo-title" @click="routerToPage('community', '/home')">社区</div>
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
      <!-- <KInput v-model="searchValue" style="width: 180px" placeholder="搜索..." suffix-icon="IconSearch" /> -->
    </div>
    <div v-if="!userInfo.loginStatus" class="opt-but">
      <k-button text @click="goLogin">登录</k-button>
      <k-button main @click="goRegister">注册</k-button>
    </div>
    <div v-if="userInfo.loginStatus" class="opt-but">
      <k-button text @click="postArticle">发帖</k-button>
      <div class="message-box">
        <MessageInfo />
      </div>

      <k-dropdown trigger="click" @command="handleCommand">
        <template #title>
          <div class="user-box dfc">
            <div class="icon dfc">
              <img :src="userInfo.avatar" />
            </div>
            <div class="user-name">{{ userInfo.userName }}</div>
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
  max-width: 1200px;
  min-width: 1200px;
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
    gap: 12px;
    width: fit-content;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      &:hover {
        cursor: pointer;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .logo-title {
      font-size: 20px;
      color: #000;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .top-menu {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 40px;
    gap: 32px;
    .link {
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
    gap: 32px;
    .message-box {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      /* width: 32px;
      height: 32px; */
      border-radius: 6px;
      font-size: 20px;
      padding: 4px;
      &:hover {
        background-color: var(--k-gray-100);
        cursor: pointer;
      }
    }
    .k-button {
      font-size: 14px;
    }
    .user-box {
      max-width: 180px;
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
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        max-width: 150px;
        width: fit-content;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
