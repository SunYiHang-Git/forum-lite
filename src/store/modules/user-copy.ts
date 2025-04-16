import { clearLocalStorage, clearSessionStorage, getSessionStorage, setSessionStorage } from '@/utils/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface IUserInfo {
  /** ID */
  id: string
  /** isLite */
  isLite: boolean
  /** isForumLogin */
  isForumLogin: boolean
  /** 密码 */
  password: string
  /** 剩余天数 */
  remainDays: number
  /** 登录ID */
  loginId: string
  /** Token */
  token: string
  user: string
  userId: string
  userName: string
  /** 是否是市场管理员 */
  isAdmin: boolean
  /** 角色 1=超级管理员 2=市场管理员, 3=云开发 , 0=普通用户 */
  role: 0 | 1 | 2 | 3
  /** 登录状态 */
  loginStatus: false
  /** 记住用户信息 */
  rememberInfo: boolean
}
/** userStore存储键 */
export const USER_KEY = 'userInfo_Store'
export const useUser = defineStore(
  'user',
  () => {
    /** 用户信息 */
    const userInfo = ref<IUserInfo>({
      id: '',
      isLite: true,
      isForumLogin: true,
      password: '',
      remainDays: 0,
      loginId: '',
      token: '',
      user: '',
      userId: '',
      userName: '',
      isAdmin: false,
      role: 0,
      loginStatus: false,
      rememberInfo: false,
    })

    /** 设置用户信息 */
    function setUserInfo(data: any) {
      userInfo.value = { ...userInfo.value, ...data }
    }

    /** 清空用户信息 */
    function clearUserInfoStore() {
      // userInfo.value = {
      //   id: '',
      //   isLite: true,
      //   isForumLogin: true,
      //   password: '',
      //   remainDays: 0,
      //   loginId: '',
      //   token: '',
      //   user: '',
      //   userId: '',
      //   userName: '',
      //   isAdmin: false,
      //   role: 0,
      //   loginStatus: false,
      //   rememberInfo: false,
      // }
      userInfo.value.token = 'qqqqqqqq'
      console.log('userInfo.value--->', userInfo.value)
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
      clearUserInfoStore,
      isAdminByUser,
      exitLogin,
    }
  },
  {
    persist: {
      storage: localStorage,
      // 指定存储的键名
      key: USER_KEY + '_my_user',
    },
  },
)
