<script setup lang="ts">
import TopTools from './components/TopTools.vue'
</script>

<template>
  <div class="lite-tools">
    <TopTools />
    <div class="tableData-box">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lite-tools {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0px;
  width: 100%;
  height: 100vh;
  font-family: Alibaba PuHuiTi 2;

  .tableData-box {
    // min-width: 1032px;
    width: 1175px;
    height: calc(100vh - 160px);
    padding: 12px 24px;
  }
}
</style>
