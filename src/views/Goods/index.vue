<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleMenu = (e: any) => {
  const target = e.target
  if (target && target.dataset && target.dataset.name) {
    const { name } = target.dataset
    router.push(name)
  }
}
</script>

<template>
  <div class="goods-box">
    <div class="aside">
      <div class="menu-box" @click="handleMenu">
        <div class="menu" data-name="store">金智维市场</div>
      </div>
    </div>
    <div class="main-box">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods-box {
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 280px;
    height: 100%;
    .menu-box {
      display: flex;
      justify-content: space-between;
      gap: 1px;
      width: 100%;
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
  }
  .main-box {
    flex: 1;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
