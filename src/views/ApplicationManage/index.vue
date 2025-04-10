<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/store/modules/user'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
const router = useRouter()
const { getSessionUser, exitLogin } = useUser()

// const searchValue = ref<string>('')

const handleMenu = (e: any) => {
  const target = e.target
  if (target && target.dataset && target.dataset.name) {
    const { name } = target.dataset
    router.push(name)
  }
}
const userInfo = ref<any>({})
/** 获取用户信息 */
const getUserInfo = () => {
  const userStore = getSessionUser()
  if (typeof userStore === 'object') {
    userInfo.value = userStore
  }
}
getUserInfo()

/** 退出登录 */
async function logOut() {
  try {
    await KMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      type: 'warning',
    })
    exitLogin()
    KMessage.success('退出登录!')
    router.push('/login')
  } catch (error) {
    KMessage.info('取消!')
  }
}
/** 头像点击事件 */
const handleCommand = async (com: string) => {
  switch (com) {
    case 'exit':
      logOut()
      return
    default:
      return
  }
}
</script>

<template>
  <div class="application-management">
    <div class="top-box">
      <div class="logo-box">
        <div class="logo">
          <k-image style="width: 100%; height: 100%" src="./images/rpa2.png" fit="fill" />
        </div>
        <div class="logo-name">K-RPA Lite 管理后台</div>
      </div>
      <div class="search-box">
        <!-- <KInput v-model="searchValue" placeholder="请输入..." prefix-icon="IconSearch" /> -->
      </div>
      <div class="user-box">
        <k-dropdown trigger="click" @command="handleCommand">
          <template #title>
            <div class="avatar">{{ userInfo?.userName?.slice(0, 1) }}</div>
          </template>
          <template #default>
            <k-dropdown-item command="exit">退出登录</k-dropdown-item>
          </template>
        </k-dropdown>
      </div>
    </div>
    <div class="main-box">
      <div class="aside">
        <div class="menu-box" @click="handleMenu">
          <div class="menu" data-name="application">应用管理</div>
          <!-- <div class="menu">集群管理</div>
          <div class="menu">任务管理</div> -->
        </div>
      </div>
      <div class="main-right">
        <div class="content-box">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application-management {
  width: 100%;
  height: 100vh;
  .top-box {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
    box-sizing: border-box;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: var(--k-border-color);
    overflow: hidden;
    .logo-box {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
      width: fit-content;
      height: 40px;
      padding: 0 8px;
      .logo {
        width: 23px;
        height: 20px;
        overflow: hidden;
      }
      .logo-name {
        font-family: Alibaba PuHuiTi 3;
        font-size: 16px;
        font-weight: bold;
        line-height: normal;
        color: var(--k-text-color);
      }
    }
    .search-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 300px;
      .k-input {
        width: 480px;
        :deep(.el-input__wrapper) {
          height: 100%;
          border-radius: 10px;
          padding-left: 15px;
        }
      }
    }
    .user-box {
      display: flex;
      align-items: center;
      justify-content: end;
      box-sizing: border-box;
      padding-right: 25px;
      width: 150px;
      height: 40px;
      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        color: #fff;
        background-color: #3a897ded;
      }
    }
  }
  .main-box {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 1px;
    height: calc(100vh - 80px);
    background-color: var(--k-bg-3);
    .aside {
      height: 100%;
      width: 210px;
      padding: 12px;
      box-sizing: border-box;
      background-color: #fff;
      .menu-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: 100%;
        width: 100%;
      }
      .menu {
        width: 186px;
        height: 38px;
        line-height: 38px;
        border-radius: 8px;
        box-sizing: border-box;
        padding-left: 20px;
        background-color: #f0fbff;
        cursor: pointer;
      }
    }
    .main-right {
      flex: 1;
      min-width: 300px;
      box-sizing: 12px;
      padding: 12px;
      .content-box {
        width: 100%;
        height: 100%;
        background-color: var(--k-bg-1);
        // overflow: hidden;
      }
    }
  }
}
</style>
