import helpSvg from '@/assets/svg/help.svg'
import interactionSvg from '@/assets/svg/interaction.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'
import { helpDocumentUel } from '@/views/home'

/** 知识分享 Id */
export const KNOWLEDGE_ID = '4D70FB49913F435BBCEDBCBDFD7E9D13'
/** 互动解答 Id */
export const INTERACTION_ID = 'AA7CBEAA4FDC4F64AF2C1A62797FE95E'
/** 官方公告 */
export const NOTICE_ID = 'E6ED36AB167949BFB6DC491524BC79E4'

/** 首页卡片 */
export const NavCardList = [
  {
    name: 'knowledge',
    label: '知识分享',
    desc: '传播智慧的桥梁',
    src: '/class/knowledge',
    imgSvg: knowledgeSvg,
  },
  {
    name: 'interaction',
    label: '互动解答',
    desc: '交流思想的舞台',
    src: '/class/interaction',
    imgSvg: interactionSvg,
  },
  {
    name: 'notice',
    label: '官方公告',
    desc: '传递信息的窗口',
    src: '/class/notice',
    imgSvg: noticeSvg,
  },
  {
    name: 'helpDocument',
    label: '帮助文档',
    desc: '指引操作的指南',
    src: helpDocumentUel,
    imgSvg: helpSvg,
  },
]
