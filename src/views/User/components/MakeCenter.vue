<script setup lang="ts">
import { getUserASllTypeNumAPI } from '@/api/home'
import MakeCenterSvg from '@/assets/svg/make-center.svg'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
interface IPropsParams {
  ArticleCount: number
  ByCollectCount: number
  CollectNum: number
  MonthByCollectCount: number
  MonthByReplyCount: number
  MonthPostCount: number
  MonthReplyCount: number
  PostCount: number
  QuestionCount: number
  RegisterTime: string
  ReplyCount: number
  City: string
  Signature: string
}

const { params } = defineProps<{
  params: IPropsParams
}>()
</script>

<template>
  <div class="make-center">
    <div class="top">
      <div class="name">创作中心</div>
      <div class="icon">
        <img :src="MakeCenterSvg" />
      </div>
    </div>
    <div class="bottom">
      <div class="post">
        <div class="num">{{ params.PostCount || 0 }}</div>
        <div class="type-name">帖子</div>
      </div>
      <div class="collect">
        <div class="num">{{ params.ByCollectCount || 0 }}</div>
        <div class="type-name">被收藏</div>
      </div>
      <div class="comment">
        <div class="num">{{ params.ReplyCount || 0 }}</div>
        <div class="type-name">评论</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.make-center {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 156px;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-left: 20px;
    width: 100%;
    height: 40px;
    .name {
      font-size: 20px;
      font-weight: 600;
      color: #38363c;
    }
    .icon {
      width: 80px;
      height: 40px;
      overflow: hidden;
    }
  }
  .bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 336px;
    height: 64px;
    .post,
    .collect,
    .comment {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      padding: 8px 24px;
      background-color: #f7fbfd;
      color: #2563eb;
      .num {
        height: 24px;
        line-height: 24px;
        font-size: 18px;
      }
      .type-name {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      }
    }
    .collect {
      color: #a52fff;
      background-color: #fdf5ff;
    }
    .comment {
      color: #f97316;
      background-color: #fff7ed;
    }
  }
}
</style>
