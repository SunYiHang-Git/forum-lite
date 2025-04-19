<script setup lang="ts">
import { getInteractionListAPI } from '@/api/home'
import RPA_LOGO from '@/assets/images/K-RPA-logo.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { moreId } = defineProps<{
  /** 父级专栏的 id */
  moreId: string
}>()

function lookMore() {
  router.push({ path: '/class', query: { type: moreId } })
}

/** 热门互动数据 */
const hotDataList = ref<any[]>([])
/** 最新互动数据 */
const newDataList = ref<any[]>([])

const getDataList = async () => {
  const params = {
    PageNum: '1',
    PageSize: '4',
    PostsTypePID: moreId,
    CollectNum: true,
  }
  const newData: any = await getInteractionListAPI({ ...params, Order: 'CreateTime' })
  newDataList.value = newData.list
  const hotData: any = await getInteractionListAPI({ ...params, Order: 'Hot' })
  hotDataList.value = hotData.list
}
getDataList()
const goDetail = (item: any) => {
  router.push(`/detail/${item.id}`)
}
</script>

<template>
  <div class="knowledge-share">
    <div class="header-title">
      <div class="title">知识分享</div>
      <k-button text class="more" @click="lookMore">更多</k-button>
    </div>
    <div class="knowledge-card-box">
      <div class="knowledge-card">
        <div class="header-title-card">热门</div>
        <div class="know-content">
          <div v-for="item in hotDataList" :key="item.id" class="lis-hot-know">
            <div class="lis-top">
              <div class="icon dfc"><IconWarning /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="goDetail(item)">{{ item.title }}</div>
            </div>
            <div class="lis-desc">{{ item.abstract }}</div>
            <div class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="RPA_LOGO" />
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回答</div>
            </div>
          </div>
        </div>
      </div>
      <div class="knowledge-card-now">
        <div class="header-title-card">最新</div>
        <div class="know-content">
          <div v-for="item in newDataList" :key="item.id" class="lis-hot-know">
            <div class="lis-top">
              <div class="icon dfc"><IconWarning /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="goDetail(item)">{{ item.title }}</div>
            </div>
            <div class="lis-desc">{{ item.abstract }}</div>
            <div class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="RPA_LOGO" />
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回答</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  .title {
    font-family: Alibaba PuHuiTi 3;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0px;
    color: #38363c;
  }
  .more {
    font-size: 14px;
    font-weight: normal;
  }
}
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.knowledge-share {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  width: 100%;
  padding: 20px 0;
  .knowledge-card-box {
    width: 100%;
    height: 628px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    overflow: hidden;
    .knowledge-card,
    .knowledge-card-now {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      padding: 24px;
      gap: 24px;
      background: linear-gradient(180deg, #fef2f2 0%, #ffffff 46%);
      border-radius: 10px;
      overflow: hidden;
      .header-title-card {
        height: 28px;
        font-family: Alibaba PuHuiTi 3;
        line-height: 28px;
        font-size: 20px;
        font-weight: 600;
      }
      .know-content {
        display: flex;
        flex-direction: column;
        gap: 1px;
        width: 100%;
        flex: 1;
        overflow: hidden;
        .lis-hot-know {
          box-sizing: border-box;
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          gap: 10px;
          width: 100%;
          height: 124px;
          // padding: 10px 0;
          // box-sizing: border-box;
          border-top: 1px solid #eae8eb;
          &:nth-child(1) {
            border: none;
          }
          .lis-top {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 8px;
            width: 100%;
            height: 24px;
            .icon {
              width: 15px;
              height: 14px;
              font-size: 14px;
            }
            .system {
              height: 100%;
              border-radius: 4px;
              padding: 0px 6px;
              background: #dbeafe;
              font-family: Alibaba PuHuiTi 3;
              font-size: 12px;
              color: #2563eb;
            }
            .hot-title {
              flex: 1;
              height: 24px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-wrap: nowrap;
              font-family: Alibaba PuHuiTi 3;
              font-size: 16px;
              font-weight: normal;
              color: #171717;
              cursor: pointer;
            }
          }
          .lis-desc {
            width: 100%;
            font-family: Alibaba PuHuiTi 3;
            font-size: 12px;
            font-weight: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #6b7280;
            display: -webkit-box; /* 必须结合其他属性一起使用 */
            -webkit-box-orient: vertical; /* 设置垂直排列盒子中的子元素 */
            -webkit-line-clamp: 2; /* 设置最大行数为2 */
            overflow: hidden; /* 隐藏溢出的内容 */
            text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
            white-space: normal; /* 允许文本换行 */
            word-break: break-all; /* 强制断字以适应容器宽度 */
          }
          .hot-user-box {
            display: flex;
            justify-content: start;
            align-items: center;
            width: 100%;
            height: 20px;
            .user-avatar {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              overflow: hidden;
            }
            .user-name {
              width: fit-content;
              padding: 0 5px;
              font-family: Alibaba PuHuiTi 3;
              font-size: 14px;
              font-weight: normal;
              color: #afabb3;
            }
            .page-vies {
              flex: 1;
              justify-content: start;
              margin-left: 10px;
              padding: 0 5px;
              font-family: Alibaba PuHuiTi 3;
              font-size: 14px;
              font-weight: normal;
              color: #afabb3;
            }
            .answer {
              font-family: Alibaba PuHuiTi 3;
              font-size: 14px;
              font-weight: normal;
              color: #afabb3;
            }
          }
        }
      }
    }
    .knowledge-card-now {
      background: linear-gradient(180deg, #f0fdfa 0%, #ffffff 46%), #ffffff;
    }
  }
}
</style>
