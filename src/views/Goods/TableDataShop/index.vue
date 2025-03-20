<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

import type { IData } from '../data'
import TabPane from './components/TabPane.vue'

const { topTitleList, tableData } = defineProps<{
  topTitleList: any[]
  tableData: IData[]
}>()

const activeName = ref('all')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="table-shop">
    <k-tabs v-model="activeName" class="shop-tabs" @tab-click="handleClick">
      <k-tab-pane v-for="(item, index) in topTitleList" :key="index" :label="item.label" :name="item.name">
        <template #default>
          <div class="tab-pane-box">
            <TabPane :table-data="tableData" />
          </div>
        </template>
      </k-tab-pane>
    </k-tabs>
  </div>
</template>

<style lang="scss" scoped>
.table-shop {
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  padding: 50px;
  .tab-pane-box {
    display: flex;
    min-height: 200px;
    height: 100%;
  }
}
</style>
