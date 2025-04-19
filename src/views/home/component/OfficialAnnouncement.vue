<script setup lang="ts">
import firstSvg from '@/assets/svg/first.svg'
import secondSvg from '@/assets/svg/second.svg'
import thirdSvg from '@/assets/svg/third.svg'
import importantSvg from '@/assets/svg/important.svg'
import { useRouter } from 'vue-router'

const { noticeList, replyList } = defineProps<{
  /** 公告 */
  noticeList: any[]
  /** 回帖 */
  replyList: any[]
}>()
const router = useRouter()
const goDetail = (item: any) => {
  router.push(`/detail/${item.id}`)
}
</script>

<template>
  <div class="official-announcement">
    <div class="announcement">
      <div class="reply-header">
        <div class="title-note">官方公告</div>
        <k-button text class="more">更多</k-button>
      </div>
      <div class="announcement-list">
        <div class="notice-lis" v-for="item in noticeList.slice(0, 5)" :key="item.id">
          <div class="left-box">
            <div class="tag-box">
              <div class="tag">
                <img :src="importantSvg" />
              </div>
              <div class="tag" v-for="(tag, index) in item.tag" :key="index">
                <div class="tag-sign">{{ tag }}</div>
              </div>
            </div>
            <div class="lis-title-box">
              <div class="title" @click="goDetail(item)">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="lis-time">2025-02-28 12:01</div>
        </div>
      </div>
    </div>
    <div class="reply">
      <div class="reply-weekly-list">回帖周榜</div>
      <div class="list-box">
        <div class="lis" v-for="(item, index) in replyList.splice(0, 5)" :key="item.id">
          <div class="reply-icon dfc">
            <div v-if="index === 0" class="icon dfc">
              <img :src="firstSvg" />
            </div>
            <div v-if="index === 1" class="icon dfc">
              <img :src="secondSvg" />
            </div>
            <div v-if="index === 2" class="icon dfc">
              <img :src="thirdSvg" />
            </div>
            <div v-if="index > 2" class="icon dfc">
              <div class="default-img dfc">{{ index + 1 }}</div>
            </div>
          </div>
          <div class="avatar dfc">
            <img :src="item.userIcon" />
          </div>
          <div class="username">{{ item.userName }}</div>
          <div class="reply-num">{{ item.replyNum }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.official-announcement {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
  padding-bottom: 10px;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .announcement {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
    .reply-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 32px;
      .title-note {
        font-family: Alibaba PuHuiTi 3;
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
      }
      .more {
        font-size: 14px;
      }
    }
    .announcement-list {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 32px;
      width: 100%;
      overflow: hidden;
      .notice-lis {
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 24px;
        gap: 8px;
        overflow: hidden;
        .left-box {
          flex: 1;
          display: flex;
          justify-content: start;
          align-items: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .tag-box {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 100%;
          width: fit-content;
          .tag {
            width: fit-content;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
            .tag-sign {
              display: flex;
              align-items: center;
              box-sizing: border-box;
              padding: 0 5px;
              width: fit-content;
              height: 100%;
              font-family: Alibaba PuHuiTi 3;
              font-size: 12px;
              font-weight: 500;
              display: flex;
              color: #736f78;
              background-color: rgba(0, 0, 0, 0.06);
            }
          }
        }
        .lis-title-box {
          flex: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .title {
            width: 100%;
            height: 25px;
            line-height: 25px;
            font-family: Alibaba PuHuiTi 3;
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #171717;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: nowrap;
            cursor: pointer;
          }
        }
        .lis-time {
          display: flex;
          justify-content: end;
          display: flex;
          align-items: center;
          height: 100%;
          width: fit-content;
          min-width: 110px;
          font-family: Alibaba PuHuiTi 3;
          font-size: 12px;
          font-weight: normal;
          color: #a3a3a3;
        }
      }
    }
  }
  .reply {
    width: 350px;
    height: 352px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    box-sizing: border-box;
    background: #ffffff;
    .reply-weekly-list {
      font-family: Alibaba PuHuiTi 3;
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0px;
      color: #000000;
    }
    .list-box {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 22px;
      width: 100%;
      .lis {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 14px;
        width: 100%;
        height: 32px;
        cursor: pointer;
        .reply-icon {
          width: 32px;
          height: 32px;
          .icon {
            width: 25px;
            height: 27px;
            .default-img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #f5f5f5;
            }
          }
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
        }
        .username {
          flex: 1;
          height: 22px;
          font-family: Alibaba PuHuiTi 3;
          font-size: 14px;
          font-weight: normal;
          line-height: 22px;
          color: #38363c;
        }
        .reply-num {
          width: fit-content;
          font-family: Alibaba PuHuiTi 3;
          font-size: 14px;
          font-weight: normal;
          line-height: 22px;
          text-align: right;
          letter-spacing: 0px;
          color: #afabb3;
        }
      }
    }
  }
}
</style>
