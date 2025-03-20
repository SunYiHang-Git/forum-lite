<script setup lang="ts">
import { ref } from 'vue'

import TableDataShop from '../TableDataShop/index.vue'

const searchValue = ref<string>('')

/** 查询 */
const handleSearch = () => {
  //
  console.log('111--->')
}
</script>

<template>
  <div class="main-right">
    <div class="top">
      <div class="title">
        发现适应你的
        <span>应用或自动化方案</span>
      </div>
      <div class="search">
        <KInput v-model="searchValue" class="search-input" placeholder="搜索...">
          <template #suffix>
            <IconSearch @click="handleSearch" />
          </template>
        </KInput>
      </div>
    </div>
    <div class="table-box">
      <TableDataShop />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 34px;
  padding-top: 65px;
  padding-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, /* 完全透明 */ rgba(255, 255, 255, 1) 100% /* 完全不透明 */),
    url('@/assets/images/bg1.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 20%;
  font-family: Alibaba PuHuiTi 2;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 100px;
  .title {
    font-size: 26px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    color: #38363c;
    span {
      color: #0037db;
    }
  }
  .search {
    width: 100%;
    height: 40px;
    .search-input {
      height: 100%;
      :deep(.el-input__wrapper) {
        height: 100%;
        border-radius: 20px;
        padding-left: 25px;
      }
    }
  }
}
.table-box {
  flex: 1;
  min-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: var(--k-bg-1);
}
</style>
