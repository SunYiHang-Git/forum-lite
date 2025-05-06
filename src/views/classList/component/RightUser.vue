<script setup lang="ts">
import UserCard from '@/views/home/component/UserCard.vue'
import Banner from '@/views/home/component/Banner.vue'
import HotCard from '@/views/classList/component/HotCard.vue'
import { getHomeAllDataAPI } from '@/api/home'
import { ref } from 'vue'

const noticeListData = ref<any[]>([])
const weekHotListData = ref<any[]>([])
const getNoticeList = async () => {
  const { noticeList, weekHotList } = await getHomeAllDataAPI()
  noticeListData.value = noticeList
  weekHotListData.value = weekHotList
}
getNoticeList()
</script>

<template>
  <div class="right-user">
    <div class="user-box">
      <UserCard />
    </div>
    <div class="banner-box">
      <Banner :height="114" />
    </div>
    <div class="now-box">
      <HotCard title="最新公告" :list="noticeListData" />
    </div>
    <div class="hot-box">
      <HotCard icon="IconMessageFill" title="热门" :list="weekHotListData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-user {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 16px;
  width: 100%;
  .user-box {
    position: sticky;
    top: 60px;
    width: 100%;
    min-height: 172px;
    border-radius: 12px;
    background-color: #fff;
    z-index: 3;
  }
  .banner-box {
    width: 100%;
    height: 114px;
    border-radius: 10px;
    background-color: pink;
    overflow: hidden;
  }
  .now-box,
  .hot-box {
    width: 100%;
    min-height: 100px;
    height: fit-content;
  }
}
</style>
