<script setup lang="ts">
import { RPAGetNotReadLiteAPI } from '@/api/message'
import MessageCard from './MessageCard.vue'
import { ref } from 'vue'

/** 消息数量 */
const messageCount = ref<number>(0)
/** 全部消息 */
const allCount = ref(0)
/** 帖子消息 */
const postCount = ref(0)
/** 评论消息 */
const replyCount = ref(0)
/** 系统消息 */
const systemCount = ref(0)

/** 获取消息的数量 */
const getNoteData = async () => {
  const data = await RPAGetNotReadLiteAPI()
  const { Count, PostsCount, ReplyCount, SystemCount } = data
  messageCount.value = Count
  allCount.value = Count
  postCount.value = PostsCount
  replyCount.value = ReplyCount
  systemCount.value = SystemCount
}
getNoteData()
</script>

<template>
  <div class="message-info">
    <div class="icon">
      <k-popover
        :width="480"
        popper-style="
        box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding:0 20px;border-radius:16px; 
      "
      >
        <template #reference>
          <k-badge :value="messageCount" :hidden="messageCount === 0" style="display: flex; align-items: center">
            <IconBell :size="22" />
          </k-badge>
        </template>
        <template #default>
          <!-- 消息卡片 -->
          <MessageCard
            :count="allCount"
            :posts-count="postCount"
            :reply-count="replyCount"
            :system-count="systemCount"
          />
        </template>
      </k-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-info {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
