<script setup lang="ts">
import { RPAGetNotReadLiteAPI, RPAInformationLiteAPI } from '@/api/message'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MessageCard from '@/views/Message/components/MessageCard.vue'
const router = useRouter()
interface IProps {
  count: number
  postsCount: number
  replyCount: number
  systemCount: number
}
const props = withDefaults(defineProps<IProps>(), {
  count: 0,
  postsCount: 0,
  replyCount: 0,
  systemCount: 0,
})

const tabList = ref<any[]>([
  {
    label: '全部消息',
    name: 'all',
    count: props.count,
  },
  {
    label: '帖子消息',
    name: 'article',
    count: props.postsCount,
  },
  {
    label: '评论消息',
    name: 'reply',
    count: props.replyCount,
  },
  {
    label: '系统消息',
    name: 'system',
    count: props.systemCount,
  },
])

watch(
  () => props,
  () => {
    tabList.value = [
      {
        label: '全部消息',
        name: 'all',
        count: props.count,
      },
      {
        label: '帖子消息',
        name: 'article',
        count: props.postsCount,
      },
      {
        label: '评论消息',
        name: 'reply',
        count: props.replyCount,
      },
      {
        label: '系统消息',
        name: 'system',
        count: props.systemCount,
      },
    ]
  },
  { deep: true },
)

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
  const { list } = await RPAInformationLiteAPI(params)
  tableData.value = list
}
getFormaInfoList()

/** tab 切换 */
const handleSelectName = (name: string) => {
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
        <k-badge :value="item.count">
          <div class="title" :style="{ width: itemWidth + 'px' }" @click="handleSelectName(item.name)">
            {{ item.label }}
          </div>
        </k-badge>
      </div>
      <div class="indicator" :style="{ transform: `translateX(${activeIndex})` }"></div>
    </div>
    <div class="content-box">
      <div class="lis-box">
        <MessageCard :list="tableData" class="MessageCard" />
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
    .footer-box {
      width: 100%;
      height: 88px;
      padding: 24px 32px;
      .button-box {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 24px;
        font-family: Alibaba PuHuiTi 3;
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
