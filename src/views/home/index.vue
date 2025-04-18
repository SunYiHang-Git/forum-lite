<script setup lang="ts">
import Footer from '@/views/home/Footer/index.vue'
import { ref } from 'vue'
import Banner from '@/views/home/component/Banner.vue'
import UserCard from '@/views/home/component/UserCard.vue'
import NavCard from '@/views/home/component/NavCard.vue'
import OfficialAnnouncement from '@/views/home/component/OfficialAnnouncement.vue'
import InteractionAnswer from '@/views/home/component/InteractionAnswer.vue'
import KnowledgeShare from '@/views/home/component/KnowledgeShare.vue'
import { getArticleTypeListAPI, getHomeAllDataAPI } from '@/api/home'
const searchValue = ref<string>('')
/** 官方公告 */
const noticeListData = ref<any[]>([])
/** 回帖周榜 */
const replyListData = ref<any[]>([])
/** 获取官方公告 */
const getNoticeList = async () => {
  const { noticeList, replyList } = await getHomeAllDataAPI()
  noticeListData.value = noticeList
  replyListData.value = replyList
}
/** 首页分类 nav */
const homeNavClassList = ref<any[]>([])

/** 互动解答 Id */
const interactionId = ref('')
/** 知识分享 */
const knowledgeId = ref('')
/** 获取首页分类 */
const getHomeClassList = async () => {
  const { parentList } = await getArticleTypeListAPI()
  homeNavClassList.value = parentList
  const findInteraction = homeNavClassList.value.find((item) => item.postsTypeName === '互动解答')
  const findKnow = homeNavClassList.value.find((item) => item.postsTypeName === '知识分享')
  interactionId.value = findInteraction.postsTypeId
  knowledgeId.value = findKnow.postsTypeId
}
getNoticeList()
getHomeClassList()
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
            <UserCard :list="homeNavClassList" />
          </div>
        </div>
        <div class="nav-box">
          <NavCard v-if="homeNavClassList.length > 0" :list="homeNavClassList" />
        </div>
        <div class="official-announcement">
          <OfficialAnnouncement :noticeList="noticeListData" :replyList="replyListData" />
        </div>
        <div class="interaction">
          <InteractionAnswer v-if="interactionId" :moreId="interactionId" />
        </div>
        <div class="knowledge-share">
          <KnowledgeShare v-if="knowledgeId" :moreId="knowledgeId" />
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
          background-color: pink;
        }
        .userInfo-box {
          top: 0px;
          width: 400px;
          height: 232px;
          border-radius: 12px;
          opacity: 1;
          background-color: #f3ecec;
        }
      }
      .nav-box {
        width: 100%;
        height: 96px;
      }
      .official-announcement {
        width: 100%;
      }
      .header-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        .title {
          font-family: Alibaba PuHuiTi 3;
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
        height: 426px;
      }
    }
  }
}
</style>
