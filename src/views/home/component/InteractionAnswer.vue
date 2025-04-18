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
    PageSize: '5',
    PostsTypePID: moreId,
    CollectNum: true,
  }
  const newData: any = await getInteractionListAPI({ ...params, Order: 'CreateTime' })
  newDataList.value = newData.list
  const hotData: any = await getInteractionListAPI({ ...params, Order: 'Hot' })
  hotDataList.value = hotData.list
}
getDataList()
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
        <div class="card-list-box">
          <div class="lis-data" v-for="(item, index) in hotDataList" :key="item.id">
            <div class="main-content-top">
              <div class="icon dfc"><IconMessageFill color="#999999" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title">{{ item.title }}</div>
              <div class="answer" v-if="index !== 0">{{ item.replyNum }} 个回答</div>
            </div>
            <div v-if="index === 0" class="hot-desc">{{ item.abstract }}</div>
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
              <div class="answer">{{ item.replyNum }} 个回答</div>
            </div>
          </div>
        </div>
      </div>
      <div class="interaction-card">
        <div class="sign-name">最新</div>
        <div class="card-list-box">
          <div class="lis-data" v-for="(item, index) in newDataList" :key="item.id">
            <div class="main-content-top">
              <div class="icon dfc"><IconMessageFill color="#999999" /></div>
              <div class="system dfc">{{ item.typeName }}</div>
              <div class="hot-title">{{ item.title }}</div>
              <div class="answer" v-if="index !== 0">{{ item.replyNum }} 个回答</div>
            </div>
            <div v-if="index === 0" class="hot-desc">{{ item.abstract }}</div>
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
              <div class="answer">{{ item.replyNum }} 个回答</div>
            </div>
          </div>
        </div>
      </div>
      <div class="interaction-card">
        <div class="sign-name">标签</div>
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
.interaction-answer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  width: 100%;
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
    height: 568px;
    background-color: #f5f5f5;
    z-index: -1;
  }
  .interaction-card-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: 100%;
    height: 432px;
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
        font-family: Alibaba PuHuiTi 3;
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
          border-top: 1px solid #eae8eb;
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
              height: 24px;
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
          .main-content-top {
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
  }
}
</style>
