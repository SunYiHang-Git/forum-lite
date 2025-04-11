/**
 * 区分动词过去式、过去分词、现在分词的工具函数
 *
 * @param {string} v 原形
 * @param {string} pt 过去式 past tense
 * @param {string} pp 现在分词 present participle
 * @param {string} ptp 过去分词 past participle
 */
const tense = (v?: any, pt?: any, pp?: any, ptp?: any) => {
  return ({ values }: any) => {
    if (values.pt) return pt ?? v
    if (values.pp) return pp ?? v
    if (values.ptp) return ptp ?? v
    return v
  }
}

export { tense }
