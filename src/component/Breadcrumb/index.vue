<script setup lang="ts">
import { useRouterInfo } from '@/store/modules/useRouterInfo'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// const { breadcrumbList } = useRouterInfo()
interface IBread {
  path: string
  meta: {
    title?: string
    icon?: string
    /** 面包屑展示名称 */
    breadcrumb: string
  }
}

const route = useRoute()

const home: IBread = {
  /** 跳转路径 */
  path: '/home',
  /** 元信息 */
  meta: { title: 'RPA Lite 论坛', icon: 'el-icon-s-home', breadcrumb: '社区首页' },
}

const breadcrumbList = computed(() => {
  const routerArr: IBread[] = []
  route.matched.forEach((item: any) => {
    if (item.meta && item.meta.breadcrumb) {
      const { title, icon, breadcrumb } = item.meta
      routerArr.push({ path: item.path, meta: { title, icon, breadcrumb } })
    }
  })
  routerArr.unshift(home)
  return routerArr
})
setTimeout(() => {}, 1000)
</script>

<template>
  <div class="breadcrumb">
    <k-breadcrumb separator="/">
      <k-breadcrumb-item v-for="(crumb, index) in breadcrumbList" :key="index" :to="{ path: crumb.path }">
        {{ crumb.meta.breadcrumb }}
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
