<script setup lang="ts">
import helpSvg from '@/assets/svg/help.svg'
import interactionSvg from '@/assets/svg/interaction.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'
import { helpDocumentUel } from '@/views/home'
import { ref } from 'vue'
const navCardList = ref([
  {
    name: '知识分享',
    desc: '传播智慧的桥梁',
    src: '',
    imgSvg: knowledgeSvg,
  },
  {
    name: '互动解答',
    desc: '交流思想的舞台',
    src: '',
    imgSvg: interactionSvg,
  },
  {
    name: '官方公馆',
    desc: '传递信息的窗口',
    src: '',
    imgSvg: noticeSvg,
  },
  {
    name: '帮助文档',
    desc: '指引操作的指南',
    src: helpDocumentUel,
    imgSvg: helpSvg,
  },
])

/** 跳转 */
function goUrl(src: string) {
  const httpRegex = /^(http|https):\/\//
  if (src === '') return
  if (httpRegex.test(src)) {
    console.log('src--->', src)
    window.open(src)
    return
  }
}
</script>

<template>
  <div class="nav-card">
    <div v-for="(item, index) in navCardList" :key="index" @click="goUrl(item.src)" class="nav-link">
      <div class="nav-icon">
        <img :src="item.imgSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">{{ item.name }}</div>
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
  gap: 0;
  justify-items: center;
  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    height: 96px;
    padding: 0 10px;
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
