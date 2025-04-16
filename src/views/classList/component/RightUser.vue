<script setup lang="ts">
import UserCard from '@/views/home/component/UserCard.vue'
import Banner from '@/views/home/component/Banner.vue'
</script>

<template>
  <div class="right-user">
    <div class="user-box">
      <UserCard />
    </div>
    <div class="banner-box">
      <Banner :height="140" />
    </div>
    <div class="now-box">
      <div class="header-title">最新公告</div>
      <div class="card-list-box">
        <div v-for="i in 5" :key="i" class="lis-name">系统即将于今日系统即将于今日(20222024777）发布..</div>
      </div>
    </div>
    <div class="hot-box">
      <div class="header-title">热门</div>
      <div class="card-list-box">
        <div v-for="i in 5" :key="i" class="lis-name-box">
          <div class="icon">
            <IconRPAProgrammingShowMessageDialogColor />
          </div>
          <div class="lis-name">系统即将于今日系统即将于今日系统即将于今日系统即将于今日(20222024777）发布..</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-user {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 16px;
  width: 100%;
  .user-box {
    width: 100%;
    min-height: 172px;
    border-radius: 12px;
    background-color: #fff;
  }
  .banner-box {
    width: 100%;
    height: 140px;
    border-radius: 10px;
    background-color: pink;
    overflow: hidden;
  }
  .now-box,
  .hot-box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-height: 100px;
    border-radius: 12px;
    padding: 24px 32px;
    background-color: #fff;
    .header-title {
      height: 28px;
      font-family: Alibaba PuHuiTi 3;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: #000000;
    }
    .card-list-box {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 16px;
      width: 100%;
      height: fit-content;
      .lis-name {
        height: 24px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: Alibaba PuHuiTi 3;
        font-size: 16px;
        font-weight: normal;
        color: #171717;
      }
      .lis-name-box {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 5px;
        height: 24px;
        width: 100%;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
