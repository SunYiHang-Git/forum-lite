import dayjs from 'dayjs'
import moment from 'moment'

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
