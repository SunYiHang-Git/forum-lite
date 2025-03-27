import type { IClassify, IHistoryList, ITagType } from '@/types/goods'
import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc, SQLTable, hexToString, hexToBase64 } from '@ksware/micro-lib-web-temp'

/** 获取分类 */
export const getClassifyListAPI = async <T>(): Promise<T[]> => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsGroupList', {}, { isShowLoading: false })
  const table = new SQLTable(data.k_lite_shops_group)
  const rows: T[] = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      pid: table.s('PID'),
      name: table.s('Name'),
      level: table.s('Level'),
      sort: table.s('Sort'),
      shopType: table.s('ShopType') as '0' | '1',
      appNumber: table.s('AppNumber'),
    }
    rows.push(row as T)
    table.next()
  }
  return rows
}

/** 获取标签 */
export const getTagsListAPI = async <T>(): Promise<T[]> => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetTagList', {}, { isShowLoading: false })
  const table = new SQLTable(data.k_tag)
  const rows: T[] = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      name: table.s('Name'),
      tagColor: table.s('TagColor'),
      colorName: table.s('ColorName'),
      sort: table.s('Sort'),
      sType: table.s('sType') as '0' | '1',
      appNumber: table.s('AppNumber'),
      appId: table.s('AppId'),
    }
    rows.push(row as T)
    table.next()
  }
  return rows
}

/** 获取历史版本吧记录 */
export const getHistoryListAPI = async <T>(id: string): Promise<T[]> => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppVerInfo', { ID: id }, { isShowLoading: true })
  const table = new SQLTable(data.k_lite_application_ver)
  const rows: T[] = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      version: table.s('Version'),
      updateInfo: table.s('UpdateInfo'),
      onLineTime: table.s('OnLineTime'),
    }
    rows.push(row as T)
    table.next()
  }
  return rows
}

/**
 * 处理审核状态
 *
 * @returns 0=待审核;1=已审核;2=上架;3=下架
 */
export function handleAuditStatus(audit: '0' | '1', offLineType: '0' | '1' | '2'): string {
  if (audit === '0') return '0'
  if (offLineType === '0') return '1'
  if (offLineType === '1') return '2'
  if (offLineType === '2') return '3'
  return '0'
}

/**
 * 获取应用数据
 *
 * @param name 查询名称
 * @param id 类别名称
 * @param pageNum 当前页码
 * @param pageSize 页面尺寸
 * @param IsLimit 是否分页
 */
export const getAppListAPI = async ({
  id = 'all',
  name = '',
  pageNum = 1,
  pageSize = 20,
  IsLimit = true,
}: {
  id?: string
  name?: string
  pageNum?: number
  pageSize?: number
  IsLimit?: boolean
}) => {
  const params = {
    isAudit: false,
    Name: name,
    ClassifyID: id === 'all' ? '' : id,
    pageNumber: pageNum,
    pageSize,
    IsLimit,
  }
  const classifyList = await getClassifyListAPI<IClassify>()
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', params, { isShowLoading: true })
  const { pageNumber, page, total } = data
  const tableTag = new SQLTable(data.k_tag)
  const tagsList: ITagType[] = []
  while (!tableTag.eof()) {
    const row = {
      id: tableTag.s('TagID'),
      name: tableTag.s('Name'),
      tagColor: tableTag.s('TagColor'),
      colorName: tableTag.s('ColorName'),
      appNumber: tableTag.s('AppNumber'),
      appId: tableTag.s('AppId'),
    }
    tagsList.push(row)
    tableTag.next()
  }
  const table = new SQLTable(data.k_lite_application)
  const rows = []
  while (!table.eof()) {
    const pid = table.s('PID')
    const id = table.s('ID')
    const audit = table.s('Audit') as '0' | '1'
    const offLineType = table.s('offLineType') as '0' | '1' | '2'
    const row = {
      id,
      pid,
      name: table.s('Name'),
      icon: hexStrToShowBase64(table.s('Icon')),
      blurb: table.s('Blurb'),
      createTime: table.s('CreateTime'),
      sort: table.s('Sort'),
      developer: table.s('Developer'),
      funcDes: table.s('FuncDes'),
      updateInfo: table.s('UpdateInfo'),
      modifyBy: table.s('ModifyBy'),
      modifyTime: table.s('ModifyTime'),
      downloadCount: table.s('DownloadCount'),
      version: table.s('Version'),
      audit,
      offLineType,
      status: handleAuditStatus(audit, offLineType),
      auditBy: table.s('AuditBy'),
      last: table.s('Last'),
      devUserName: table.s('DevUserName'),
      modifyUserName: table.s('ModifyUserName'),
      auditUserName: table.s('AuditUserName'),
      tags: tagsList.filter((item) => item.appId === id),
      classifyName: table.s('ClassifyName'),
      classify: classifyList.filter((item) => item.id === pid),
    }
    rows.push(row)
    table.next()
  }

  return { pageNumber, page, total, list: rows }
}

/** 16进制转换 base64 显示的图片 */
export const hexStrToShowBase64 = (str: string) => {
  const str1 = hexToString(str)
  const str2 = removeDoubleQuotes(str1)
  return 'data:image/png;base64,' + hexToBase64(str2)
}

function removeDoubleQuotes(str: string) {
  // 正则表达式匹配以 " 开始并且以 " 结束的字符串
  const regex = /^"(.*)"$/
  const match = str.match(regex)

  // 如果匹配成功，则返回不包括外部引号的部分
  if (match) {
    return match[1]
  }

  // 如果没有匹配，则返回原始字符串
  return str
}

/**
 * 上下架接口
 *
 * @param id ID
 * @param type 上架=1;下架=2
 */
export const upperOrLowerShelveAPI = async (ID: string, Type: 1 | 2) => {
  const msg = Type === 1 ? '上架' : '下架'
  try {
    await callServerFunc('THawkeyeDM', 'SetShopsAppOnline', { ID, Type }, { isShowLoading: false })
    KMessage.success(msg + '成功!')
  } catch (error) {
    KMessage.error(msg + '失败!')
  }
}
