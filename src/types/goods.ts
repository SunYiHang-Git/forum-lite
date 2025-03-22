export type IGoodDataType = {
  id?: string
  /** 父级id */
  pid?: string
  /** 名称 */
  name?: string
  /** 应用图标 */
  icon?: string
  /** 功能描述 */
  funcDes?: string
  /** 变更内容 */
  updateInfo?: string
  /** 开发者 */
  developer?: string
  /** 开发人名称 */
  devUserName?: string
  /** 创建时间 */
  createTime?: string
  /** 应用脚本 */
  obj?: any
  /** 排序 */
  sort?: string
  /** 修改人 */
  modifyBy?: string
  /** 修改时间 */
  modifyTime?: string
  /** 修改人名称 */
  modifyUserName?: string
  /** 审核状态 审核状态: 0:未审核, 1:同意, 2:拒绝 */
  isPassed?: string
  /** 版本号 */
  version?: string
  /** 下载次数 */
  downloadCount?: string
  /** 审核 */
  audit?: string
  /** 审核人 */
  auditBy?: string
  /** 审核时间 */
  auditTime?: string
  /** 审核人名称 */
  auditUserName?: string
  /** 使用说明 */
  instructions?: string
  /** 分类 */
  classify?: any
  /** 标签 */
  tag?: any
  /** 简介 */
  blurb?: string
}

export type IColumn<T> = {
  /** 键名 */
  field: Partial<T> | 'seq' | 'opt'
  /** 名称 */
  title: string
  /** 类型 */
  type?: 'seq' | 'checkbox' | any
  /** 宽度 */
  width?: string
  /** 类型 */
  dataType?: string
  [key: string]: any
}
