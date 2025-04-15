<script setup lang="ts">
import helpSvg from '@/assets/svg/help.svg'
import interactionSvg from '@/assets/svg/interaction.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'
</script>

<template>
  <div class="nav-card">
    <div class="nav-link">
      <div class="nav-icon">
        <img :src="knowledgeSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">知识分享</div>
        <div class="desc">传播智慧的桥梁</div>
      </div>
    </div>
    <div class="nav-link">
      <div class="nav-icon">
        <img :src="interactionSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">互动解答</div>
        <div class="desc">交流思想的舞台</div>
      </div>
    </div>
    <div class="nav-link">
      <div class="nav-icon">
        <img :src="noticeSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">官方公馆</div>
        <div class="desc">传递信息的窗口</div>
      </div>
    </div>
    <div class="nav-link">
      <div class="nav-icon">
        <img :src="helpSvg" />
      </div>
      <div class="nav-connect">
        <div class="title">帮助文档</div>
        <div class="desc">指引操作的指南</div>
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
