<script setup lang="ts">
import { NavCardList } from '@/const/home'
import { useUser } from '@/store/modules/user'
import { MD5 } from '@ksware/micro-lib-web-temp'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { isAdminByUser } = useUser()

const { activeCardName } = defineProps<{
  activeCardName: string
}>()

const emits = defineEmits<{
  (e: 'searchPostList', value: string): void
}>()

/** 搜索值 */
const searchVale = ref('')

const handleChange = () => {
  emits('searchPostList', searchVale.value)
}
const clearValue = () => {
  emits('searchPostList', '')
}

const handlePostArticle = () => {
  const findItem = NavCardList.find((item) => item.name === activeCardName)
  if (!findItem) return
  router.push('/article/add/' + MD5('add') + `?type=${findItem.label}`)
}

/** 是否显示 */
const isShowPost = ref(true)

/** 是否有管理员权限 */
function initData() {
  const isAdmin = isAdminByUser()
  if (isAdmin) {
    isShowPost.value = true
  } else if (activeCardName === 'notice') {
    isShowPost.value = false
  }
}
initData()
</script>

<template>
  <div class="nav-class">
    <div class="left-name dfc">
      <template v-for="(item, index) in NavCardList" :key="index">
        <div class="icon dfc" v-if="item.name === activeCardName">
          <img :src="item.imgSvg" />
        </div>
        <div v-if="item.name === activeCardName" class="name-box">
          <div class="name">{{ item.label }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </template>
    </div>
    <div class="right-btn dfc">
      <div class="search-box">
        <k-input
          v-model="searchVale"
          @keyup.enter="handleChange"
          @clear="clearValue"
          placeholder="搜索..."
          suffix-icon="IconSearch"
          style="width: 160px"
          clearable
        ></k-input>
      </div>
      <k-button v-if="isShowPost" main @click="handlePostArticle">我要发帖</k-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px 32px;
  gap: 24px;
  background-color: #fff;
  border-radius: 12px;
  .left-name {
    flex: 1;
    justify-content: start;
    gap: 22px;
    .icon {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name-box {
      flex: 1;
      .name {
        font-size: 24px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 0px;
        color: #3d3d3d;
      }
      .desc {
        width: 80%;
        margin-top: 8px;

        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #3d3d3d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .right-btn {
    justify-content: start;
    gap: 8px;
    width: fit-content;
  }
}
</style>
