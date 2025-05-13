<script setup lang="ts">
import avatarSvg from '@/assets/svg/default-avatar.svg'
import { useUser } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { getUserASllTypeNumAPI } from '@/api/home'
import { ref, watch } from 'vue'
import { getToken, MD5 } from '@ksware/micro-lib-web-temp'
import { handleNoLoginClick } from '@/utils/auth'
const { userInfo } = storeToRefs(useUser())
const router = useRouter()

const classTypeNumObj = ref<{
  ArticleCount: number
  QuestionCount: number
  ReplyCount: number
  CollectCount: number
}>({
  ArticleCount: 0,
  QuestionCount: 0,
  ReplyCount: 0,
  CollectCount: 0,
})

/** 获取用户的类别数据量 */
const getUserAllTypeData = async () => {
  const token = getToken()
  if (!token) return
  const loginId = userInfo.value.loginId
  const { ArticleCount, QuestionCount, ReplyCount, CollectCount } = await getUserASllTypeNumAPI({
    User: loginId,
    CollectNum: true,
  })
  classTypeNumObj.value = { ArticleCount, QuestionCount, ReplyCount, CollectCount }
}
getUserAllTypeData()
/** 发帖 */
const postArticle = async () => {
  await handleNoLoginClick()
  router.push('/article/add/' + MD5('add'))
}

/* 去我的**/
async function goUserPage() {
  await handleNoLoginClick()
  router.push('/user')
}
watch(
  () => userInfo.value,
  () => {
    if (userInfo.value.loginId) {
      getUserAllTypeData()
    } else {
      classTypeNumObj.value = { ArticleCount: 0, QuestionCount: 0, ReplyCount: 0, CollectCount: 0 }
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="user-card">
    <div class="user-box" style="cursor: pointer" @click="goUserPage">
      <div class="avatar">
        <img :src="userInfo.avatar" />
      </div>
      <div class="userInfo">
        <div class="name">{{ userInfo.userName || '你好' }}</div>
        <div class="desc" :title="userInfo.signature ? userInfo.signature : ''">
          {{ userInfo.signature ? userInfo.signature : '欢迎登录...' }}
        </div>
      </div>
      <div class="right-box"><IconRight /></div>
    </div>
    <div class="user-menu">
      <div class="menu-link">
        <div class="menu-title">提问</div>
        <div class="menu-num">{{ classTypeNumObj.QuestionCount }}</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">文章</div>
        <div class="menu-num">{{ classTypeNumObj.ArticleCount }}</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">回复</div>
        <div class="menu-num">{{ classTypeNumObj.ReplyCount }}</div>
      </div>
      <div class="menu-link">
        <div class="menu-title">收藏</div>
        <div class="menu-num">{{ classTypeNumObj.CollectCount }}</div>
      </div>
    </div>
    <k-button main style="width: 100%" @click="postArticle">发帖</k-button>
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
  background-color: #fff;
  .user-box {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
    width: 100%;
    overflow: hidden;
    &:hover {
      .userInfo {
        .name {
          color: var(--k-blue-500);
        }
      }
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userInfo {
      flex: 1;
      overflow: hidden;
      .name {
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0px;
        color: #171717;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #737373;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      font-size: 24px;
      cursor: pointer;
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
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
      }
      .menu-num {
        height: 26px;

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
