import { handleUrlFormat } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 保存用户资料 */
export const SetRPAUserInfoAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'SetRPAUserInfo', params)
}

/** 通过手机号验证身份 */
export const CheckPhoneCodeAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'CheckPhoneCode', params)
  return data
}

/** 获取短信验证码 */
export const SendPhoneCodeAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'SendPhoneCode', params)
  return data
}

/** 修改密码 */
export const SetRPAUserNewPassAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'SetRPAUserNewPass', params)
  return data
}

/** 申请为开发者 */
export const RPAApplyDeveloperAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAApplyDeveloper', params)
}

/** 获取用户发表的帖子 */
export const RPAGetUserIndexLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetUserIndex', params)
  const table = new SQLTable(data.k_forum_Postslist)
  const rows = []
  while (!table.eof()) {
    const tags = table.s('Tag').split(',').filter(Boolean)
    const row = {
      id: table.s('ID'),
      type: table.s('Type'),
      createTime: table.s('CreateTime'),
      lastTime: table.s('LastTime'),
      createUser: table.s('CreateUser'),
      isFine: table.s('IsFine'),
      isEnd: table.s('IsEnd'),
      isTop: table.s('IsTop'),
      title: table.s('Title'),
      hot: table.s('Hot'),
      state: table.s('State'),
      tag: tags,
      cover: table.s('Cover'),
      abstract: table.s('Abstract'),
      replyUserName: table.s('ReplyUserName'),
      replyTime: table.s('ReplyTime'),
      collectNum: table.s('CollectNum'),
      replyNum: table.s('ReplyNum'),
      typeName: table.s('TypeName'),
      typePid: table.s('TypePID'),
      typePName: table.s('TypePName'),
      sex: table.s('Sex'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      isAdmin: table.s('IsAdmin'),
      userName: table.s('UserName'),
    }
    rows.push(row)
    table.next()
  }
  return { list: rows, total: data.DataCount }
}
