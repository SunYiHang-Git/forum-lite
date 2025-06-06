<script setup lang="ts">
import { openPostDetail } from '@/utils/tools'
interface ITableData {
  [key: string]: any
}
const props = withDefaults(
  defineProps<{
    tableData: ITableData[]
    showUsername?: boolean
  }>(),
  {
    showUsername: true,
  },
)
const env = import.meta.env
const handleDetail = (item: any) => {
  openPostDetail(item.id)
}
</script>

<template>
  <div class="page-list">
    <div class="list-box">
      <div class="lis-box" v-for="item in props.tableData" :key="item.id">
        <div class="title-box">
          <div v-if="item.isTop === '1' || item.isFine === '1'" class="tags">
            <div v-if="item.isTop === '1'" class="img-box dfc">
              <IconTOP :size="20" color="var(--k-red-500)" />
            </div>
            <div v-if="item.isFine === '1'" class="tag dfc">精华</div>
          </div>
          <div class="title" @click="handleDetail(item)">{{ item.title }}</div>
        </div>
        <div class="desc-box">{{ item.abstract }}</div>
        <div class="user-info-box">
          <div class="left-user">
            <div class="username" v-if="props.showUsername">{{ item.userName }}</div>
            <div class="time">{{ item.lastTime }}</div>
          </div>
          <div class="right-box">
            <div class="info-box-num">
              <div class="icon dfc"><IconMessageOne /></div>
              <div class="num">{{ item.replyNum }}</div>
            </div>
            <div class="info-box-num">
              <div class="icon dfc"><IconEye /></div>
              <div class="num">{{ item.hot }}</div>
            </div>
            <div class="info-box-num">
              <div class="icon dfc"><IconCollect /></div>
              <div class="num">{{ item.collectNum }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  width: 100%;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list-box {
    width: 100%;
    overflow: hidden;
    .lis-box {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;
      .title-box {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 4px;
        height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        .tags {
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 4px;
          height: 100%;
          width: fit-content;
          .tag {
            height: 20px;
            box-sizing: border-box;
            padding: 0 5px;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0em;
            color: #cc6402;
            background-color: #fff6d3;
            border-radius: 4px;
          }
          .img-box {
            height: 25px;
            width: 25px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          line-height: normal;
          color: #171717;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            color: var(--k-blue-500);
          }
        }
      }
      .desc-box {
        width: 100%;
        min-width: 200px;
        min-height: 2px;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #525252;
        padding-left: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .user-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20px;
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        font-weight: normal;
        color: #afabb3;
        /* padding-left: 8px; */
        .left-user {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 20px;
          height: 100%;
        }
        .right-box {
          display: flex;
          align-items: center;
          gap: 20px;
          .info-box-num {
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 8px;
            height: 100%;
            .icon {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
