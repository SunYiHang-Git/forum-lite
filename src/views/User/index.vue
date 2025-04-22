<script setup lang="ts">
import { getArticleTypeListAPI, getClassByIdAPI } from '@/api/home'
import MakeCenter from '@/views/User/components/MakeCenter.vue'
import HotCard from '@/views/classList/component/HotCard.vue'
import TabList from '@/views/classList/component/TabList.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const tabList = ref([
  {
    label: '提问',
    name: 'a',
  },
  {
    label: '文章',
    name: 'b',
  },
  {
    label: '收藏',
    name: 'c',
  },
])

const activeName = ref('a')

const handleClick = (name: string) => {
  console.log('name--->', name)
}
const pageClassList = ref<any[]>([])
/** 获取 */
/** 获取帖子分类 */
const getArticleType = async (id: string) => {
  const { parentList } = await getArticleTypeListAPI()
  const findItem = parentList?.find((item: any) => item.postsTypeId === id)
  if (!findItem) return
  //   nowPageDataInfo.value = { ...findItem }
  pageClassList.value = await getClassByIdAPI({ id })
  const one = { postsTypeName: '全部', postsTypeId: 'all', postsTypeDesc: '全部数据' }
  pageClassList.value.unshift(one)
  pageClassList.value.forEach((item) => {
    item.pid = id
  })
  console.log('pageClassList.value--->', pageClassList.value)
}
getArticleType('AA7CBEAA4FDC4F64AF2C1A62797FE95E')

const breadcrumbs = ref<any[]>([])

// const buildBreadcrumbs = () => {
//     const matched = route.matched.filter((record) => record.meta && record.meta.title)
//     breadcrumbs.value = matched.map((record) => ({
//       label: record.name,
//       routeName: record.path,
//     }))
//   breadcrumbs.value.unshift({ label: 'user', path: '/user' })
//   breadcrumbs.value.unshift({ label: 'home', path: '/' })
//   console.log('breadcrumbs.value--->', breadcrumbs.value)
// }
</script>

<template>
  <div class="user-box">
    <div class="user-top">
      <div class="breadcrumb">
        <k-breadcrumb separator="/">
          <k-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :to="{ path: crumb.path }">
            {{ crumb.label }}
          </k-breadcrumb-item>
        </k-breadcrumb>
      </div>
      <div class="user-info-top">
        <div class="avatar dfc">头像</div>
        <div class="username-desc-box djc">
          <div class="user-name">是的发烧发烧</div>
          <div class="info-box">来自珠海 | 社区菜鸟 | 2022-01-01加入</div>
          <div class="desc">这个人很懒</div>
        </div>
        <K-button main>编辑资料</K-button>
      </div>
    </div>
    <div class="my-article-big-box">
      <div class="left-list-box">
        <!-- <k-tabs v-model="activeName" @tab-click="handleClick">
          <k-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
            <div class="k-tabPane-box">
              <PageList :tableData="[]" />
            </div>
          </k-tab-pane>
        </k-tabs> -->
        <TabList :params="pageClassList" />
      </div>
      <div class="right-aside-box djc">
        <MakeCenter />
        <HotCard title="个人成就" :list="[]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-box {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: calc(100vh - 70px);
  background: url('@/assets/images/user-bg.png') no-repeat top;
  background-size: 100% 100%;
  padding-top: 40px;
  padding-bottom: 10px;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .djc {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .user-top {
    width: 100%;
    max-width: 1380px;
    min-width: 960px;
    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 22px;
      background-color: rgb(231, 231, 231);
    }
    .user-info-top {
      display: flex;
      justify-content: start;
      gap: 24px;
      align-items: center;
      width: 100%;
      margin-top: 24px;
      .avatar {
        width: 86px;
        height: 86px;
        border-radius: 50%;
        background-color: pink;
      }
      .username-desc-box {
        flex: 1;
        justify-content: space-between;
        align-items: start;
        height: 86px;
        font-size: 12px;
        font-weight: normal;
        color: #38363c;
        .user-name {
          font-size: 20px;
          font-weight: 600;
          line-height: 28px;
          letter-spacing: 0px;
          color: #171717;
        }
      }
      .k-button {
        width: 80px;
      }
    }
  }
  .my-article-big-box {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: start;
    max-width: 1380px;
    min-width: 960px;
    width: 100%;
    .left-list-box {
      flex: 1;
      min-height: calc(100vh - 270px);
      background-color: #fff;
      border-radius: 12px;
      padding: 16px 32px;
      .k-tabs {
        width: 100%;
        min-height: calc(100vh - 302px);
        :deep(.el-tabs__header) {
          height: 40px;
          margin-bottom: 15px;
        }
        :deep(.el-tabs__content) {
          min-height: calc(100% - 55px);
          width: 100%;
          .k-tab-item {
            width: 100%;
          }
        }
        .k-tabPane-box {
          width: 100%;
          min-height: calc(100vh - 360px);
          height: fit-content;
        }
      }
    }
    .right-aside-box {
      gap: 24px;
      width: 400px;
      height: fit-content;
      min-height: 100px;
    }
  }
}
</style>
