import { handleUrlFormat } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 保存用户资料 */
export const SetRPAUserInfoAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'SetRPAUserInfo', params, { isShowErrorMsg: false })
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
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetUserIndexLite', params)
  console.log('data--->', data)

  const rows = []
  if (params.Type === 1) {
    // 收藏
    const table = new SQLTable(data.k_forum_collect)
    while (!table.eof()) {
      const row = {
        id: table.s('PostID'),
        collectID: table.s('CollectID'),
        abstract: table.s('Abstract'),
        title: table.s('Title'),
        hot: table.s('Hot'),
        collectNum: table.s('CollectNum'),
        replyNum: table.s('ReplyNum'),
        type: table.s('Type'),
        createTime: table.s('CreateTime'),
        lastTime: table.s('LastTime'),
        userName: table.s('UserName'),
        createUser: table.s('CreateUser'),
        isFine: table.s('IsFine'),
        isTop: table.s('IsTop'),
        userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
        typePid: table.s('TypePID'),
        sex: table.s('Sex'),
        isAdmin: table.s('IsAdmin'),
        content: table.s('Content'),
      }
      rows.push(row)
      table.next()
    }
  } else {
    // 提问和文章
    const table = new SQLTable(data.k_forum_Postslist)
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
        content: table.s('Content'),
      }
      rows.push(row)
      table.next()
    }
  }
  return { list: rows, total: data.DataCount }
}

/** 获取默认头像 */
export const RPAGetUserIconAPI = async () => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetUserIcon', {})
  return data.DefaulIcon
}

/** 上传头像 */
export const RPAUploadIconAPI = async (params: any, options: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAUploadIcon', params, options)
  return data
}
