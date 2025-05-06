<script setup lang="ts">
import { RPASetReadMessageLiteAPI } from '@/api/message'
import { ref } from 'vue'

const { list } = defineProps<{
  list: any[]
}>()

/** 设置消息为已读 */
async function setReadMessageById(item: any) {
  const params = { MessageID: item.id, MessageState: 0 }
  await RPASetReadMessageLiteAPI(params)
  item.state = '1'
}

const dialogVisible = ref(false)
const dialogParams = ref<any>({})
const handleClose = () => {
  dialogVisible.value = false
}

/** 跳转详情页 */
const lookDetail = async (item: any) => {
  await setReadMessageById(item)
  if (Number(item.type) < 7) {
    // 跳转帖子详情页
    const newUrl = window.location.origin + `/#/detail/message?postId=${item.postId}&commentId=${item.commentId}`
    window.open(newUrl, '_blank')
  } else {
    // 其他情况处理
    dialogParams.value = item
    dialogVisible.value = true
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
        <k-button text @click="lookDetail(item)">查看详情</k-button>
        <div class="time">2025-04-27 15:38:39</div>
      </div>
    </div>
    <k-dialog v-model="dialogVisible" title="消息中心" width="500" @close="handleClose">
      <span>{{ dialogParams.content }}</span>
      <template #footer>
        <div class="dialog-footer">
          <k-button type="primary" main @click="dialogVisible = false">确定</k-button>
        </div>
      </template>
    </k-dialog>
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
        font-size: 14px;
        font-weight: normal;
        color: #9ca3af;
      }
    }
  }
}
</style>
