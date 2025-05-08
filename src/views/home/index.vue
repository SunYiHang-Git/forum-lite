<script setup lang="ts">
import Footer from '@/views/home/Footer/index.vue'
import { onMounted, ref } from 'vue'
import Banner from '@/views/home/component/Banner.vue'
import UserCard from '@/views/home/component/UserCard.vue'
import NavCard from '@/views/home/component/NavCard.vue'
import OfficialAnnouncement from '@/views/home/component/OfficialAnnouncement.vue'
import InteractionAnswer from '@/views/home/component/InteractionAnswer.vue'
import KnowledgeShare from '@/views/home/component/KnowledgeShare.vue'
import { getHomeAllDataAPI, getRPAUserAPI, getThirdTypeDataAPI } from '@/api/home'
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/modules/user'
const { userInfo } = storeToRefs(useUser())
async function makeTokenLogin() {
  const { loginId } = userInfo.value
  if (loginId) return
  await getRPAUserAPI()
}
makeTokenLogin()
/** 回帖周榜 */
const replyListData = ref<any[]>([])
/** 获取官方公告和回帖周榜 */
const getNoticeList = async () => {
  const { replyList } = await getHomeAllDataAPI()
  replyListData.value = replyList.slice(0, 5)
}

onMounted(() => {
  getNoticeList()
})

/** 热门互动数据 */
const hotInteractionDataList = ref<any[]>([])
/** 最新互动数据 */
const newInteractionDataList = ref<any[]>([])
/** 热门知识分享数据 */
const hotKnowDataList = ref<any[]>([])
/** 最新知识分享数据 */
const newKnowDataList = ref<any[]>([])
/** 官方公告 */
const noticeNewList = ref<any[]>([])
const isFetchHome = ref(false)
const getDataList = async () => {
  const { interHotList, interNewList, knowHotList, knowNewList, noteDataList } = await getThirdTypeDataAPI()
  hotInteractionDataList.value = interHotList
  newInteractionDataList.value = interNewList
  hotKnowDataList.value = knowHotList
  newKnowDataList.value = knowNewList
  noticeNewList.value = noteDataList
  isFetchHome.value = true
}
getDataList()
</script>

<template>
  <div class="home-box">
    <div class="center-box">
      <div class="main">
        <div class="header">
          <div class="carousel-box">
            <Banner />
          </div>
          <div class="userInfo-box">
            <!-- <UserCard /> -->
          </div>
        </div>
        <div class="nav-box">
          <!-- <NavCard /> -->
        </div>
        <div class="official-announcement">
          <OfficialAnnouncement :isFetchData="isFetchHome" :noticeList="noticeNewList" :replyList="replyListData" />
        </div>
        <div class="interaction">
          <InteractionAnswer
            :isFetchData="isFetchHome"
            :hotDataList="hotInteractionDataList"
            :newDataList="newInteractionDataList"
          />
        </div>
        <div class="knowledge-share">
          <KnowledgeShare :isFetchData="isFetchHome" :hotDataList="hotKnowDataList" :newDataList="newKnowDataList" />
        </div>
      </div>
      <div class="footer">
        <div class="footer-content">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center-box {
    max-width: 1200px;
    width: 100%;
    .main {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 24px;
      width: 100%;
      padding-top: 40px;
      margin-bottom: 80px;
      box-sizing: border-box;
      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 16px;
        .carousel-box {
          flex: 1;
          min-width: 600px;
          width: 100%;
          height: 232px;
          border-radius: 12px;
          overflow: hidden;
        }
        .userInfo-box {
          top: 0px;
          width: 400px;
          height: 232px;
          border-radius: 12px;
          opacity: 1;
        }
      }
      .nav-box {
        width: 100%;
        height: 96px;
        border-radius: 10px;
      }
      .official-announcement {
        width: 100%;
        border-radius: 12px;
      }
      .header-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        .title {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          letter-spacing: 0px;
          color: #38363c;
        }
        .more {
          font-size: 14px;
          font-weight: normal;
        }
      }
      // 互动解答
      .interaction {
        width: 100%;
        height: 568px;
      }
      // 知识分享
      .knowledge-share {
        width: 100%;
      }
    }
    .footer {
      position: relative;
      width: 100%;
      height: 426px;
      .footer-content {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        min-width: 1280px;
        height: 426px;
      }
    }
  }
}
</style>
