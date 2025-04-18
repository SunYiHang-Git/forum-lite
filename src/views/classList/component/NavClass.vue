<script setup lang="ts">
import interactionSvg from '@/assets/svg/interaction.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'

const { params } = defineProps<{
  params: any
}>()
</script>

<template>
  <div class="nav-class">
    <div class="left-name dfc">
      <div class="icon dfc">
        <img v-if="params.postsTypeName === '互动解答'" :src="interactionSvg" />
        <img v-if="params.postsTypeName === '知识分享'" :src="knowledgeSvg" />
        <img v-if="params.postsTypeName === '公告'" :src="noticeSvg" />
      </div>
      <div class="name-box">
        <div class="name">{{ params.postsTypeName }}</div>
        <div class="desc">{{ params.postsTypeDesc }}</div>
      </div>
    </div>
    <div class="right-btn dfc">
      <div class="search-box">
        <k-input placeholder="搜索..." suffix-icon="IconSearch" style="width: 160px"></k-input>
      </div>
      <k-button main>我要提问</k-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px 32px;
  gap: 24px;
  background-color: #fff;
  .left-name {
    flex: 1;
    justify-content: start;
    gap: 22px;
    .icon {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name-box {
      flex: 1;
      .name {
        font-family: Alibaba PuHuiTi 3;
        font-size: 24px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 0px;
        color: #3d3d3d;
      }
      .desc {
        width: 80%;
        margin-top: 8px;
        font-family: Alibaba PuHuiTi 3;
        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #3d3d3d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .right-btn {
    justify-content: start;
    gap: 8px;
    width: fit-content;
  }
}
</style>
