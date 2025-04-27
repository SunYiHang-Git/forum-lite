import { defineStore } from 'pinia'

const USE_KEY = 'FORUM_USE_STORAGE_'
export const useStorage = defineStore(
  'storage',
  () => {
    const localStorageList = new Set()
    const sessionStorageList = new Set()
    /** 设置持久化存储 */
    function setLocalStorageList(key: string) {
      if (localStorageList.has(key)) return
      localStorageList.add(key)
    }
    /** 设置会话存储 */
    function setSessionStorageList(key: string) {
      if (sessionStorageList.has(key)) return
      sessionStorageList.add(key)
    }
    /** 清空特定持久化存储 */
    function clearSpecificLocalStorageList() {
      Array.from(localStorageList).forEach((key) => {
        localStorage.removeItem(key as string)
      })
    }
    /** 清空特定会话存储 */
    function clearSpecificSessionStorageList() {
      Array.from(sessionStorageList).forEach((key) => {
        sessionStorage.removeItem(key as string)
      })
    }
    return {
      setLocalStorageList,
      setSessionStorageList,
      clearSpecificLocalStorageList,
      clearSpecificSessionStorageList,
    }
  },
  {
    persist: {
      storage: localStorage,
      // 指定存储的键名
      key: USE_KEY + '_my_storage',
    },
  },
)
