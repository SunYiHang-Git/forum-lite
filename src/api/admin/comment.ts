import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取评论列表 */
export const RPAReplyQueryLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAReplyQueryLite', params, { isShowLoading: true })
  const table = new SQLTable(data.k_forum_reply)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('ID')
    const row = {
      id,
      title: table.s('Title'),
      user: table.s('UserName'),
      time: table.s('Time'),
      content: table.s('Content'),
      tag: table.s('tag'),
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: data.DataCount }
}

/** 删除评论 */
export const RPADelReplyLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPADelReplyLite', params)
}

/** 获取回收站列表 */
export const RPAGetAllRecycleBinLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetAllRecycleBinLite', params, { isShowLoading: true })
  const table = new SQLTable(data.k_forum_recycle)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('PostsID')
    const row = {
      id,
      title: table.s('Title'),
      tag: table.s('Tag'),
      time: table.s('DeleteTime'),
      desc: table.s('Reason'),
      cUser: table.s('CreateUserName'),
      dUser: table.s('DeUserName'),
      pType: table.s('TypePName'),
      type: table.s('TypeName'),
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: data.DataCount }
}

/** 回收站恢复帖子 */
export const RPARecoveryPostLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPARecoveryPostLite', params)
}
