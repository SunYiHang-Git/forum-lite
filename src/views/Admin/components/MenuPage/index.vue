<script setup lang="ts">
import { KMessageBox } from '@ksware/ksw-ux'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

export interface IMenu {
  /** 图标 */
  icon: string
  /** 图标尺寸 */
  iconSize?: number
  /** 菜单名称 */
  label: string
  /** 字体尺寸 */
  size?: number
  /** 跳转路由 */
  router: string
}

const { menuList, isCollapse } = defineProps<{
  /** 展开收起 */
  isCollapse: boolean
  menuList: IMenu[]
}>()

const activeName = computed(() => {
  const name = route.meta.title as string
  return name
})

const handleRouter = async (item: IMenu) => {
  if (item.label === '论坛首页') {
    await KMessageBox.confirm('此操作将返回首页,是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  }
  router.push(item.router)
}
</script>

<template>
  <div class="menu-page">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      :class="['menu-item', { 'is-active': item.label === activeName }]"
      @click="handleRouter(item)"
    >
      <div class="menu-icon">
        <component :is="item.icon" :size="item.iconSize ?? 18" />
      </div>
      <div class="menu-title" v-if="isCollapse" :style="{ fontSize: (item.size ?? 14) + 'px' }">{{ item.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 3px;
  width: 100%;
  height: fit-content;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;
    padding: 0 10px;
    width: 100%;
    height: 50px;
    font-size: 14px;
    color: rgb(48, 49, 51);
    font-weight: 400;
    cursor: pointer;
    &.is-active {
      color: rgb(64, 158, 255);
    }
    .menu-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 100%;
      overflow: hidden;
    }
    .menu-title {
      flex: 1;
      display: flex;
      align-items: center;
      min-width: 80px;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
