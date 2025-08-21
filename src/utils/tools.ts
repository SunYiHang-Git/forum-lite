import { handlePostDetailUrl } from './format'

/**
 * 生成随机数
 *
 * @param min 最小数
 * @param max 最大数
 * @returns
 */
export function generateRandomNumber(min: number, max: number): number {
  // 确保min小于等于max
  if (min > max) {
    const temp = min
    min = max
    max = temp
  }

  // 使用Math.random()生成[min, max]之间的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 随机六位数 */
export function generateUniqueNumber() {
  const now = Date.now() // 获取当前时间戳
  const randomPart = Math.floor(Math.random() * 100) // 随机数部分，可以根据需求调整
  const uniqueNumber = (parseInt(`${now}${randomPart}`) % 1000000).toString().padStart(6, '0') // 确保六位数
  return uniqueNumber
}

/**
 * 根据指定的分割标志分割字符串，并返回分割后数组中的某一部分。
 *
 * @param str - 要分割的原始字符串。如果为空或未定义，则返回空字符串 `''`。
 * @param sign - 用于分割字符串的标志，默认为 `"#"`。
 * @param index - 指定返回分割后数组中的哪一部分： - `0`: 返回分割标志前的部分（默认）。 - `1`: 返回分割标志后的部分。
 * @returns 返回分割后的字符串部分。如果指定的 `index` 超出范围，则返回空字符串 `''`。
 */
export function getSplitStrName(str: string, sign: string = '#', index: 0 | 1 = 0): string {
  if (!str) return ''
  const arr = str.split(sign)
  return arr[index] || ''
}
/** 处理昵称相同 Map 筛选 */
function handleUserNameMap(nameMap: Map<any, any>, item: any) {
  const findItem = nameMap.get(getSplitStrName(item.userName))
  if (findItem) {
    const { userIdList } = findItem
    if (!userIdList.includes(item.userId)) {
      findItem.count++
      findItem.userIdList.push(item.userId)
    }
  } else {
    nameMap.set(getSplitStrName(item.userName), {
      count: 1,
      userIdList: [item.userId],
    })
  }
}

/** 处理相同昵称显示 */
export const handleNameSuffixShow = (list: any[]) => {
  const nameMap = new Map()
  list.forEach((item) => {
    handleUserNameMap(nameMap, item)
    const { children }: { children: any[] } = item
    children?.forEach((child) => {
      handleUserNameMap(nameMap, child)
    })
  })
  const arr: any = []
  nameMap.forEach((value, _) => {
    const { count, userIdList } = value
    if (count <= 1) return
    arr.push(...userIdList)
  })
  return arr
}

/**
 * 打开新页签,跳转页面
 *
 * @param url 新页面 地址
 */
export const openNewUrl = (url: string) => {
  const newUrl = handlePostDetailUrl(url)
  window.open(newUrl, '_blank')
}

/**
 * 打开新页签,跳转帖子页面
 *
 * @param id 帖子Id
 */
export const openPostDetail = (id: string) => {
  openNewUrl(`#/detail/${id}`)
}

/**
 * 从 URL 中移除指定的查询参数（支持标准查询和哈希内的查询，参数名不区分大小写）
 *
 * @param url - 原始 URL 字符串
 * @param paramsToRemove - 要移除的查询参数名（可变参数）
 * @returns 处理后的 URL 字符串；若 URL 无效则返回原字符串
 */
export function removeUrlParams(url: string, ...paramsToRemove: string[]): string {
  if (!url || typeof url !== 'string') {
    console.warn('[removeUrlParams] 无效的 URL 输入:', url)
    return url
  }

  if (paramsToRemove.length === 0) {
    return url
  }

  // 提取并标准化要删除的参数名（转小写用于比较，保留原始值用于日志）
  const validParams = paramsToRemove
    .map((param) => (typeof param === 'string' ? param.trim() : ''))
    .filter((param) => param !== '')
    .map((param) => param.toLowerCase()) // 统一转为小写用于不区分大小写的匹配

  if (validParams.length === 0) {
    console.warn('[removeUrlParams] 未提供有效的参数名')
    return url
  }

  try {
    const hashIndex = url.indexOf('#')
    // 情况1：没有 hash，是标准 URL
    if (hashIndex === -1) {
      const urlObj = new URL(url)
      // 获取所有 searchParams 的键
      const keysToRemove: string[] = []
      for (const key of urlObj.searchParams.keys()) {
        if (validParams.includes(key.toLowerCase())) {
          keysToRemove.push(key) // 收集原始键名
        }
      }
      // 删除匹配的参数（使用原始键名）
      keysToRemove.forEach((key) => {
        urlObj.searchParams.delete(key)
      })
      return urlObj.toString()
    }

    // 情况2：有 hash，需要解析 hash 中的 query
    const baseUrl = url.slice(0, hashIndex)
    const hash = url.slice(hashIndex) // 包括 '#'

    const questionIndex = hash.indexOf('?')
    if (questionIndex === -1) {
      return url
    }

    const hashPath = hash.slice(0, questionIndex) // 如 "#/home"
    const queryString = hash.slice(questionIndex) // 如 "?token=...&isLite=..."

    // 使用 URLSearchParams 处理查询字符串
    const searchParams = new URLSearchParams(queryString)

    // 收集需要删除的原始键名
    const keysToRemove: string[] = []
    for (const key of searchParams.keys()) {
      if (validParams.includes(key.toLowerCase())) {
        keysToRemove.push(key)
      }
    }

    keysToRemove.forEach((key) => {
      searchParams.delete(key)
    })

    const newQueryString = searchParams.toString()
    const newHash = hashPath + (newQueryString ? `?${newQueryString}` : '')
    return baseUrl + newHash
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.warn('[removeUrlParams] URL 解析失败:', errorMsg, { url, paramsToRemove })
    return url
  }
}
