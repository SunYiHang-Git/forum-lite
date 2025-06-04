import { useUser } from '@/store/modules/user'
import { KMessage } from '@ksware/ksw-ux'

/**
 * 校验是否是手机号
 *
 * @param phone string
 * @returns boolean
 */
export const checkMobileFormat = (phone: string) => {
  const mobileRegex = /^1[3-9]\d{9}$/
  if (!phone) {
    KMessage.warning('请输入有效的手机号!')
    return false
  }
  if (!mobileRegex.test(phone)) {
    KMessage.warning('手机号格式不正确，请输入11位手机号码!')
    return false
  }
  return true
}

/**
 * 将手机号转换为特定格式，例如：189******50
 *
 * @param mobile - 完整的手机号码
 * @returns 格式化后的手机号码
 */
export const formatMobile = (mobile: string): string => {
  if (!/^\d{11}$/.test(mobile)) {
    throw new Error('无效的手机号码')
  }
  // 保留前三位和后两位，中间用星号替换
  const prefix = mobile.substring(0, 3)
  const suffix = mobile.substring(9)
  const maskedPart = '*'.repeat(6)
  return `${prefix}${maskedPart}${suffix}`
}

/** 正则检验是否有违规字符 */

/**
 * 检验是否有违规字符
 *
 * @param input 校验字符
 * @returns {matched: boolean, matches: string[]} 匹配结果和匹配到的字符串列表
 */
export function matchKeywords(input: string): { matched: boolean; matches: string[] } {
  // 定义匹配模式的正则表达式数组
  const patterns = [
    /(客服|客户服务|在线客服)/i,
    /(技术支持|技术客服管理员|超级管理员)/i,
    /(版主|超级版主|分区版主|官方|官网|认证)/i,
    /(审核员|内容审核)/i,
    /(巡查员|社区巡查)/i,
    /(运营部|市场部|公关部)/i,
    /(用户支持|用户服务)/i,
    /(帮助中心|咨询中心)/i,
    /(admin|root)/i,
    /(金智维|kingsware)/i,
    /rpa|lite/i,
    /#/i,
  ]

  const matches: string[] = []

  // 遍历所有模式并检查是否匹配输入字符串
  for (let pattern of patterns) {
    const result = input.match(pattern)
    if (result) {
      matches.push(result[0]) // 将匹配到的第一个结果添加到matches数组中
    }
  }

  return {
    matched: matches.length > 0, // 如果有匹配项，则matched为true
    matches: matches, // 返回所有匹配到的字符串
  }
}

/** 是否是管理员 */
export const isAdmin = () => {
  const { isAdminByUser } = useUser()
  return isAdminByUser() ?? false
}
