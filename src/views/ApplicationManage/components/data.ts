import type { IHistoryList } from '@/types/goods'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取分类 */
export const getClassifyListAPI = async <T>(): Promise<T[]> => {
  console.log('111111--->')
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsGroupList', {})
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
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetTagList', {})
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
    }
    rows.push(row as T)
    table.next()
  }
  return rows
}

/** 获取历史版本吧记录 */
export const getHistoryListAPI = async <T>(id: string): Promise<T[]> => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppVerInfo', { ID: id })
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
