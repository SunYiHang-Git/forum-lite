<script setup lang="ts">
import { openPostDetail } from '@/utils/tools'
import { useRouter } from 'vue-router'
const router = useRouter()
const { title, list, icon, isClick } = defineProps<{
  title: string
  list: any
  icon?: string
  /** 是否可以点击跳转 */
  isClick?: boolean
}>()
const env = import.meta.env
const goDetail = (item: any) => {
  if (!isClick) {
    return
  }
  openPostDetail(item.id)
}
</script>

<template>
  <div class="hot-box-card">
    <div class="header-title">{{ title }}</div>
    <div class="NewAnnouncement">
      <div v-for="item in list" :key="item.id" class="lis-name">
        <div v-if="icon" class="icon">
          <component :is="item.icon ?? icon" color="var(--k-gray-400)" :size="16" />
        </div>
        <div v-if="item.icon" class="icon">
          <div class="dfc" style="width: 100%; height: 100%; border-radius: 50%; background-color: #eff6ff">
            <component :is="item.icon ?? icon" :color="item.iconColor ?? 'var(--k-gray-400)'" />
          </div>
        </div>
        <div class="title" @click="goDetail(item)">
          {{ item.title }}
          <span style="font-size: 16px; font-weight: 600">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
    gap: 4px;
    width: 100%;
    height: 24px;
    color: var(--k-gray-700);
    & :hover {
      color: var(--k-blue-500);
    }
    .icon {
      overflow: hidden;
    }
    .title {
      flex: 1;
      height: 24px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: 16px;
      font-weight: normal;
      cursor: pointer;
    }
  }
}
</style>
