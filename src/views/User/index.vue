<script setup lang="ts">
import { getArticleTypeListAPI, getUserASllTypeNumAPI } from '@/api/home'
import { useUser } from '@/store/modules/user'
import MakeCenter from '@/views/User/components/MakeCenter.vue'
import HotCard from '@/views/classList/component/HotCard.vue'
import TabList from '@/component/TabPaneList/index.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RPAGetUserIndexLiteAPI } from '@/api/user'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
const { userInfo } = storeToRefs(useUser())
const route = useRoute()
const router = useRouter()
/** 个人成就数据 */
const personList = ref<any>([])

const cardDataInfo = ref<any>({})
/** 获取卡片数据 */
const getCardData = async () => {
  const res = await getUserASllTypeNumAPI({ User: userInfo.value.loginId, CollectNum: true })
  const {
    ArticleCount,
    ByCollectCount,
    CollectNum,
    MonthByCollectCount,
    MonthByReplyCount,
    MonthPostCount,
    MonthReplyCount,
    PostCount,
    QuestionCount,
    RegisterTime,
    ReplyCount,
    City,
    Signature,
  } = res

  cardDataInfo.value = {
    ArticleCount,
    ByCollectCount,
    CollectNum,
    MonthByCollectCount,
    MonthByReplyCount,
    MonthPostCount,
    MonthReplyCount,
    PostCount,
    QuestionCount,
    RegisterTime,
    ReplyCount,
    City,
    Signature,
  }
  personList.value = [
    {
      title: '本月发布',
      value: MonthPostCount,
      icon: 'IconEdit',
      iconColor: '#2158E8',
    },
    {
      title: '本月被收藏',
      value: MonthByCollectCount,
      icon: 'IconStar',
      iconColor: '#2158E8',
    },
    {
      title: '本月被评论',
      value: MonthByReplyCount,
      icon: 'IconMessageOne',
      iconColor: '#2158E8',
    },
    {
      title: '本月评论',
      value: MonthReplyCount,
      icon: 'IconMessageOne',
      iconColor: '#2158E8',
    },
  ]
}
getCardData()

const activeName = ref('question')
/** 数据总页数 */
const pageTotal = ref(0)
const pageSize = ref(20)
/** 当前页 */
const currentPage = ref(1)
/** 父专栏 id */
const postsTypeId = ref('')
/** tab 切换 Type */
const tabType = ref<1 | 0>(0)
/** 是否显示分页 */
const showPagination = ref(true)
const parentInfo = ref<any>({})

/** 获取父专栏信息 */
const getFatherInfo = async () => {
  const { parentList } = await getArticleTypeListAPI()
  const findInteraction = parentList.find((item) => item.postsTypeName === '互动解答')
  const findKnow = parentList.find((item) => item.postsTypeName === '知识分享')
  parentInfo.value = { question: findInteraction, article: findKnow }
  if (findInteraction) {
    postsTypeId.value = findInteraction.postsTypeId
    getMyPostArticle()
  }
}
getFatherInfo()

const tabList = ref([
  {
    label: '提问',
    name: 'question',
    tableList: [],
  },
  {
    label: '文章',
    name: 'article',
    tableList: [],
  },
  {
    label: '收藏',
    name: 'collect',
    tableList: [],
  },
])

/** 获取我的发表 */
async function getMyPostArticle() {
  const params: any = {
    Type: tabType.value,
    User: userInfo.value.loginId,
    CollectNum: true,
    PageNum: currentPage.value - 1,
    PageSize: pageSize.value,
  }
  if (activeName.value !== 'collect') {
    params.PostsTypePID = postsTypeId.value
    // params.PageNum = currentPage.value - 1
    // params.PageSize = pageSize.value
  } else {
    // params.PageNum = currentPage.value - 1
    // params.PageSize = pageSize.value
    params.Order = 'Hot'
  }
  const { list, total }: any = await RPAGetUserIndexLiteAPI(params)
  pageTotal.value = total
  const findItem = tabList.value.find(({ name }) => name === activeName.value)
  if (!findItem) return
  findItem.tableList = list
}

const tabClick = async (name: string) => {
  activeName.value = name
  tabType.value = 0
  showPagination.value = true
  switch (name) {
    case 'question':
      const { postsTypeId: pid1 } = parentInfo.value.question
      postsTypeId.value = pid1
      break
    case 'article':
      const { postsTypeId: pid2 } = parentInfo.value.article
      postsTypeId.value = pid2
      break
    case 'collect':
      tabType.value = 1
      // showPagination.value = false
      break
    default:
      break
  }
  await getMyPostArticle()
}

/** 切换页面 */
const changePage = async (page: number) => {
  currentPage.value = page
  await getMyPostArticle()
}

const handleEditInfo = () => {
  router.push('/user-info')
}
</script>

<template>
  <div class="user-box">
    <div class="user-top">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="user-info-top">
        <div class="avatar dfc">
          <img :src="userInfo.avatar" />
        </div>
        <div class="username-desc-box djc">
          <div class="user-name">{{ userInfo.userName }}</div>
          <div class="info-box">来自{{ cardDataInfo.City }} | 社区菜鸟 | {{ cardDataInfo.RegisterTime }} 加入</div>
          <div class="desc">{{ cardDataInfo.Signature }}</div>
        </div>
        <K-button main @click="handleEditInfo">编辑资料</K-button>
      </div>
    </div>
    <div class="my-article-big-box">
      <div class="left-list-box">
        <TabList
          :active="activeName"
          :pageTotal="pageTotal"
          :pageSize="pageSize"
          :tabList="tabList"
          :showPagination="showPagination"
          @tabClick="tabClick"
          @changePage="changePage"
        />
      </div>
      <div class="right-aside-box djc">
        <MakeCenter :params="cardDataInfo" />
        <HotCard title="个人成就" :list="personList" :isClick="false" />
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
    max-width: 1200px;
    min-width: 960px;
    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 22px;
      overflow: hidden;
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
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
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
    max-width: 1200px;
    min-width: 960px;
    width: 100%;
    .left-list-box {
      flex: 1;
      min-height: calc(100vh - 270px);
      background-color: #fff;
      border-radius: 12px;
      padding: 16px 32px;
      overflow-x: hidden;
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
