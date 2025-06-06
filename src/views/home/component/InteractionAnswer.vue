<script setup lang="ts">
import RPA_LOGO from '@/assets/images/K-RPA-logo.png'
import { openPostDetail } from '@/utils/tools'
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
  router.push('/class/interaction')
}
</script>

<template>
  <div class="interaction-answer">
    <div class="header-title">
      <div class="title">互动解答</div>
      <k-button text class="more" @click="lookMore">更多</k-button>
    </div>
    <div class="interaction-card-box">
      <div class="interaction-card">
        <div class="sign-name">热门</div>
        <k-skeleton v-if="!isFetchData" :rows="5" animated />
        <div class="card-list-box" v-else>
          <div class="lis-data" v-for="(item, index) in hotDataList" :key="item.id">
            <div class="main-content-top">
              <div class="icon dfc"><IconMessageFill color="var(--k-gray-400)" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="openPostDetail(item.id)" :title="item.title">
                {{ item.title }}
              </div>
              <div class="answer" v-if="index !== 0">{{ item.replyNum }} 个回复</div>
            </div>
            <div v-if="index === 0" class="hot-desc" :title="item.abstract">
              {{ item.abstract }}
            </div>
            <div v-if="index === 0" class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="item.userIcon" class="dfc" style="width: 100%; height: 100%">
                  <template #error>
                    <k-image :src="RPA_LOGO" style="width: 100%; height: 100%" />
                  </template>
                </k-image>
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回复</div>
            </div>
          </div>
        </div>
      </div>
      <div class="interaction-card">
        <div class="sign-name">最新</div>
        <k-skeleton v-if="!isFetchData" :rows="5" animated />
        <div class="card-list-box" v-else>
          <div class="lis-data" v-for="(item, index) in newDataList" :key="item.id">
            <div class="main-content-top">
              <div class="icon dfc"><IconMessageFill color="var(--k-gray-400)" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title" @click="openPostDetail(item.id)" :title="item.title">{{ item.title }}</div>
              <div class="answer" v-if="index !== 0">{{ item.replyNum }} 个回复</div>
            </div>
            <div v-if="index === 0" class="hot-desc" :title="item.abstract">{{ item.abstract }}</div>
            <div v-if="index === 0" class="hot-user-box">
              <div class="user-avatar dfc">
                <k-image :src="item.userIcon" class="dfc" style="width: 100%; height: 100%">
                  <template #error>
                    <k-image :src="RPA_LOGO" style="width: 100%; height: 100%" />
                  </template>
                </k-image>
              </div>
              <div class="user-name dfc">{{ item.userName }}</div>
              <div class="page-vies dfc">浏览 {{ item.hot }}</div>
              <div class="answer">{{ item.replyNum }} 个回复</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="interaction-card">
        <div class="sign-name">标签</div>
      </div> -->
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
  z-index: 99;
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
.interaction-answer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 568px;
  box-sizing: border-box;
  padding: 40px 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    min-width: 1280px;
    height: 568px;
    background-color: #f3f3f3;
    z-index: 1;
  }
  .interaction-card-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
    height: 432px;
    z-index: 99;
    .interaction-card {
      flex: 1;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 24px;
      height: 432px;
      box-sizing: border-box;
      padding: 24px;
      border-radius: 12px;
      background-color: #fff;
      .sign-name {
        height: 28px;

        font-size: 20px;
        font-weight: 600;
        color: #000;
      }
      .card-list-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 1px;
        width: 100%;
        overflow: hidden;
        .lis-data {
          display: flex;
          align-items: center;
          width: 100%;
          height: 56px;
          border-top: 1px solid var(--k-gray-200);
          &:nth-child(1) {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 12px;
            height: auto;
            padding-bottom: 16px;
            border: none;
            .hot-desc {
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
              height: 24px;
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
          .main-content-top {
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
              &:hover {
                color: var(--k-blue-500);
              }
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
  }
}
</style>
