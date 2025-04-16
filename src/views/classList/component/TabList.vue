<script setup lang="ts">
import { ref } from 'vue'
import PageList from './PageList.vue'

const activeName = ref('all')

function handleClick(tabName: string) {
  console.log('tabName--->', tabName)
}
const filterBtnValue = ref('a')
const filterBtnList = ref([
  {
    label: '综合',
    name: 'a',
  },
  {
    label: '最新',
    name: 'b',
  },
])
const tabTitleList = ref([
  { label: '全部', name: 'all' },
  { label: '平台功能', name: 'a' },
  { label: '函数', name: 'b' },
  { label: '数据库', name: 'c' },
])

const filterChangeBtn = (name: string) => {
  console.log('name--->', name)
}
const xx = () => {
  console.log('1111--->', 1111)
}
</script>

<template>
  <div class="tab-list">
    <k-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <div class="select-btn">
        <k-slider-button
          @click="xx"
          @change="filterChangeBtn"
          :items="filterBtnList"
          :active="filterBtnValue"
        ></k-slider-button>
      </div>
      <k-tab-pane v-for="(item, index) in tabTitleList" :label="item.label" :name="item.name">
        <div class="tab-div-content"><PageList /></div>
      </k-tab-pane>
    </k-tabs>
  </div>
</template>

<style lang="scss" scoped>
.tab-list {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 0 32px;
  .select-btn {
    position: absolute;
    display: flex;
    right: 0;
    top: 3px;
    height: 40px;
    width: 140px;
    box-sizing: border-box;
    padding: 0 15px;
    .k-slider-button {
      height: 32px;
      font-size: 12px;
      &::before {
        height: unset;
        height: 24px;
      }
      :deep(.k-slider-button-pane) {
        height: 100%;
      }
    }
  }
  .k-tabs {
    height: 100%;
  }
  .tab-div-content {
    min-height: calc(100vh - 300px);
  }
}
</style>
