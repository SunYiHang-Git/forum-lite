import { GetRPAUserAPI } from '@/api/login'
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
    GetRPAUserAPI()
  }
  return result[name as string] || result[String(name).toUpperCase()]
}

/**
 * 从路由 fullPath 中移除指定的查询参数（支持多个，不区分大小写） 正确处理 ? 和 & 的转换，避免生成 /home&param=value 的错误格式
 *
 * @example removeUrlParams('/home?token=abc&isLite=true', 'token') // 返回: '/home?isLite=true'
 *
 * removeUrlParams('/home?TOKEN=abc&IsLite=true', 'token', 'isLite') // 返回: '/home'
 *
 * @param fullPath - 路由的 fullPath（如 '/home?token=abc&isLite=true'）
 * @param paramsToRemove - 要移除的参数名（可变参数，如 'token', 'isLite'）
 * @returns 清理后的 fullPath
 */
export function removeToFullPathParams(fullPath: string, ...paramsToRemove: string[]): string {
  if (!fullPath || typeof fullPath !== 'string') {
    return fullPath || ''
  }

  if (paramsToRemove.length === 0) {
    return fullPath
  }

  // 标准化要删除的参数名（转小写用于不区分大小写的匹配）
  const paramsToRemoveLower = paramsToRemove
    .map((param) => (typeof param === 'string' ? param.trim().toLowerCase() : ''))
    .filter((param) => param !== '')

  if (paramsToRemoveLower.length === 0) {
    console.warn('[removeUrlParams] 未提供有效的参数名')
    return fullPath
  }

  try {
    // 1. 拆分路径和查询字符串
    const [path, queryString] = fullPath.split('?', 2)
    const query = queryString || ''

    // 2. 使用 URLSearchParams 解析查询字符串
    const params = new URLSearchParams(query)

    // 3. 收集所有需要删除的原始键名（不区分大小写）
    const keysToRemove: string[] = []
    for (const key of params.keys()) {
      if (paramsToRemoveLower.includes(key.toLowerCase())) {
        keysToRemove.push(key)
      }
    }

    // 4. 执行删除
    keysToRemove.forEach((key) => {
      params.delete(key)
    })

    // 5. 重新组合
    const search = params.toString()
    // 只有当有剩余查询参数时，才加 ?
    return search ? `${path}?${search}` : path
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.warn('[removeUrlParams] 解析 fullPath 失败:', errorMsg, { fullPath, paramsToRemove })
    return fullPath
  }
}

/** 处理未登录时,不可触发后续方法 */
export const handleNoLoginClick = () => {
  const token = getToken()
  if (token) return Promise.resolve(true)
  KMessage.warning('请先进行登录')
  // throw Error('没有登录,不可操作')
  return Promise.reject(false)
}
