<script setup lang="ts">
import TableDataShop from '../TableDataShop/index.vue'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { tableDataList, type IData } from '../data'

const topTitleList = [
  {
    label: '全部',
    name: 'all',
  },
  {
    label: '金融',
    name: 'banking',
  },
  {
    label: '信贷',
    name: 'credit',
  },
  {
    label: '生活',
    name: 'life',
  },
  {
    label: '电商',
    name: 'retailers',
  },
  {
    label: '财务',
    name: 'finance',
  },
]

const searchValue = ref<string>('')

const searchRef = useTemplateRef('searchRef')
/** 数据 */
const tableData = ref<IData[]>([])

/** 处理滚动事件 */
const handleScroll = () => {
  console.log('111--->')
  if (!searchRef.value) return
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  console.log('scrollTop--->', scrollTop)
  console.log('searchRef.value--->', searchRef.value)
  const offsetTop = searchRef.value?.top + scrollTop
  console.log('offsetTop--->', offsetTop)
}

/** 获取数据 */
const getTableData = async () => {
  tableData.value = await Promise.resolve(tableDataList)
}

onMounted(() => {
  console.log('window--->', window)
  window.addEventListener('scroll', handleScroll)
  getTableData()
})

onUnmounted(() => {
  // 清除滚动事件监听器
  window.removeEventListener('scroll', handleScroll)
})

/** 查询 */
const handleSearch = () => {
  //
  console.log('111--->', searchValue.value)
}
</script>

<template>
  <div class="main-right">
    <div class="title">
      发现适应你的
      <span>应用或自动化方案</span>
    </div>
    <div class="search" ref="searchRef">
      <KInput v-model="searchValue" class="search-input" placeholder="搜索..." @keydown.enter="handleSearch">
        <template #suffix>
          <IconSearch @click="handleSearch" />
        </template>
      </KInput>
    </div>
    <div class="table-box">
      <TableDataShop :table-data="tableData" :top-title-list="topTitleList" />
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
  padding-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  background-image:
    linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, /* 完全透明 */ rgba(255, 255, 255, 1) 60% /* 完全不透明 */),
    url('@/assets/images/bg1.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 20%;
  font-family: Alibaba PuHuiTi 2;
}
.title {
  font-size: 26px;
  font-weight: bold;
  height: 36px;
  letter-spacing: 0em;
  color: #38363c;
  overflow: hidden;
  span {
    color: #0037db;
  }
}
.search {
  display: flex;
  justify-content: center;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px; /* 当滚动到顶部时固定 */
  z-index: 1000; /* 确保它在其他内容之上 */
  margin-top: 20px;
  width: 100%;
  height: 60px;
  .search-input {
    height: 70%;
    width: 600px;
    .k-input {
      width: 300px;
    }
    :deep(.el-input__wrapper) {
      height: 100%;
      border-radius: 20px;
      padding-left: 25px;
    }
  }
}
.table-box {
  min-height: 200px;
  min-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: var(--k-bg-1);
}
</style>
