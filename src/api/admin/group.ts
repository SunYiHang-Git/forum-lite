import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取专栏 */
export const RPAGetAllPostsTypeLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetAllPostsTypeLite', params, { isShowLoading: true })
  const table = new SQLTable(data.k_forum_poststype)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('PostsTypeId')
    const pid = table.s('ParentID')
    const row = {
      id,
      pid,
      name: table.s('PostsTypeName'),
      desc: table.s('PostsTypeDesc'),
      __folder: pid === '',
      icon: pid === '' ? '' : 'IconRPASystemAddFileToClipboardColor',
    }
    rows.push(row)
    table.next()
  }
  return rows
}
/** 获取专栏发表权限 */
export const RPAGetTypePublishRoleLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetTypePublishRoleLite', params)
  const table = new SQLTable(data.k_forum_type_role)
  const rows: any[] = []
  while (!table.eof()) {
    const id = table.s('UserID')
    const row = {
      id,
      name: table.s('UserName'),
      phone: table.s('Phone'),
      typeID: table.s('TypeID'),
      publish: table.s('Publish'),
    }
    rows.push(row)
    table.next()
  }
  return { rows, total: data.DateCount }
}

/** 移动专栏 */
export const RPAMoveTypeLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAMoveTypeLite', params)
}

/** 增加一级专栏信息 */
export const RPAAddTypeLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAAddTypeLite', params)
  return
}
/** 增加二级专栏信息 */
export const RPAAddSecondPostTypeLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAAddSecondPostTypeLite', params)
  return
}
/** 删除专栏信息 */
export const RPADelTypeLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPADelTypeLite', params)
  return
}
/** 编辑专栏信息 */
export const RPAEditTypeLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAEditTypeLite', params)
  return
}
/** 编辑专栏信息 */
export const RPASetTypePublishRoleLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPASetTypePublishRoleLite', params)
  return
}
