//

import { distFileName } from '@/const/home'

/** lite 首页 */
export const liteHomeUrl = 'https://krpalite.com/'

/** 帮助文档地址 */
export const helpDocumentUel = 'https://krpalite.com/HelpDoc/Conditional/IF%20Condition'

export const fileHostUrl = import.meta.env.DEV ? import.meta.env.VITE_APP_HOST + '/' : '/' + distFileName

export const NavCardListObject = {
  /** 知识分享 */
  knowledge: 'Knowledge',
  /** 互动解答 */
  interaction: 'Interaction',
  /** 官方公告 */
  notice: 'Notice',
}
