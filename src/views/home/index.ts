//

import { distFileName } from '@/const/home'

export const fileHostUrl = import.meta.env.DEV ? import.meta.env.VITE_APP_HOST + '/' : '/' + distFileName

export const NavCardListObject = {
  /** 知识分享 */
  knowledge: 'Knowledge',
  /** 互动解答 */
  interaction: 'Interaction',
  /** 官方公告 */
  notice: 'Notice',
}
