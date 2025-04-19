<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const { title, list, icon } = defineProps<{
  title: string
  list: any
  icon?: string
}>()

const goDetail = (item: any) => {
  router.push(`/detail/${item.id}`)
}
</script>

<template>
  <div class="hot-box-card">
    <div class="header-title">{{ title }}</div>
    <div class="NewAnnouncement">
      <div v-for="item in list" :key="item.id" class="lis-name">
        <div v-if="icon" class="icon">
          <component :is="icon" color="#999999" />
        </div>
        <div class="title" @click="goDetail(item)">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hot-box-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-height: 100px;
  border-radius: 12px;
  padding: 24px 32px;
  background-color: #fff;
  .header-title {
    height: 28px;
    font-family: Alibaba PuHuiTi 3;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: #000000;
  }
}
.NewAnnouncement {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 16px;
  width: 100%;
  height: fit-content;
  .lis-name {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;
    width: 100%;
    height: 24px;
    .icon {
      width: 24px;
      height: 24px;
      overflow: hidden;
    }
    .title {
      flex: 1;
      height: 24px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: Alibaba PuHuiTi 3;
      font-size: 16px;
      font-weight: normal;
      color: #171717;
      cursor: pointer;
    }
  }
}
</style>
