<script setup lang="ts">
import NavClass from './component/NavClass.vue'
import TabList from './component/TabList.vue'
import RightUser from './component/RightUser.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import { INTERACTION_ID, KNOWLEDGE_ID, NOTICE_ID } from '@/const/home'

const route = useRoute()
/** 父专栏 name */
const activeCardName = ref('knowledge')
/** 父专栏 ID */
const activePid = ref(KNOWLEDGE_ID)
/** 解析跳转路由参数 */
function handleRouteQuery() {
  const name = route.name
  activeCardName.value = name as string
  switch (name) {
    case 'knowledge':
      activePid.value = KNOWLEDGE_ID
      break
    case 'interaction':
      activePid.value = INTERACTION_ID
      break
    case 'notice':
      activePid.value = NOTICE_ID
      break
    default:
      break
  }
}
handleRouteQuery()
</script>

<template>
  <div class="class-list-box">
    <div class="class-list">
      <div style="width: 100%; height: 30px">
        <Breadcrumb />
      </div>
      <div class="nav">
        <NavClass :activeCardName="activeCardName" />
      </div>
      <div class="main-box">
        <div class="main-list">
          <TabList :pid="activePid" />
        </div>
        <div class="user-right">
          <RightUser />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-list-box {
  display: flex;
  align-items: center;
  flex-direction: column; // 设置主轴方向为垂直方向
  justify-content: flex-start; // 子元素从顶部开始排列
  min-height: calc(100vh - 60px);
  background-color: #f9f9f9;
  // overflow: hidden;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .class-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    min-height: calc(100vh - 60px);
    gap: 24px;
    box-sizing: border-box;
    padding-top: 40px;
    .nav {
      width: 100%;
      height: 102px;
      overflow: hidden;
    }
    .main-box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      min-height: calc(100vh - 226px);
      width: 100%;
    }
    .main-list {
      flex: 1;
      min-height: calc(100vh - 226px);
      padding-bottom: 20px;
      overflow-x: hidden;
    }
    .user-right {
      width: 400px;
      padding-bottom: 20px;
    }
  }
}
</style>
