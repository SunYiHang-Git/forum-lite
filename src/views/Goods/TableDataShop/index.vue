<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { ref, watch } from 'vue'

import type { IData } from '../data'
import TabPane from './components/TabPane.vue'

const { tabsList, tableData, activeNameTab } = defineProps<{
  tabsList: any[]
  tableData: IData[]
  activeNameTab: string
}>()

const activeName = ref('all')

const handleClick = (tabName: string) => {
  console.log('tab--->', tabName)
}

watch(
  () => activeNameTab,
  (val) => {
    if (!val) return
    activeName.value = val
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="table-shop">
    <k-tabs v-model="activeName" class="shop-tabs" @tab-change="handleClick">
      <k-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name">
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
  box-sizing: border-box;
  padding: 50px;
  padding-top: 80px;
  .tab-pane-box {
    display: flex;
  }
}
</style>
