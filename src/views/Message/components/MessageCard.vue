<script setup lang="ts">
import { RPASetReadMessageLiteAPI } from '@/api/message'
import { getToken } from '@ksware/micro-lib-web-temp'

const { list } = defineProps<{
  list: any[]
}>()
const emits = defineEmits<{
  (e: 'resetCount'): void
}>()

const env = import.meta.env
/** 设置消息为已读 */
async function setReadMessageById(item: any) {
  const params = { MessageID: item.id, MessageState: 0 }
  await RPASetReadMessageLiteAPI(params)
  item.state = '1'
  emits('resetCount')
}

/** 跳转详情页 */
const lookDetail = async (item: any) => {
  await setReadMessageById(item)
  if (Number(item.type) !== 7) {
    // 跳转帖子详情页
    const url = env.DEV ? window.location.origin + '/' : '/forum-lite/index.html'
    const newUrl = url + `#/detail/message?postId=${item.postId}&commentId=${item.commentId}&token=${getToken()}`
    window.open(newUrl, '_blank')
  }
}
</script>

<template>
  <div class="message-card">
    <div v-for="item in list" :key="item.id" class="row-msg">
      <div class="name-box">
        <div class="tag">
          <div class="cur" v-if="item.state === '0'"></div>
        </div>
        <div class="text">{{ item.value }}</div>
      </div>
      <div class="more-box">
        <k-button v-if="item.type !== '7'" text @click="lookDetail(item)">查看详情</k-button>
        <k-button v-if="item.type7 == '7'" text @click="setReadMessageById(item)">点击已读</k-button>
        <div class="time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-card {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: fit-content;
  background-color: #fff;
  .row-msg {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    padding: 12px 0px;
    gap: 8px;
    height: fit-content;
    border-bottom: 1px solid #f3f4f6;
    .name-box {
      width: 100%;
      display: flex;
      align-items: start;
      align-items: center;
      .tag {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        .cur {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #3b82f6;
        }
      }
      .text {
        width: 100%;

        font-size: 14px;
        font-weight: normal;
        color: #111827;
        display: -webkit-box; /* 老式弹性盒子模型 */
        -webkit-box-orient: vertical; /* 内容垂直排列 */
        -webkit-line-clamp: 2; /* 限制显示为两行 */
        overflow: hidden; /* 隐藏溢出内容 */
        text-overflow: ellipsis;
      }
    }
    .more-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 22px;
      padding-left: 25px;
      .k-button {
        margin-left: 14px;
      }
      .time {
        font-size: 14px;
        font-weight: normal;
        color: #9ca3af;
      }
    }
  }
}
</style>
