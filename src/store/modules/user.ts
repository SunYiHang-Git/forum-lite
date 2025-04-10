import { clearLocalStorage, clearSessionStorage, getSessionStorage, setSessionStorage } from '@/utils/auth'
// import { maturityDays } from '@/views/Login/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface IUserInfo {
  /** ID */
  id: string
  /** PassWord */
  password: string
  /** 登录ID */
  loginId: string
  /** Token */
  token: string
  user: string
  userId: string
  userName: string
  /** 是否是市场管理员 */
  isAdmin: boolean
  /** 角色 1=市场管理员, 2=云开发 , 0=普通用户 */
  role: 1 | 2 | 0
}
/** userStore存储键 */
export const USER_KEY = 'userInfo_Store'
export const useUser = defineStore('user', () => {
  /** 用户信息 */
  const userInfo = ref<IUserInfo>({
    /** ID */
    id: '',
    /** PassWord */
    password: '',
    /** 登录ID */
    loginId: '',
    /** Token */
    token: '',
    user: '',
    userId: '',
    userName: '',
    /** 是否是管理员 */
    isAdmin: false,
    role: 0,
  })
  /** 获取本地用户信息 */
  function getSessionUser() {
    const obj = getSessionStorage(USER_KEY)
    if (typeof obj === 'object') {
      userInfo.value = obj
    } else {
      clearUserInfoStore()
    }
    return userInfo.value
  }

  /** 设置用户信息 */
  function setUserInfo(data: any) {
    userInfo.value = { ...userInfo.value, ...data }
    setSessionStorage(USER_KEY, userInfo.value)
  }

  /** 清空用户信息 */
  function clearUserInfoStore() {
    userInfo.value = {
      /** ID */
      id: '',
      /** PassWord */
      password: '',
      /** 登录ID */
      loginId: '',
      /** Token */
      token: '',
      user: '',
      userId: '',
      userName: '',
      /** 是否是管理员 */
      isAdmin: false,
      role: 0,
    }
  }
  /** 判断是否是管理员 */
  function isAdminByUser() {
    const { isAdmin } = userInfo.value
    return isAdmin
  }
  /** 退出登录 */
  function exitLogin() {
    clearUserInfoStore()
    clearLocalStorage()
    clearSessionStorage()
  }
  return {
    userInfo,
    setUserInfo,
    getSessionUser,
    clearUserInfoStore,
    isAdminByUser,
    exitLogin,
  }
})
