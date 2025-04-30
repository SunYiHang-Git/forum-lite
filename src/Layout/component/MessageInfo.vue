<script setup lang="ts">
import MessageCard from './MessageCard.vue'
import { ref } from 'vue'

/** 消息数量 */
const messageCount = ref<number>(25)
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
          <k-badge :value="messageCount">
            <IconBell :size="22" />
          </k-badge>
        </template>
        <template #default>
          <!-- 消息卡片 -->
          <MessageCard />
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
