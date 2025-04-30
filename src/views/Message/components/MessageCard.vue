<script setup lang="ts">
import { RPASetReadMessageLiteAPI } from '@/api/message'

const { list } = defineProps<{
  list: any[]
}>()

/** 设置消息为已读 */
async function setReadMessageById(item: any) {
  const params = { MessageID: item.id }
  await RPASetReadMessageLiteAPI(params)
}

/** 跳转详情页 */
const lookDetail = async (item: any) => {
  await setReadMessageById(item)
  if (Number(item.type) < 7) {
    // 跳转帖子详情页
    const newUrl = window.location.origin + `/#/detail/message?postId=${item.postId}&commentId=${item.commentId}`
    window.open(newUrl, '_blank')
  } else if (Number(item.type) === 8) {
    // TODO 类型为 8 特殊处理
  } else {
    // 其他情况处理
  }
}
</script>

<template>
  <div class="message-card">
    <div v-for="item in list" :key="item.id" class="row-msg">
      <div class="name-box">
        <div class="tag">
          <div class="cur"></div>
        </div>
        <div class="text">{{ item.value }}</div>
      </div>
      <div class="more-box">
        <k-button text @click="lookDetail(item)">查看详情</k-button>
        <div class="time">2025-04-27 15:38:39</div>
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
      .tag {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12px;
        height: 20px;
        .cur {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #3b82f6;
        }
      }
      .text {
        width: 100%;
        font-family: Alibaba PuHuiTi 3;
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
        margin-left: 12px;
      }
      .time {
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        color: #9ca3af;
      }
    }
  }
}
</style>
