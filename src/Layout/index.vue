<script setup lang="ts">
import TopNav from './component/TopNav.vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header>
        <TopNav />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: center;
  max-width: 99vw;
  min-height: 100vh;
  .el-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    .el-header {
      max-width: 1200px;
      width: 100%;
      height: 60px;
      padding: 0;
    }
    .el-main {
      min-height: calc(100vh - 60px);
      flex: 1;
      padding: 0;
      width: 100%;
      overflow: visible;
    }
  }
}
</style>
