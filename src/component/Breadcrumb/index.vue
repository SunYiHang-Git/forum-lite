<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
interface IBreadcrumbs {
  path: string
  name: string
  label: string
  [key: string]: any
}
const breadcrumbs = ref<IBreadcrumbs[]>([
  {
    path: '/home',
    name: 'home',
    label: '社区首页',
  },
])
const addRouter = (arr: any[]) => {
  arr.forEach((item) => {
    const { path } = item
    const findItem = breadcrumbs.value.find((bread) => bread.path === path)
    if (findItem) return
    breadcrumbs.value.push(item)
  })
  console.log('breadcrumbs.value--->', breadcrumbs.value)
}
const routeComputed = computed(() => {
  const arr = route.matched.filter((route) => route.meta && route.meta.breadcrumb)
  addRouter(arr)
  return route.matched.filter((route) => route.meta && route.meta.breadcrumb)
})
setTimeout(() => {
  console.log('breadcrumbs.value--->', routeComputed.value)
}, 1000)
</script>

<template>
  <div class="breadcrumb">
    <k-breadcrumb separator="/">
      <k-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :to="{ path: crumb.path }">
        {{ crumb.path }}
      </k-breadcrumb-item>
    </k-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  height: 100%;
  background-color: rgb(179, 19, 19);
}
</style>
