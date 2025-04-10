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
  /** 是否是管理员 */
  isAdmin: boolean
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
  })
  /** 获取本地用户信息 */
  function getSessionUser() {
    const obj = getSessionStorage(USER_KEY)
    userInfo.value = obj
    return obj
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
