<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

import { tableData } from '../data'
import TabPane from './components/TabPane.vue'

const img =
  'https://ts1.tc.mm.bing.net/th/id/R-C.d7e9b73f67eea88918f341eb509ed65e?rik=Wy5%2fpmI%2bMqYL4w&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2021%2f04-21%2f99504%2fwater_99504_698_698_.png&ehk=SgPCThmJO90qw8DdGy6Cpk0aNE49KqytBFUx2VVWnc4%3d&risl=&pid=ImgRaw&r=0'

const topTitleList = [
  {
    label: '全部',
    name: 'all',
  },
  {
    label: '金融',
    name: 'banking',
  },
  {
    label: '信贷',
    name: 'credit',
  },
  {
    label: '生活',
    name: 'life',
  },
  {
    label: '电商',
    name: 'retailers',
  },
  {
    label: '财务',
    name: 'finance',
  },
]

const activeName = ref('all')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  console.log('tab--->', tab)
  console.log('event--->', event)
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
  height: 100%;
  .shop-tabs {
    height: 100%;
    .k-tab-item {
      height: 100%;
    }
  }
  .tab-pane-box {
    height: 100%;
  }
}
</style>
