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
