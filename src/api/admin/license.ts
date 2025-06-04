import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取授权管理数据 */
export const GetRpaLiteAuthorizeAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'GetRpaLiteAuthorize', params, { isShowLoading: true })
  const table = new SQLTable(data.k_lite_forum_authorize)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('ID')
    const row = {
      id,
      userName: table.s('UserName'),
      userId: table.s('UserId'),
      eMail: table.s('eMail'),
      mobile: table.s('Mobile'),
      beginDate: table.s('BeginDate'),
      endDate: table.s('EndDate'),
      iCount: table.s('iCount'),
      subscriber: table.s('Subscriber'),
      applyForUse: table.s('ApplyForUse'),
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: data.AuthorizeCount }
}

/** 同意授权--加日期 */
export const SetRpaLiteAuthorizeAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'SetRpaLiteAuthorize', params)
}
/** 推送消息 */
export const RPASendMessageLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPASendMessageLite', params)
}
