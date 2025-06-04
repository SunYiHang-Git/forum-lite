import { handleUrlFormat } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取用户数据 */
export const RPAUserQueryAPI = async (params: any) => {
  const res: any = await callServerFunc('TRPADM', 'RPAUserQuery', params, { isShowLoading: true })
  const table1 = new SQLTable(res.data.k_forum_useremail)
  const table = new SQLTable(res.data.k_forum_userdetail)
  const rows = []
  const eMailObj: any = {}
  while (!table1.eof()) {
    const id = table1.s('ID')
    const eMail = table1.s('eMail')
    eMailObj[id] = eMail
    table1.next()
  }
  while (!table.eof()) {
    const id = table.s('ID')
    const row = {
      id,
      name: table.s('UserName'),
      city: table.s('City'),
      signature: table.s('Signature'),
      phone: table.s('Phone'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      registerTime: table.s('RegisterTime'),
      isAdmin: table.i('IsAdmin') === 1,
      marketAdmin: table.i('IsAdmin') === 2,
      cloudDevelopment: table.i('IsAdmin') === 3,
      isApply: table.i('IsDeveloper') === 1,
      isDeveloper: table.i('DeveloperState') === 1,
      eMail: eMailObj[id],
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: res.data?.DataCount ?? 0 }
}

/** 设置是否管理员--修改用户信息 */
export const RPAEditUserAPI = async (params: any, options = {}) => {
  await callServerFunc('TRPADM', 'RPAEditUser', params, { isShowErrorMsg: false, ...options })
}
/** 设置是否为开发者 */
export const RPAAuditDeveloperAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAAuditDeveloper', params)
}

/** 获取错误次数 */
export const RPAErrCountAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAErrCount', params)
  return data
}

/** 确认管理员身份 */
export const RPACheckAdminAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPACheckAdmin', params)
}
/** 注销用户 */
export const RPADelUserAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPADelUser', params)
}
