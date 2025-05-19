<script setup lang="ts">
import RPA_LOGO from '@/assets/images/K-RPA-logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const { hotDataList, newDataList, isFetchData } = defineProps<{
  /** 热门互动数据 */
  hotDataList: any[]
  /** 最新互动数据 */
  newDataList: any[]
  /** 是否已经请求过了 */
  isFetchData?: boolean
}>()

function lookMore() {
  router.push('/class/knowledge')
}

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
        <k-skeleton v-if="!isFetchData" :rows="5" animated />
        <div class="know-content" v-else>
          <div v-for="item in hotDataList" :key="item.id" class="lis-hot-know">
            <div class="lis-top">
              <div class="icon dfc"><IconDocDetailFill color="var(--k-gray-400)" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="goDetail(item)" :title="item.title">{{ item.title }}</div>
            </div>
            <div class="lis-desc" :title="item.abstract">{{ item.abstract }}</div>
            <div class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="RPA_LOGO" />
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回复</div>
            </div>
          </div>
        </div>
      </div>
      <div class="knowledge-card-now">
        <div class="header-title-card">最新</div>
        <k-skeleton v-if="!isFetchData" :rows="5" animated />
        <div class="know-content" v-else>
          <div v-for="item in newDataList" :key="item.id" class="lis-hot-know">
            <div class="lis-top">
              <div class="icon dfc"><IconDocDetailFill color="var(--k-gray-400)" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="goDetail(item)" :title="item.title">{{ item.title }}</div>
            </div>
            <div class="lis-desc" :title="item.abstract">{{ item.abstract }}</div>
            <div class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="RPA_LOGO" />
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回复</div>
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
    /* height: 628px; */
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
        line-height: 28px;
        font-size: 20px;
        font-weight: 600;
      }
      .know-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        width: 100%;
        flex: 1;
        overflow: hidden;
        .lis-hot-know {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          gap: 10px;
          width: 100%;
          /* height: 124px; */
          padding: 1rem 0;
          // box-sizing: border-box;
          border-top: 1px solid var(--k-gray-200);
          &:first-child {
            border: none;
            padding-top: 0rem;
          }
          &:last-child {
            padding-bottom: 0rem;
          }
          .lis-top {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 8px;
            width: 100%;
            height: 24px;
            .icon {
              font-size: 16px;
            }
            .system {
              height: 100%;
              border-radius: 4px;
              padding: 0px 6px;
              background: #dbeafe;

              font-size: 12px;
              color: #2563eb;
            }
            .hot-title {
              &:hover {
                color: var(--k-blue-500);
              }
              flex: 1;
              height: 24px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-wrap: nowrap;
              font-size: 16px;
              font-weight: 500;
              color: #171717;
              cursor: pointer;
            }
          }
          .lis-desc {
            width: 100%;
            font-size: 14px;
            font-weight: normal;
            line-height: 22px;
            letter-spacing: 0px;
            color: #6b7280;
            display: -webkit-box; /* 必须结合其他属性一起使用 */
            -webkit-box-orient: vertical; /* 设置垂直排列盒子中的子元素 */
            -webkit-line-clamp: 2; /* 设置最大行数为2 */
            overflow: hidden; /* 隐藏溢出的内容 */
            text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
            white-space: normal; /* 允许文本换行 */
            word-break: break-all; /* 强制断字以适应容器宽度 */
            padding-left: 24px;
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
              margin-left: 8px;
              font-size: 14px;
              font-weight: normal;
              color: #afabb3;
            }
            .page-vies {
              flex: 1;
              justify-content: start;
              margin-left: 8px;
              font-size: 14px;
              font-weight: normal;
              color: #afabb3;
            }
            .answer {
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
