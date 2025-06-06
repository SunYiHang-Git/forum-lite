<script setup lang="ts">
import { ref } from 'vue'
import menuPage, { type IMenu } from '@/views/Admin/components/MenuPage/index.vue'
import { useRouter } from 'vue-router'
import { adminRouter } from '@/router/module/admin'

const router = useRouter()
/** 控制是否折叠 */
const isCollapse = ref(true)

const menuList = ref<IMenu[]>([])

function initMenu() {
  const { path, children } = adminRouter
  const arr = children?.map((item) => {
    const { meta } = item
    return { icon: meta?.icon ?? '', label: meta?.title ?? '', router: `${path}/${item.path}` }
  })
  arr?.unshift({
    icon: 'IconHome',
    label: '论坛首页',
    router: '/home',
  })
  menuList.value = arr as IMenu[]
}
initMenu()
</script>

<template>
  <div class="admin-index">
    <div class="header">论坛后台管理</div>
    <div class="main-box">
      <div class="aside">
        <div class="menu-box">
          <menuPage :isCollapse="isCollapse" :menuList="menuList" />
        </div>
        <div class="collapse-icon" @click="isCollapse = !isCollapse">
          <IconLeft v-if="isCollapse" />
          <IconRight v-else />
        </div>
      </div>
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-index {
  width: 100%;
  height: 100vh;
  .header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: #303133;
    border-bottom: 1px solid #dcdfe6;
  }
  .main-box {
    display: flex;
    justify-content: start;
    gap: 4px;
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    .aside {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 4px;
      width: fit-content;
      height: 100%;
      transition: width 0.3s ease;
      font-size: 16px;
      color: white;
      overflow: hidden;
      border-right: 1px solid #dcdfe6;
      .menu-box {
        max-width: 200px;
        min-width: 0px;
        height: 100%;
        overflow-y: auto;
      }
      .collapse-icon {
        height: 50px;
        width: 30px;
        text-align: center;
        font-size: 22px;
        line-height: 50px;
        color: #303133;
        cursor: pointer;
      }
    }
    .content {
      flex: 1;
      min-width: 300px;
      height: 100%;
      overflow: hidden;
      padding: 0 10px;
    }
  }
}
</style>
