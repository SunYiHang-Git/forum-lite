import { getRPAUserAPI } from '@/api/home'
import { useStorage } from '@/store/modules/storage'
import { KMessage } from '@ksware/ksw-ux'
import { getToken, setToken } from '@ksware/micro-lib-web-temp'

const KEY = '__K-RPA Lite__FORUM_'

/**
 * 拼接 key
 *
 * @param key
 * @returns
 */
function montageKey(key: string, type?: 'local' | 'session'): string {
  const { setLocalStorageList, setSessionStorageList } = useStorage()
  const _key = KEY + key
  if (type === 'local') {
    setLocalStorageList(_key)
  } else if (type === 'session') {
    setSessionStorageList(_key)
  }
  return _key
}

/**
 * 存储数据到本地
 *
 * @param key
 * @param data
 */
export const setLocalStorage = (key: string, data: any) => {
  const str = JSON.stringify(data)
  const _key = montageKey(key, 'local')
  localStorage.setItem(_key, str)
}

/** 从本地获取数据 */
export const getLocalStorage = (key: string) => {
  try {
    const _key = montageKey(key)
    const str = localStorage.getItem(_key) ?? ''
    return JSON.parse(str)
  } catch (error) {
    return ''
  }
}

/** 根据key删除本地存储 */
export const removeLocalStorageByKey = (key: string) => {
  const _key = montageKey(key)
  localStorage.removeItem(_key)
}

/** 清空本地所有数据 */
export const clearLocalStorage = () => {
  const { clearSpecificLocalStorageList } = useStorage()
  clearSpecificLocalStorageList()
}

/**
 * 临时存储数据到本地
 *
 * @param key
 * @param data
 */
export const setSessionStorage = (key: string, data: any) => {
  const str = JSON.stringify(data)
  const _key = montageKey(key, 'session')
  sessionStorage.setItem(_key, str)
}

/** 从本地获取临时数据 */
export const getSessionStorage = (key: string) => {
  try {
    const _key = montageKey(key)
    const str = sessionStorage.getItem(_key) ?? ''
    return JSON.parse(str)
  } catch (error) {
    return ''
  }
}
/** 根据key删除临时存储 */
export const removeSessionStorageByKey = (key: string) => {
  const _key = montageKey(key)
  sessionStorage.removeItem(_key)
}

/** 清空本地所有临时数据 */
export const clearSessionStorage = () => {
  const { clearSpecificSessionStorageList } = useStorage()
  clearSpecificSessionStorageList()
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
  const token = result[name as string] || result[String(name).toUpperCase()]
  if (token) {
    setToken(token)
    getRPAUserAPI()
  }
  return result[name as string] || result[String(name).toUpperCase()]
}

/**
 * 去掉 token=xxx
 *
 * @param url to.fullPath
 * @returns
 */
export function removeTokenFromUrl(url: string) {
  // 使用正则表达式删除 token 参数：
  // 匹配格式如：
  // - &token=xxxxx
  // - ?token=xxxxx
  // - token=xxxxx& 或 token=xxxxx# 或 token=xxxxx（单独在末尾）
  return url.replace(/[?&]token=[0-9A-Fa-f]{32,}[^&#]*/g, '').replace(/([&?])$/, '')
}

/** 处理未登录时,不可触发后续方法 */
export const handleNoLoginClick = () => {
  const token = getToken()
  if (token) return Promise.resolve(true)
  KMessage.warning('请先进行登录')
  // throw Error('没有登录,不可操作')
  return Promise.reject(false)
}
