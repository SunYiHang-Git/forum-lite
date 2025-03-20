<script setup lang="ts">
import MainRight from './MainRight/index.vue'
</script>

<template>
  <div class="goods-box">
    <div class="aside">
      <div class="menu">金智维市场</div>
    </div>
    <div class="main-box">
      <MainRight />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods-box {
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 280px;
    height: 100%;
    .menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 12px;
      gap: 8px;
      width: 256px;
      height: 36px;
      border-radius: 8px;
      background-color: var(--k-active-bg-color-1);
      cursor: pointer;
    }
  }
  .main-box {
    flex: 1;
    // min-height: 100px;
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>
