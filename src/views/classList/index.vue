<script setup lang="ts">
import NavClass from './component/NavClass.vue'
import TabList from './component/TabList.vue'
import RightUser from './component/RightUser.vue'
import { useRoute } from 'vue-router'
import { onUnmounted, ref } from 'vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import { homeNavIds } from '@/const/home'
import { getArticleTypeListAPI } from '@/api/home'

const route = useRoute()
/** 父专栏 name */
const activeCardName = ref('knowledge')
/** 父专栏 ID */
const activePid = ref('')
/** 解析跳转路由参数 */
function handleRouteQuery() {
  const name = route.name
  activeCardName.value = name as string
  switch (name) {
    case 'knowledge':
      activePid.value = homeNavIds.KNOWLEDGE_ID
      break
    case 'interaction':
      activePid.value = homeNavIds.INTERACTION_ID
      break
    case 'notice':
      activePid.value = homeNavIds.NOTICE_ID
      break
    default:
      break
  }
}

/** 获取首页分类 */
const getHomeClassList = async () => {
  const { parentList } = await getArticleTypeListAPI()
  parentList.forEach((item): any => {
    const { postsTypeName, postsTypeId } = item
    if (!postsTypeName) return
    switch (postsTypeName) {
      case '知识分享':
        homeNavIds.KNOWLEDGE_ID = postsTypeId
        break
      case '互动解答':
        homeNavIds.INTERACTION_ID = postsTypeId
        break
      case '公告':
        homeNavIds.NOTICE_ID = postsTypeId
        break
      default:
        break
    }
  })
  handleRouteQuery()
}
getHomeClassList()

/** 搜索值 */
const searchVale = ref('')
const searchPostList = (value: string) => {
  searchVale.value = value
}

onUnmounted(() => {
  activePid.value = ''
})
</script>

<template>
  <div class="class-list-box">
    <div class="class-list">
      <div style="width: 100%; height: 30px">
        <Breadcrumb />
      </div>
      <div class="nav">
        <NavClass :activeCardName="activeCardName" @searchPostList="searchPostList" />
      </div>
      <div class="main-box">
        <div class="main-list">
          <TabList v-if="activePid" :pid="activePid" :searchVale="searchVale" />
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
    padding-top: 32px;
    padding-bottom: 32px;
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
      overflow-x: hidden;
    }
    .user-right {
      width: 400px;
    }
  }
}
</style>
