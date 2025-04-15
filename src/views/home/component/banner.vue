<script setup lang="ts">
import { ref } from 'vue'
import Banner1 from '@/assets/images/banner/banner1.png'
import Banner2 from '@/assets/images/banner/banner2.png'
import Banner3 from '@/assets/images/banner/banner3.png'
type IPictureType = {
  name: string
  src: string
  alt: string
}
const { PictureList } = defineProps<{
  PictureList?: IPictureType[]
}>()
const bannerList = ref<IPictureType[]>([
  { name: 'banner1', src: Banner1, alt: '' },
  { name: 'banner2', src: Banner2, alt: '' },
  { name: 'banner3', src: Banner3, alt: '' },
])
</script>

<template>
  <div class="banner">
    <k-carousel trigger="click" height="232px">
      <k-carousel-item v-for="(item, index) in PictureList || bannerList" :key="index" class="k-carousel__item">
        <k-image :src="item.src" style="width: 100%; height: 100%" />
      </k-carousel-item>
    </k-carousel>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
}
</style>
