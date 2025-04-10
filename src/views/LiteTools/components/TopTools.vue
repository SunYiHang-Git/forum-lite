<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchValue = ref<string>('')

const goHome = () => {
  router.push('/lite')
}

const searchData = () => {
  router.push({
    path: '/lite',
    query: {
      searchValue: searchValue.value,
    },
  })
}

watch(
  () => route.name,
  (name) => {
    console.log('name--->', name)
    if (name !== 'lite-detail') return
    searchValue.value = ''
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="top">
    <div class="top-tools">
      <div class="left">
        <div class="logo">
          <img src="@/assets/images/K-RPA-logo.png" alt="" srcset="" />
        </div>
        <p>K-RPA Lite.Tools</p>
      </div>
      <div class="right">
        <div class="tag" @click="goHome">主页</div>
        <div class="tag">论坛</div>
        <div class="tag">文档</div>
        <div class="tag">指令集</div>
        <div class="people">
          <div class="user flex-c">M</div>
          <div class="more flex-c">
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="search-box">
      <div class="input-box">
        <el-input
          v-model="searchValue"
          @keydown.enter="searchData"
          style="width: 100%; height: 100%"
          placeholder="请输入"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="submit" @click="searchData">搜索</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 156px;
  overflow: hidden;
}
.search-box {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1032px;
  height: 64px;
  padding: 12px 24px;
  .input-box {
    flex: 1;
    width: 100%;
    height: 40px;
    border-radius: 8px 0px 0px 8px;
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: #cdcacf;
    box-sizing: border-box;
    overflow: hidden;
    ::v-deep(.el-input__wrapper) {
      border: none !important;
      box-shadow: none !important;
    }
  }
  .submit {
    width: 90px;
    height: 40px;
    font-size: 16px;
    font-weight: normal;
    color: #ffffff;
    border-radius: 0px 8px 8px 0px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background: #2882ff;
  }
}
.top-tools {
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  width: 1440px;
  height: 92px;
  font-family: Alibaba PuHuiTi 3;
  overflow: hidden;
  .flex-c {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  background-color: #fff;
  .left {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
    .logo {
      width: 37px;
      height: 32px;
      background-color: #fff;
    }
    p {
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      line-height: normal;
      letter-spacing: 0em;
    }
  }
  .right {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 32px;
    .tag {
      font-size: 16px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0em;
      color: #3d3d3d;
      cursor: pointer;
    }
    .people {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 5px;
    }
    .user {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: normal;
      overflow: hidden;
      background-color: #c9ebff;
      cursor: pointer;
    }
    .more {
      width: 24px;
      height: 24px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
