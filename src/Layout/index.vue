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
  overflow-y: auto;
  .el-container {
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
      padding: 0;
      width: 100%;
    }
  }
}
</style>
