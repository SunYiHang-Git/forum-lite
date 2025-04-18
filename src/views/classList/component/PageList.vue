<script setup lang="ts">
import { useRouter } from 'vue-router'

const { tableData } = defineProps<{
  tableData: any[]
}>()
const router = useRouter()
const handleDetail = (item: any) => {
  router.push(`/detail/${item.id}`)
  // const routePath = router.resolve({ name: 'detail', params: { id: item.id } })
  // window.open(routePath.href, '_blank')
}
</script>

<template>
  <div class="page-list">
    <div class="list-box">
      <div class="lis-box" v-for="item in tableData" :key="item.id">
        <div class="title-box">
          <div class="tags">
            <div class="tag dfc">精华</div>
          </div>
          <div class="title" @click="handleDetail(item)">{{ item.title }}</div>
        </div>
        <div class="desc-box">{{ item.title }}</div>
        <div class="user-info-box">
          <div class="left-user">
            <div class="username">{{ item.userName }}</div>
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
    .lis-box {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 12px;
      width: 100%;
      height: 131px;
      box-sizing: border-box;
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
      .title-box {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 4px;
        height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .tags {
          height: 100%;
          width: fit-content;
          .tag {
            height: 100%;
            box-sizing: border-box;
            padding: 0 5px;
            font-family: Alibaba PuHuiTi 3;
            font-size: 12px;
            font-weight: 500;
            line-height: 150%;
            letter-spacing: 0em;
            color: #cc6402;
            background-color: #fff6d3;
            border-radius: 4px;
          }
        }
        .title {
          font-family: Alibaba PuHuiTi 3;
          font-size: 18px;
          font-weight: 500;
          line-height: normal;
          color: #171717;
          cursor: pointer;
        }
      }
      .desc-box {
        width: 100%;
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #525252;
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
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        color: #afabb3;
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
