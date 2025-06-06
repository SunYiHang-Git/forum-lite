<script setup lang="ts">
import { ref } from 'vue'

const column = ref([])
const tableData = ref<any[]>([])
function initWindow() {}
</script>

<template>
  <div class="banner-page">
    <div class="header-search">
      <k-button icon-left="IconRotateClockwise" main size="sm" @click="initWindow">刷新</k-button>
      <k-button icon-left="IconAdd" main size="sm" @click="initWindow">新增</k-button>
    </div>
    <div class="main-box">
      <div class="table-box"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-page {
  width: 100%;
  height: 100%;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    width: 100%;
    height: 60px;
  }
  .main-box {
    width: 100%;
    height: calc(100vh - 130px);
    .table-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
