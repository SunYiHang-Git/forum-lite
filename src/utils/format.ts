import dayjs from 'dayjs'
import moment from 'moment'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import TurndownService from 'turndown'
import { postDetailUrl } from '@/const/home'
import { getToken, isInset } from '@ksware/micro-lib-web-temp'

/**
 * 使用定点表示法将数值转为字符串。如果结果为 "0.00"，就转为 "0"。 参考 Number.prototype.toFixed。
 *
 * @param num 被处理的数值
 * @param digits 小数点后的位数，默认为2
 * @returns 结果
 */
export function numFixedExcept0(num: number, digits: number = 2): string {
  if (isNaN(num)) return '0'
  const result = num.toFixed(digits)

  if (result === '0.00') {
    return '0'
  } else {
    return result
  }
}

/**
 * 获取一段时间的月份列表
 *
 * @param startTime 开始时间 YYYYMM*** / YYYY-MM-***
 * @param endTime 结束时间 YYYYMM*** / YYYY-MM-***
 * @returns 月份列表
 */
export function getDateMonthList(startTime: string, endTime: string): string[] {
  let startTimeDayjs = dayjs(startTime)
  const endTimeDayjs = dayjs(endTime)
  const monthList: string[] = []
  while (true) {
    if (startTimeDayjs.isAfter(endTimeDayjs, 'month')) break
    monthList.push(startTimeDayjs.format('YYYYMM'))
    startTimeDayjs = startTimeDayjs.add(1, 'month')
  }
  return monthList
}

/**
 * 计算剩余天树数
 *
 * @param yyyymmdd 格式字符串-到期天数
 * @returns {number} 天数 number
 */
export const maturityDays = (yyyymmdd: string): number => {
  if (!yyyymmdd) return 0
  const regex1 = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/
  const regex2 = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  const today = moment().startOf('day')
  if (regex1.test(yyyymmdd)) {
    const targetDate = moment(yyyymmdd, 'YYYYMMDD')
    const diffDays = targetDate.diff(today, 'days')
    return +diffDays + 1
  } else if (regex2.test(yyyymmdd)) {
    const targetDate = moment(yyyymmdd, 'YYYY-MM-DD')
    const diffDays = targetDate.diff(today, 'days')
    return +diffDays + 1
  }
  return 0
}

/**
 * 使用 moment 将 yyyymmdd 格式的日期字符串转换为 yyyy-mm-dd 格式
 *
 * @param {string} yyyymmdd - 输入的日期字符串，格式为 yyyymmdd
 * @returns {string} 转换后的日期字符串，格式为 yyyy-mm-dd
 */
export function convertDateFormatWithMoment(yyyymmdd: string) {
  // 检查输入是否为8位长度的字符串
  const regex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/
  if (typeof yyyymmdd !== 'string' || !/^\d{8}$/.test(yyyymmdd) || !regex.test(yyyymmdd)) {
    return ''
  }
  // 使用 moment 解析日期并格式化输出
  return moment(yyyymmdd, 'YYYYMMDD').format('YYYY-MM-DD')
}

/** 选择两个日期中最大的值 */
export const selectMaxData = (date1: string, date2: string) => {
  const time1 = moment(date1)
  const time2 = moment(date2)
  return time1.isBefore(time2) ? date2 : date1
}

// base64转blob
export const base64ToBlob = (base64Data: any) => {
  const arr = base64Data.split(',')
  const fileType = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let l = bstr.length
  const u8Arr = new Uint8Array(l)

  while (l--) {
    u8Arr[l] = bstr.charCodeAt(l)
  }
  return new Blob([u8Arr], {
    type: fileType,
  })
}

// blob转file
export const blobToFile = (newBlob: any, fileName: string) => {
  newBlob.lastModifiedDate = new Date()
  newBlob.name = fileName
  return newBlob
}
/** 把对象的key 首字母转换为小写 */
export function convertKeysToLowerCase(obj: object) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('传入的参数必须是一个对象')
  }

  const result: any = {}

  for (const [key, value] of Object.entries(obj)) {
    // 提取键名并将其首字母转换为小写
    const newKey = key.charAt(0).toLowerCase() + key.slice(1)

    // 如果值是对象且不是null或Array，则递归处理
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[newKey] = convertKeysToLowerCase(value)
    } else {
      result[newKey] = value
    }
  }

  return result
}

/**
 * 处理 url 反斜杠问题
 *
 * @param url string
 * @returns
 */
export const handleUrlFormat = (url: string) => {
  if (!url) return ''
  return url.split('\\').join('/').split('\\').join('/')
}

/**
 * 将 Markdown 转换为 HTML。
 *
 * @param {string} markdown - 要转换的 Markdown 内容。
 * @returns {string} 转换后的 HTML 字符串。
 */
export function convertMarkdownToHtml(markdown: any): any {
  if (!markdown) return markdown
  // 使用 marked 解析 Markdown 为 HTML
  let html
  try {
    html = marked(markdown)
  } catch (error) {
    html = markdown
  }
  // 使用 DOMPurify 清理 HTML 以防止 XSS 攻击
  const cleanHtml = DOMPurify.sanitize(html)
  return cleanHtml
}
// 创建 TurndownService 实例
const turndownService = new TurndownService()
export function htmlToMarkdown(html: string) {
  if (isMarkdown(html)) {
    return html
  }
  return turndownService.turndown(html)
}
// 判断是否为 Markdown 格式的简单方法
export function isMarkdown(str: string): boolean {
  const markdownPatterns = [
    /^#+\s/, // 标题
    /^- \s/, // 无序列表
    /^\d+\. \s/, // 有序列表
    /^\*\*/, // 加粗
    /^\*/, // 斜体
    /^```/, // 代码块
  ]
  for (const pattern of markdownPatterns) {
    if (pattern.test(str.trim())) {
      return true
    }
  }
  return false
}

/** 处理跳转详情页 */
export const handlePostDetailUrl = (url: string): string => {
  const newUrl = postDetailUrl + url
  if (isInset) {
    const joinText = /\?/.test(url) ? '&' : '?'
    return newUrl + `${joinText}token=${getToken()}`
  }
  return newUrl
}
