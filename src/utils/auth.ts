const KEY = '__K-RPA Lite__'

/**
 * 存储数据到本地
 *
 * @param key
 * @param data
 */
export const setLocalStorage = (key: string, data: any) => {
  const str = JSON.stringify(data)
  localStorage.setItem(KEY + key, str)
}

/** 从本地获取数据 */
export const getLocalStorage = (key: string) => {
  try {
    const str = localStorage.getItem(KEY + key) ?? ''
    return JSON.parse(str)
  } catch (error) {
    return ''
  }
}

/** 根据key删除本地存储 */
export const removeLocalStorageByKey = (key: string) => {
  localStorage.removeItem(KEY + key)
}

/** 清空本地所有数据 */
export const clearLocalStorage = () => {
  localStorage.clear()
}

/**
 * 临时存储数据到本地
 *
 * @param key
 * @param data
 */
export const setSessionStorage = (key: string, data: any) => {
  const str = JSON.stringify(data)
  sessionStorage.setItem(KEY + key, str)
}

/** 从本地获取临时数据 */
export const getSessionStorage = (key: string) => {
  try {
    const str = sessionStorage.getItem(KEY + key) ?? ''
    return JSON.parse(str)
  } catch (error) {
    return ''
  }
}
/** 根据key删除临时存储 */
export const removeSessionStorageByKey = (key: string) => {
  sessionStorage.removeItem(KEY + key)
}

/** 清空本地所有临时数据 */
export const clearSessionStorage = () => {
  sessionStorage.clear()
}
