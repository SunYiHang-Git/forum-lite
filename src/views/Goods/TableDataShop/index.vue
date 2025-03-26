<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'

import TabPane from './components/TabPane.vue'
import type { IGoodDataType, ITagType } from '@/types/goods'
export interface ITabDataList {
  id: string
  label: string
  name: string
  /** 数据 */
  tableData: IGoodDataType[]
  /** 页码尺寸 */
  pageSize?: number
  /** 当前页码 */
  pageNumber: number
  /** 总页码 */
  page: number
  /** 总页数 */
  total: number
}

const { tabDataList } = defineProps<{
  tabDataList: ITabDataList[]
}>()
const activeName = ref('all')

const emits = defineEmits<{
  (e: 'sendTabId', id: string): void
}>()

/** tab 切换事件 */
async function handleClick(tabName: string) {
  const findItem = tabDataList.find((item) => item.id === tabName)
  if (!findItem) return
  emits('sendTabId', findItem.id)
}
</script>

<template>
  <div class="table-shop">
    <k-tabs v-model="activeName" class="shop-tabs" @tab-change="handleClick">
      <k-tab-pane v-for="(item, index) in tabDataList" :key="index" :label="item.label" :name="item.name">
        <template #default>
          <div class="tab-pane-box">
            <TabPane :table-data="item.tableData" />
          </div>
        </template>
      </k-tab-pane>
    </k-tabs>
  </div>
</template>

<style lang="scss" scoped>
.table-shop {
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  padding-top: 80px;
  .tab-pane-box {
    display: flex;
  }
}
</style>
