<script setup lang="ts">
import logoSvg from '@/assets/svg/logo.svg'
import { computed, onMounted, ref } from 'vue'
import { useUser } from '@/store/modules/user'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { callServerFunc, isInset, MD5 } from '@ksware/micro-lib-web-temp'
import { useRouterInfo } from '@/store/modules/useRouterInfo'
import MessageInfo from './MessageInfo.vue'
import { GetRPAUserAPI } from '@/api/login'
import { handlePostDetailUrl } from '@/utils/format'
import { helpDocumentUel, liteHomeUrl, MailText } from '@/const/home'
import { useCountdown } from '@/hooks/useCountdown'
import { stopTokenActiveTime } from '@/api/home'
const { clearBreadcrumbList } = useRouterInfo()
const { userInfo } = storeToRefs(useUser())
const router = useRouter()
interface IMenu {
  label: string
  name: string
  src?: string
}

const { isCounting, seconds, startCountdown, clearLocalTempCache } = useCountdown(60, 'checkEMail-forum')
const menuList = ref([
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

const userDownList = ref<IMenu[]>([
  {
    label: '我的主页',
    name: 'myHome',
    src: '/user',
  },
  {
    label: '账号资料',
    name: 'accountInformation',
    src: '/user-info',
  },
  {
    label: '退出',
    name: 'exit',
  },
])
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
  stopTokenActiveTime()
  // await nextTick()
  // router.replace('/login')
}
function handleCommand(name: string) {
  switch (name) {
    case 'exit':
      layout()
      return
    case 'adminManage':
      const adminManage = userDownList.value.find((item) => item.name === name)
      if (!adminManage) return
      const newUrl = handlePostDetailUrl(`#${adminManage.src}`)
      window.open(newUrl, '_blank')
      return
    default:
      const findItem = userDownList.value.find((item) => item.name === name)
      if (!findItem) return
      findItem.src && router.push(findItem.src)
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
  const { loginStatus } = userInfo.value
  /** 没有登录,不获取身份信息 */
  if (!loginStatus) return
  const { setUserInfo, isAdminByUser } = useUser()
  try {
    const data = await GetRPAUserAPI({ isShowErrorMsg: false })
    setUserInfo(data)
    if (isAdminByUser()) {
      // 更新下拉菜单---管理员才有后台管理页面--跳转远程
      userDownList.value.unshift({
        label: '后台管理',
        name: 'adminManage',
        src: '/admin/user',
      })
    }
  } catch (error) {
    // 退出登录
    const { exitLogin } = useUser()
    exitLogin()
    clearBreadcrumbList()
  }
}

/** 是否有邮箱 */
const isNoHasEMail = ref(false)

const eMailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/** 输入邮箱号 */
const eMailValue = ref('')
/** 验证码 */
const eMailCode = ref('')

const eMail_Local_Key = 'lite-no-eMail_local'

/** 验证码文字 */
const codeMsg = computed(() => {
  if (seconds.value > 0) {
    return `重新获取（${seconds.value})`
  }
  return '获取验证码'
})

/** 检测是否有邮箱 */
function checkEMail() {
  const { isAlreadyLogin, eMail: isHas, isEnterpriseLogin } = userInfo.value
  if (!isAlreadyLogin || isHas || isEnterpriseLogin) return
  const localStr = sessionStorage.getItem(eMail_Local_Key)
  if (localStr) return
  isNoHasEMail.value = !isHas
}

function close() {
  isNoHasEMail.value = false
}

/** 获取验证码---用于绑定邮箱 */
async function handleGetCode() {
  try {
    if (!eMailValue.value) return KMessage.warning('邮箱号不能为空')
    if (!eMailPattern.test(eMailValue.value)) return KMessage.warning('请输入有效的邮箱号')
    const data = { PhoneTo: eMailValue.value, MailTo: eMailValue.value, SendCodeType: 3, MailText, IsSend: true }
    const res: any = await callServerFunc('TRPADM', 'SendSecurityCode', data)
    startCountdown()
  } catch (error) {
    console.error(error)
    if (typeof error === 'string') {
      KMessage.error(error)
    }
    clearLocalTempCache()
  }
}

/** 跳过 */
function ignore() {
  sessionStorage.setItem(eMail_Local_Key, 'ignore')
  close()
}

/** 确定绑定邮箱 */
async function submit() {
  if (!eMailValue.value) return KMessage.warning('邮箱号不能为空')
  if (!eMailPattern.test(eMailValue.value)) return KMessage.warning('请输入有效的邮箱号')
  const codeReg = /^[a-zA-Z0-9]{6}$/
  if (!codeReg.test(eMailCode.value)) {
    KMessage.warning('请输入有效的验证码')
    return
  }
  try {
    const { phone, token } = userInfo.value
    const data = {
      PhoneTo: phone || eMailValue.value,
      eMail: eMailValue.value,
      EMailCode: eMailCode.value,
      Token: token,
    }
    const res = await callServerFunc('TRPADM', 'SetRpaUserEmailAndPhone', data)
    const { setUserInfo } = useUser()
    setUserInfo({ eMail: eMailValue.value })
    isNoHasEMail.value = false
    KMessage.success('绑定邮箱成功!')
  } catch (error) {
    clearLocalTempCache()
    eMailCode.value = ''
  }
}

onMounted(async () => {
  await getUserInfo()
  checkEMail()
})
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

      <k-dropdown v-if="!isInset" trigger="click" @command="handleCommand">
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
            <div style="width: 100%; display: flex; justify-content: center">
              {{ item.label }}
            </div>
          </k-dropdown-item>
        </template>
      </k-dropdown>
    </div>
    <!--  -->
    <k-dialog v-model="isNoHasEMail" width="480" :show-close="false">
      <template #header="">
        <div class="my-header">
          绑定邮箱
          <div class="header-icon" @click="close">
            <IconClose :size="20" />
          </div>
        </div>
      </template>
      <div class="dialog-main-box">
        <div class="tip">为了您的账号安全,请绑定邮箱</div>
        <div class="item-input-box">
          <k-input v-model="eMailValue" placeholder="请输入邮箱" prefix-icon="IconMail" />
        </div>
        <div class="item-input-box item-code">
          <k-input v-model="eMailCode" placeholder="请输入验证码" prefix-icon="IconShield" style="flex: 1" />
          <k-button :disabled="isCounting" @click="handleGetCode" style="width: 120px">{{ codeMsg }}</k-button>
        </div>
        <div class="item-input-box item-button">
          <k-button @click="ignore">跳过</k-button>
          <k-button main @click="submit">确定</k-button>
        </div>
      </div>
    </k-dialog>
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
  .my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 11px 4px 4px 4px;
    height: 24px;
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0em;
    color: #171717;
    .header-icon {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .dialog-main-box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0 4px;
    .item-input-box {
      width: 100%;
      height: 32px;
    }
    .item-code {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .item-button {
      display: flex;
      justify-content: end;
    }
  }
}
</style>
