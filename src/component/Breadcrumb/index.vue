<script setup lang="ts">
import { useRouterInfo, type IBreadcrumbs } from '@/store/modules/useRouterInfo'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const { breadcrumbList } = storeToRefs(useRouterInfo())
const { setBreadcrumbList, clearBreadcrumbList } = useRouterInfo()

const route = useRoute()

/** 处理路由 */
function initRoute() {
  const routerArr: IBreadcrumbs[] = []
  clearBreadcrumbList()
  route.matched.forEach((item: any) => {
    if (item.meta && item.meta.breadcrumb) {
      const { breadcrumb } = item.meta
      const data = { path: item.path, name: item.name, label: breadcrumb }
      routerArr.push(data)
      setBreadcrumbList(data)
    }
  })
}

watch(() => route, initRoute, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <div class="breadcrumb">
    <k-breadcrumb separator="/">
      <k-breadcrumb-item v-for="(crumb, index) in breadcrumbList" :key="index" :to="{ path: crumb.path }">
        {{ crumb.label }}
      </k-breadcrumb-item>
    </k-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
