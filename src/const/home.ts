import helpSvg from '@/assets/svg/help.svg'
import interactionSvg from '@/assets/svg/interaction.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'

/** 帮助文档地址 */
export const helpDocumentUel = 'https://krpalite.com/HelpDoc/Conditional/IF%20Condition'
/** lite 首页 */
export const liteHomeUrl = 'https://krpalite.com/'

/** 首页 nav 专栏ID */
export const homeNavIds = {
  /** 知识分享 Id */
  KNOWLEDGE_ID: '',
  /** 互动解答 Id */
  INTERACTION_ID: '',
  /** 官方公告 */
  NOTICE_ID: '',
}

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

/** 项目打包后的文件名称 */
export const distFileName = 'krpalite-forum'

const env = import.meta.env
/** 跳转帖子详情页路由 */
export const postDetailUrl = env.DEV ? window.location.origin + '/' : `/${distFileName}/index.html`

/** 后台管理页面 */
// export const adminManagementUrl =
//   (env.DEV ? 'http://192.168.104.81:8080/' : 'http://www.rpa-china.cn:12580/forum/index.html') +
//   `#/admin/reply?token=${getToken()}&isLite=${true}`

export const MailText = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.5">
          您的验证码是:
          <div
            style="
              width: fit-content;
              font-size: 20px;
              letter-spacing: 4px;
              color: #e63946;
              background-color: #f8f9fa;
              padding: 8px 12px;
              border: 1px solid #dee2e6;
              border-radius: 6px;
              margin-left: 4px;
            "
          >
           {$MailCode$}
          </div>
        </div>
    `
