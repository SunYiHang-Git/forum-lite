<script setup lang="ts">
import NavClass from './component/NavClass.vue'
import TabList from './component/TabList.vue'
</script>

<template>
  <div class="class-list-box">
    <div class="class-list">
      <div class="nav">
        <NavClass />
      </div>
      <div class="main-box">
        <div class="main-list">
          <TabList />
        </div>
        <div class="user-right">11</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-list-box {
  display: flex;
  align-items: center;
  flex-direction: column; // 设置主轴方向为垂直方向
  justify-content: flex-start; // 子元素从顶部开始排列
  min-height: calc(100vh - 60px);
  background-color: #f9f9f9;
  overflow: hidden;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .class-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    min-height: calc(100vh - 60px);
    gap: 24px;
    box-sizing: border-box;
    padding-top: 40px;
    .nav {
      width: 100%;
      height: 102px;
      overflow: hidden;
    }
    .main-box {
      flex: 1;
      display: flex;
      gap: 16px;
      min-height: calc(100vh - 226px);
      width: 100%;
    }
    .main-list {
      flex: 1;
      min-height: calc(100vh - 226px);
      max-width: 100%;
      padding-bottom: 20px;
      overflow: hidden;
    }
    .user-right {
      width: 400px;
    }
  }
}
</style>
