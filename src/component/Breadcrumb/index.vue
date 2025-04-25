<script setup lang="ts">
import { useRouterInfo } from '@/store/modules/useRouterInfo'
const { breadcrumbList } = useRouterInfo()
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
