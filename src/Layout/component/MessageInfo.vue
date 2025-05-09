<script setup lang="ts">
import { RPAGetNotReadLiteAPI } from '@/api/message'
import MessageCard from './MessageCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useMessage } from '@/store/modules/useMessage'
import { storeToRefs } from 'pinia'
const { getMessageNoteData } = useMessage()
const { messageCount } = storeToRefs(useMessage())

let intervalId: null | number = null
onMounted(() => {
  getMessageNoteData()
  // 设置每 15 分钟执行一次
  intervalId = setInterval(
    () => {
      getMessageNoteData()
    },
    15 * 60 * 1000,
  )
})

onUnmounted(() => {
  // 组件卸载时清除定时器，防止内存泄漏
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
})

const popoverRef = ref<any>()
const resetCount = () => {
  popoverRef.value?.hide()
  getMessageNoteData()
}
</script>

<template>
  <div class="message-info">
    <div class="icon">
      <k-popover
        ref="popoverRef"
        :width="480"
        trigger="click"
        popper-style="
        box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding:0 20px;border-radius:16px; 
      "
      >
        <template #reference>
          <k-badge
            :value="messageCount.allCount"
            :hidden="messageCount.allCount === 0"
            style="display: flex; align-items: center"
          >
            <IconBell :size="22" />
          </k-badge>
        </template>
        <template #default>
          <!-- 消息卡片 -->
          <MessageCard
            :count="messageCount.allCount"
            :posts-count="messageCount.postCount"
            :reply-count="messageCount.replyCount"
            :system-count="messageCount.systemCount"
            @resetCount="resetCount"
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
