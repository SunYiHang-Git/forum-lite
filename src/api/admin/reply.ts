import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取授权管理数据 */
export const RPAPostsQueryLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAPostsQueryLite', params, { isShowLoading: true })
  const table = new SQLTable(data.k_forum_list)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('ID')
    const row = {
      id,
      tid: table.s('sType'),
      tpid: table.s('TypePID'),
      title: table.s('Title'),
      user: table.s('UserName'),
      type: table.s('TypeName'),
      time: table.s('Time'),
      fine: table.i('isFine') === 1,
      top: table.i('isTop') === 1,
      hot: table.i('hot'),
      tag: table.s('tag'),
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: data.DataCount }
}

/** 修改帖子信息 */
export const RPAEditPostsLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAEditPostsLite', params)
}
/** 删除帖子 */
export const RPADelPostsLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPADelPostsLite', params)
}
