<script setup lang="ts">
import UserCard from '@/views/home/component/UserCard.vue'
import Banner from '@/views/home/component/Banner.vue'
import HotCard from '@/views/classList/component/HotCard.vue'
import { getHomeAllDataAPI } from '@/api/home'
import { onMounted, ref } from 'vue'

const noticeListData = ref<any[]>([])
const weekHotListData = ref<any[]>([])
const getNoticeList = async () => {
  const { noticeList, weekHotList } = await getHomeAllDataAPI()
  noticeListData.value = noticeList
  weekHotListData.value = weekHotList
}
onMounted(() => {
  getNoticeList()
})
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
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: fit-content;
  gap: 16px;
  width: 100%;
  position: sticky;
  top: 84px;
  .user-box {
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
