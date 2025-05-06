<script setup lang="ts">
import { computed, ref } from 'vue'
import Banner1 from '@/assets/images/banner/banner1_2.png'
import Banner2 from '@/assets/images/banner/banner2_2.png'
import Banner3 from '@/assets/images/banner/banner3_2.png'
type IPictureType = {
  name: string
  src: string
  alt: string
}
const { PictureList, height } = defineProps<{
  PictureList?: IPictureType[]
  height?: number
}>()
const carouselItemHeight = computed(() => {
  return (height ?? 232) + 'px'
})
const bannerList = ref<IPictureType[]>([
  { name: 'banner1', src: Banner1, alt: '' },
  { name: 'banner2', src: Banner2, alt: '' },
  { name: 'banner3', src: Banner3, alt: '' },
])
</script>
<template>
  <div class="banner">
    <k-carousel trigger="click" :style="{ height: carouselItemHeight }">
      <k-carousel-item
        :style="{ height: carouselItemHeight }"
        v-for="(item, index) in PictureList || bannerList"
        :key="index"
      >
        <k-image :src="item.src" style="width: 100%; height: 100%" fit="cover" />
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
