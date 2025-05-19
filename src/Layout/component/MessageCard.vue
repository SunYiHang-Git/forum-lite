<script setup lang="ts">
import { RPAInformationLiteAPI } from '@/api/message'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import MessageCard from '@/views/Message/components/MessageCard.vue'
import EmptySvg from '@/assets/svg/no-notice.svg'
import { storeToRefs } from 'pinia'
import { useMessage } from '@/store/modules/useMessage'
const router = useRouter()
const { messageCount } = storeToRefs(useMessage())

const emits = defineEmits<{
  (e: 'resetCount'): void
}>()

const tabList = ref<any[]>([
  {
    label: '全部消息',
    name: 'all',
    count: 0,
  },
  {
    label: '帖子消息',
    name: 'article',
    count: 0,
  },
  {
    label: '评论消息',
    name: 'reply',
    count: 0,
  },
  {
    label: '系统消息',
    name: 'system',
    count: 0,
  },
])
watch(
  () => messageCount.value,
  () => {
    tabList.value = [
      {
        label: '全部消息',
        name: 'all',
        count: messageCount.value.allCount,
      },
      {
        label: '帖子消息',
        name: 'article',
        count: messageCount.value.postCount,
      },
      {
        label: '评论消息',
        name: 'reply',
        count: messageCount.value.replyCount,
      },
      {
        label: '系统消息',
        name: 'system',
        count: messageCount.value.systemCount,
      },
    ]
  },
  {
    immediate: true,
    deep: true,
  },
)

const ListBoxRef = useTemplateRef('ListBoxRef')

const activeName = ref<string>('all')

/** title 宽度 */
const itemWidth = ref(67)
// 获取当前激活项的 index
const activeIndex = computed(() => {
  const index = tabList.value.findIndex((item) => item.name === activeName.value)
  const a = index * itemWidth.value + index * 20
  return a + 'px'
})

const handleLookMore = () => {
  router.push('/message')
}

const tableData = ref<any[]>([])
const getFormaInfoList = async (type: number | null = null) => {
  const params: any = { pageNum: 0, pageSize: 5, State: 1 }
  if (type) {
    params.iType = type
  }
  const { list } = await RPAInformationLiteAPI(params, { loadingEl: ListBoxRef.value })
  tableData.value = list
}
onMounted(() => {
  getFormaInfoList()
})

/** tab 切换 */
function handleSelectName(name: string) {
  activeName.value = name
  switch (name) {
    case 'all':
      getFormaInfoList()
      break
    case 'article':
      getFormaInfoList(2)
      break
    case 'reply':
      getFormaInfoList(1)
      break
    case 'system':
      getFormaInfoList(3)
      break
    default:
      break
  }
}

/** 触发获取未读数据 */
const handleGetCount = async () => {
  emits('resetCount')
  handleSelectName(activeName.value)
}
</script>

<template>
  <div class="message-card">
    <div class="header-box">
      <div
        class="title-item"
        v-for="(item, index) in tabList"
        :key="index"
        :class="activeName === item.name ? 'active' : ''"
      >
        <k-badge :value="item.count" :hidden="item.count === 0">
          <div class="title" :style="{ width: itemWidth + 'px' }" @click="handleSelectName(item.name)">
            {{ item.label }}
          </div>
        </k-badge>
      </div>
      <div class="indicator" :style="{ transform: `translateX(${activeIndex})` }"></div>
    </div>
    <div class="content-box">
      <div class="lis-box" v-if="tableData.length" ref="ListBoxRef">
        <MessageCard :list="tableData" class="MessageCard" @resetCount="handleGetCount" />
      </div>
      <div class="empty" v-if="tableData.length === 0">
        <div class="empty-icon">
          <img :src="EmptySvg" />
        </div>
        <div class="empty-text">暂无通知</div>
      </div>
      <div class="footer-box">
        <div class="button-box" @click="handleLookMore">查看更多消息</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-card {
  width: 440px;
  height: fit-content;
  .header-box {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #f3f4f6;
    overflow: hidden;
    .title-item {
      font-size: 16px;
      height: 56px;
      line-height: 56px;
      color: #111827;
      .title {
        width: 67px;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
      }
    }
    .indicator {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 67px; // 和每个 tab 宽度一致
      height: 2px;
      background-color: #3b82f6;
      transition: transform 0.3s ease;
      z-index: 2;
    }
  }
  .content-box {
    width: 100%;
    .lis-box {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      width: 100%;
      height: fit-content;
      overflow: hidden;
    }
    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      width: 100%;
      height: 300px;
      border-bottom: 1px solid #f3f4f6;
      .empty-icon {
        width: 200px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .empty-text {
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        color: #6b7280;
      }
    }
    .footer-box {
      width: 100%;
      height: 88px;
      padding: 24px 0;
      .button-box {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 24px;

        font-size: 14px;
        font-weight: 600;
        color: #3b82f6;
        background-color: #f3f4f6;
        cursor: pointer;
      }
    }
  }
}
</style>
