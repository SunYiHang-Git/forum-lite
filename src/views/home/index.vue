<script setup lang="ts">
import Footer from './Footer/index.vue'
import { ref } from 'vue'
import Banner from './component/Banner.vue'
import UserCard from './component/UserCard.vue'
import NavCard from './component/NavCard.vue'
import OfficialAnnouncement from './component/OfficialAnnouncement.vue'
import InteractionAnswer from './component/InteractionAnswer.vue'
import KnowledgeShare from './component/KnowledgeShare.vue'
const searchValue = ref<string>('')
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
            <UserCard />
          </div>
        </div>
        <div class="nav-box">
          <NavCard />
        </div>
        <div class="official-announcement">
          <OfficialAnnouncement />
        </div>
        <div class="interaction">
          <InteractionAnswer />
        </div>
        <div class="knowledge-share">
          <KnowledgeShare />
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
