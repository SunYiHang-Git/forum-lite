<script setup lang="ts">
import avatarSvg from '@/assets/svg/default-avatar.svg'
import { useUser } from '@/store/modules/user'
const { userInfo } = useUser()
</script>

<template>
  <div class="user-card">
    <div class="user-box">
      <div class="avatar">
        <img :src="avatarSvg" />
      </div>
      <div class="userInfo">
        <div class="name">{{ userInfo.userName || '你好' }}</div>
        <div class="desc">欢迎登录...</div>
      </div>
      <div class="right-box dfc"><IconRight /></div>
    </div>
    <div class="user-menu">
      <div class="menu-link">
        <div class="menu-title">提问</div>
        <div class="menu-num">0</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">文章</div>
        <div class="menu-num">0</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">回复</div>
        <div class="menu-num">0</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">收藏</div>
        <div class="menu-num">0</div>
      </div>
    </div>
    <k-button main style="width: 100%">发帖</k-button>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  width: 400px;
  height: 232px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 32px;
  box-sizing: border-box;
  gap: 24px;
  .user-box {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
    .avatar {
      width: 48px;
      height: 48px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userInfo {
      flex: 1;
      .name {
        font-family: Alibaba PuHuiTi 3;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0px;
        color: #171717;
      }
      .desc {
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #737373;
      }
    }
    .right-box {
      width: 16px;
      height: 16px;
      font-size: 24px;
    }
  }
  .user-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0;
    width: 100%;
    height: 56px;
    .menu-link {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      .menu-title {
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
      }
      .menu-num {
        height: 26px;
        font-family: Alibaba PuHuiTi 3;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 0px;
        color: #3d3d3d;
      }
    }
  }
}
</style>
