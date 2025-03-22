<script setup lang="ts">
import { ref } from 'vue'

const widgets = ref(['search', 'refresh', 'filter', 'transfer', 'custom1', 'sizeControl'])
const column = ref<any[]>([
  {
    type: 'seq',
    width: '50',
    dataType: 'number',
  },

  {
    field: '',
    title: '',
  },
])
</script>

<template>
  <div class="tag-manage">
    <div class="title">标签</div>
    <div class="table-box">
      <k-tree-table :widgets="widgets" :data="[]" :column="column"></k-tree-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-manage {
  width: 100%;
  height: 100%;
  .title {
    font-family: Alibaba PuHuiTi 3;
    font-size: 24px;
    font-weight: bold;
    height: 32px;
    line-height: 32px;
    color: var(--k-text-title);
  }
  .table-box {
    width: 100%;
    height: calc(100% - 32px);
    box-sizing: border-box;
    padding-bottom: 5px;
  }
}
</style>
