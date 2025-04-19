<script setup lang="ts">
import NavClass from './component/NavClass.vue'
import TabList from './component/TabList.vue'
import RightUser from './component/RightUser.vue'
import { useRoute } from 'vue-router'
import { getArticleTypeListAPI, getClassByIdAPI } from '@/api/home'
import { ref } from 'vue'

const route = useRoute()
/** 互动解答信息 */
const nowPageDataInfo = ref<any>({})
/** 页面分配 */
const pageClassList = ref<any[]>([])
/** 获取 */
/** 获取帖子分类 */
const getArticleType = async (id: string) => {
  const { parentList } = await getArticleTypeListAPI()
  const findItem = parentList?.find((item: any) => item.postsTypeId === id)
  if (!findItem) return
  nowPageDataInfo.value = { ...findItem }
  pageClassList.value = await getClassByIdAPI({ id })
  const one = { postsTypeName: '全部', postsTypeId: 'all', postsTypeDesc: '全部数据' }
  pageClassList.value.unshift(one)
  pageClassList.value.forEach((item) => {
    item.pid = id
  })
  console.log('pageClassList.value--->', pageClassList.value)
}

/** 解析跳转路由参数 */
function handleRouteQuery() {
  const { type }: any = route.query
  getArticleType(type)
}
handleRouteQuery()
</script>

<template>
  <div class="class-list-box">
    <div class="class-list">
      <div class="nav">
        <NavClass :params="nowPageDataInfo" />
      </div>
      <div class="main-box">
        <div class="main-list">
          <TabList :params="pageClassList" />
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
  overflow: hidden;
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
      gap: 16px;
      min-height: calc(100vh - 226px);
      width: 100%;
    }
    .main-list {
      flex: 1;
      min-height: calc(100vh - 226px);
      max-width: 100%;
      padding-bottom: 20px;
      overflow: hidden;
    }
    .user-right {
      width: 400px;
      padding-bottom: 20px;
      overflow: hidden;
    }
  }
}
</style>
