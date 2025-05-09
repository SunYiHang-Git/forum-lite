import { RPAGetNotReadLiteAPI } from '@/api/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const USE_KEY = 'FORUM_USE_MESSAGE_'

export const useMessage = defineStore('message', () => {
  /** 消息数量 */
  const messageCount = ref({
    /** 全部消息 */
    allCount: 0,
    /** 帖子消息 */
    postCount: 0,
    /** 评论消息 */
    replyCount: 0,
    /** 系统消息 */
    systemCount: 0,
  })

  /** 获取消息的数量 */
  const getMessageNoteData = async () => {
    const data = await RPAGetNotReadLiteAPI()
    const { Count, PostsCount, ReplyCount, SystemCount } = data
    messageCount.value.allCount = Count
    messageCount.value.postCount = PostsCount
    messageCount.value.replyCount = ReplyCount
    messageCount.value.systemCount = SystemCount
  }

  return {
    messageCount,
    getMessageNoteData,
  }
})
