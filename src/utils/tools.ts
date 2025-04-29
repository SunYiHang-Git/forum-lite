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
