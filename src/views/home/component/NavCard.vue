<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavCardList } from '@/const/home'
const router = useRouter()

/** 跳转 */
function goUrl(src: string, name: string) {
  const httpRegex = /^(http|https):\/\//
  if (httpRegex.test(src)) {
    window.open(src)
    return
  }
  router.push(src)
}
</script>

<template>
  <div class="nav-card">
    <div v-for="(item, index) in NavCardList" :key="index" @click="goUrl(item.src, item.name)" class="nav-link">
      <div class="nav-icon">
        <img :src="item.imgSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">{{ item.label }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-card {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    height: 96px;
    padding: 0 10px;
    border-radius: 12px;
    width: 100%;
    background-color: #fff;
    cursor: pointer;
    .nav-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
    .nav-connect {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      height: 48px;
      .title {
        font-family: Alibaba PuHuiTi 3;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 0px;
        color: #3d3d3d;
      }
      .desc {
        font-family: Alibaba PuHuiTi 3;
        font-size: 12px;
        font-weight: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #3d3d3d;
      }
    }
  }
}
</style>
