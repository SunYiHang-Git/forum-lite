<script setup lang="ts">
import { ref } from 'vue'
import ApplicationCom from '../components/ApplicationManage.vue'
import ClassifyBox from '../components/ClassifyBox.vue'
import TagManage from '../components/TagManage.vue'

const activeName = ref('classify')

const tabsList = [
  {
    label: '应用管理',
    name: 'app',
    component: ApplicationCom,
  },
  {
    label: '分类管理',
    name: 'classify',
    component: ClassifyBox,
  },
  {
    label: '标签管理',
    name: 'tag',
    component: TagManage,
  },
]

const handleChange = (tab: string) => {
  console.log('tab--->', tab)
}
</script>

<template>
  <div class="application-box">
    <k-tabs v-model="activeName" @tab-change="handleChange">
      <k-tab-pane v-for="item in tabsList" :key="item.name" :label="item.label" :name="item.name">
        <div class="pane-box">
          <component :is="item.component"></component>
        </div>
      </k-tab-pane>
    </k-tabs>
  </div>
</template>

<style lang="scss" scoped>
.application-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 16px;
  .k-tabs {
    height: 100%;
    :deep(.k-tab-item) {
      height: 100%;
    }
  }
  .pane-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
