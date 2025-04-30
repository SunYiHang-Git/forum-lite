import { handleUrlFormat } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 格式化帖子内容 */
function formatPost(item: any) {
  let str = ''
  switch (item.type) {
    case '1':
      str = `"${item.userName}" 评论了您的帖子。"${item.title}" `
      break
    case '2':
      str = `"${item.userName}" 评论了该帖子。"${item.title}"`
      break
    case '3':
      str = `"${item.userName}" 回复了您的评论。"${item.title}"`
      break
    case '4':
      str = `"${item.userName}" 发布了帖子。"${item.title}"`
      break
    case '5':
      str = `"${item.countNum}" 个用户评论了帖子。"${item.title}"`
      break
    case '6':
      str = `"${item.userName}" 修改了帖子。"${item.title}"`
      break
    case '7':
      str = `"${item.userName}" 删除了帖子。"${item.title}"`
      break
    case '8':
      str = `"${item.userName}" 发送了消息。`
      break
    case '9':
      str = `您的帖子"${item.title}"被管理员锁定!`
      break
    case '10':
      str = `您的帖子"${item.title}"被管理员置顶!`
      break
    case '11':
      str = `您的帖子"${item.title}"被管理员设置为精华!`
      break
    default:
      break
  }
  item.value = str
}
/** 获取消息中心的消息 */
export const RPAInformationLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAInformation', params, { isShowLoading: true })
  const table = new SQLTable(data.k_forum_information)
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      type: table.s('Type'),
      time: table.s('Time'),
      userName: table.s('UserName'),
      title: table.s('Title'),
      messageFrom: table.s('MessageFrom'),
      messageTo: table.s('MessageTo'),
      commentId: table.s('CommentID'),
      content: table.s('Content'),
      countNum: table.s('CountNum'),
      postId: table.s('PostID'),
      state: table.s('State'),
      firstTypeName: table.s('FirstTypeName'),
    }
    formatPost(row)
    rows.push(row)
    table.next()
  }
  const total = data.DataCount || 0
  return { list: rows, total }
}

/** 获取未读消息数量 */
export const RPAGetNotReadLiteAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetNotRead', params)
  return data
}

/** 消息设置为已读 */
export const RPASetReadMessageLiteAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPASetReadMessageLite', params)
}
