<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getHistoryListAPI } from '../ApplicationManage/components/data'
import type { IHistoryList } from '@/types/goods'

const { historyData } = defineProps<{
  historyData: any
}>()

const goBack = () => {
  historyData.goBack()
}
const id = computed(() => historyData.id)

const historyList = ref<IHistoryList[]>([])
onMounted(async () => {
  historyList.value = await getHistoryListAPI<IHistoryList>(id.value)
})
</script>

<template>
  <div class="history-version">
    <div class="top-title">
      <div class="back" @click="goBack"><IconLeft /></div>
      <div class="title-box">
        <div class="title">版本历史记录</div>
      </div>
    </div>
    <div class="history-main">
      <k-scrollbar max-height="100%">
        <div v-for="item in historyList" :key="item.id" class="version-box">
          <div class="left">
            <div class="version">{{ item.version }}</div>
            <div class="desc-box">
              {{ item.updateInfo }}
            </div>
          </div>
          <div class="time">{{ item.onLineTime }}</div>
        </div>
      </k-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history-version {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  .top-title {
    display: flex;
    align-items: start;
    height: 48px;
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      font-size: 25px;
      cursor: pointer;
    }
    .title-box {
      height: 100%;
      width: 100%;
      border-bottom: 1px solid var(--k-border-color);
      .title {
        height: 30px;
        line-height: 30px;
        font-family: Alibaba PuHuiTi 3;
        font-size: 24px;
        font-weight: bold;
        color: #0f0b1c;
      }
    }
  }
  .history-main {
    flex: 1;
    min-height: 100px;
    box-sizing: border-box;
    padding-left: 30px;
    overflow: hidden;
    .version-box {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 20px;
      margin-top: 30px;
      min-height: 50px;
      padding-right: 10px;
      .time {
        width: 100px;
        text-align: right;
        font-family: Alibaba PuHuiTi 2;
        font-size: 14px;
        color: var(--k-text-desc);
        font-weight: normal;
      }
      .left {
        flex: 1;
        min-width: 200px;
        min-height: 10px;
        .version {
          margin-bottom: 16px;
          font-family: Alibaba PuHuiTi 3;
          font-size: 16px;
          font-weight: bold;
          color: var(--k-text-title);
        }
        .desc-box {
          min-height: 1px;
          padding-bottom: 32px;
          color: var(--k-text-desc);
          border-bottom: 1px solid var(--k-border-color);
        }
      }
    }
  }
}
</style>
