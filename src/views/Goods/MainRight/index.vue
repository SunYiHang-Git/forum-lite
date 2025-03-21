<script setup lang="ts">
import TableDataShop from '../TableDataShop/index.vue'
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
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

const activeNameTab = ref<string>('')

const mainBoxRef = useTemplateRef('mainBoxRef')

const isShowStickyInput = ref(false)

/** 数据 */
const tableData = ref<IData[]>([])

/** 处理滚动事件 */
const handleScroll = (data: any) => {
  if (!mainBoxRef.value) return
  const { scrollTop, clientHeight, scrollHeight } = data.target
  if (scrollTop < 190 && isShowStickyInput.value === true) {
    isShowStickyInput.value = false
  } else if (scrollTop > 200 && isShowStickyInput.value === false) {
    isShowStickyInput.value = true
  }
  //
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('到底了--->')
  }
}

const pageNum = ref<number>(1)

/** 获取数据 */
const getTableData = async (value: string = '') => {
  tableData.value = await Promise.resolve(tableDataList)
}

onMounted(async () => {
  getTableData()
})

/** 查询 */
const handleSearch = async () => {
  activeNameTab.value = ''
  await nextTick()
  activeNameTab.value = 'all'
  console.log('searchValue--->', searchValue.value)
  // getTableData(searchValue.value)
}
</script>

<template>
  <div ref="mainBoxRef" class="main-right" @scroll="handleScroll">
    <div class="top-box">
      <div class="title">
        发现适应你的
        <span>应用或自动化方案</span>
      </div>
      <div class="search">
        <KInput v-model="searchValue" class="search-input" placeholder="搜索..." @keydown.enter="handleSearch">
          <template #suffix>
            <IconSearch @click="handleSearch" />
          </template>
        </KInput>
      </div>
    </div>
    <div v-show="isShowStickyInput" class="sticky-input-box">
      <div class="logo-box">
        <div class="logo">
          <k-image style="width: 100%; height: 100%" src="/images/RPA.png" fit="fill" />
        </div>
        <div class="logo-title">RPA 市场</div>
      </div>
      <div class="search-input-box">
        <k-input
          v-model="searchValue"
          @keydown.enter="handleSearch"
          prefix-icon="IconSearch"
          placeholder="搜索"
        ></k-input>
      </div>
    </div>
    <div class="table-box">
      <TableDataShop :table-data="tableData" :top-title-list="topTitleList" :activeNameTab="activeNameTab" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-right {
  padding-bottom: 10px;
  padding-top: 64px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-image:
    linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, /* 完全透明 */ rgba(255, 255, 255, 1) 80% /* 完全不透明 */),
    url('@/assets/images/bg1.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 30%;
  font-family: Alibaba PuHuiTi 2;
  .top-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 136px;
    .title {
      font-size: 26px;
      font-weight: bold;
      height: 36px;
      line-height: 36px;
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
      width: 100%;
      height: 40px;
      .search-input {
        height: 100%;
        width: 600px;
        :deep(.el-input__wrapper) {
          height: 100%;
          border-radius: 20px;
          padding-left: 25px;
        }
      }
    }
  }
}
.sticky-input-box {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 50px;
  position: fixed;
  top: 0; /* 固定在浏览器窗口的顶部 */
  z-index: 2000; /* 确保它在其他内容之上 */
  width: 100%; /* 根据需要调整宽度 */
  height: 64px;
  background-color: var(--k-bg-1);
  border-bottom: 1px solid var(--k-border-color);
  .logo-box {
    display: flex;
    justify-content: start;
    gap: 15px;
    align-items: center;
    .logo {
      width: 32px;
      height: 32px;
      overflow: hidden;
    }
    .logo-title {
      font-family: Alibaba PuHuiTi 3;
      font-size: 18px;
      font-weight: bold;
      color: var(--k-text-color);
    }
  }
  .search-input-box {
    height: 35px;
    width: 500px;
    display: flex;
    align-items: center;
    .k-input {
      :deep(.el-input__wrapper) {
        height: 100%;
        border-radius: 20px;
        padding-left: 15px;
      }
    }
  }
}
.table-box {
  height: calc(100vh - 210px);
  min-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: var(--k-bg-1);
}
</style>
