<script setup lang="ts">
import { getThirdTypeDataAPI } from '@/api/home'
import HotCard from '@/views/classList/component/HotCard.vue'
import { ref } from 'vue'
const hotInteractionDataList = ref<any[]>([])
const hotKnowDataList = ref<any[]>([])
const getDataList = async () => {
  const { interHotList, knowHotList } = await getThirdTypeDataAPI()
  hotInteractionDataList.value = interHotList
  hotKnowDataList.value = knowHotList
}
getDataList()
</script>

<template>
  <div class="right-card">
    <div class="hot-answer">
      <HotCard title="热门回答" icon="IconMessageFill" :list="hotInteractionDataList" />
    </div>
    <div class="hot-article">
      <HotCard title="热门文章" icon="IconDocDetailFill" :list="hotKnowDataList" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
}
</style>
