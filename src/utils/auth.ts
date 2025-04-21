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

// 获取浏览器地址参数，如果name = true  则返回全部参数对象
export function getUrlParamByName(name: string | boolean = '') {
  const result: any = {}
  // 分割字符串
  const str = location.hash.substring(location.hash.lastIndexOf('?') + 1).split('&')
  // 遍历数组中的每一个元素
  for (let i = 0; i < str.length; i++) {
    const keyvalue = str[i].split('=')
    const key = keyvalue[0]
    const value = keyvalue[1]
    result[key] = value
    // 兼容大小写
    result[(key || '').toUpperCase()] = value
  }
  if (name === true) return result
  // 兼容大小写
  return result[name as string] || result[String(name).toUpperCase()]
}
