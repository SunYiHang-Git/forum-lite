<script setup lang="ts">
import { callServerFunc, isInset, SQLTable } from '@ksware/micro-lib-web-temp'
import TableDataShop, { type ITabDataList } from '../TableDataShop/index.vue'
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import type { IClassify, IGoodDataType, ITagType } from '@/types/goods'
import { getAppListAPI, getClassifyListAPI, hexStrToShowBase64 } from '@/views/ApplicationManage/components/data'
import TabPane from '../TableDataShop/components/TabPane.vue'
import RPAImg from '@/assets/images/RPA.png'
import { getWindowUrlObj } from '@/utils/postMessage'
import { useRouter } from 'vue-router'
const router = useRouter()
interface ISearchDataType {
  /** 数据 */
  tableData: IGoodDataType[]
  /** 页码尺寸 */
  pageSize?: number
  /** 当前页码 */
  pageNumber: number
  /** 总页码 */
  page: number
  /** 总页数 */
  total: number
}
/** 搜索值 */
const searchValue = ref<string>('')
const mainBoxRef = useTemplateRef('mainBoxRef')

/** 底部加载文字 */
const bottomLoadingText = ref<string>('加载中...')
/** 搜索数据 */
const searchTableData = ref<ISearchDataType>({
  tableData: [],
  pageSize: 100,
  pageNumber: 0,
  page: 0,
  total: 0,
})
/** 是否搜索 */
const isSearch = ref<boolean>(false)
/** tabID */
const tabId = ref<string>('all')
/** 页码尺寸 */
const pageSizeNum = ref(20)
const allOption = ref<ITabDataList>({
  id: 'all',
  label: '全部',
  name: 'all',
  tableData: [],
  pageSize: pageSizeNum.value,
  pageNumber: 0,
  page: 1,
  total: 0,
})
/** tab 切换列表 */
const tabDataList = ref<ITabDataList[]>([])
/** 标签列表 */
/** 获取分类数据 */
const getClassifyData = async () => {
  const rows = await getClassifyListAPI<IClassify>()
  const arr = rows.map((item) => {
    return {
      id: item.id ?? '',
      label: item.name ?? '',
      name: item.id ?? '',
      tableData: [] as IGoodDataType[],
      pageSize: pageSizeNum.value,
      pageNumber: 0,
      page: 1,
      total: 0,
    }
  })
  arr.unshift(allOption.value as any)
  tabDataList.value = arr
}

/**
 * 获取应用数据
 *
 * @param name 查询名称
 * @param id 类别名称
 * @param pageNum 当前页码
 * @param pageSize 页面尺寸
 * @param IsLimit 是否分页
 */
const getAppList = async ({
  id = 'all',
  name = '',
  pageNum = 1,
  pageSize = pageSizeNum.value,
  IsLimit = true,
}: {
  id?: string
  name?: string
  pageNum?: number
  pageSize?: number
  IsLimit?: boolean
}) => {
  const { list, pageNumber, page, total } = await getAppListAPI({
    id,
    name,
    pageNum,
    pageSize,
    IsLimit,
    isAudit: true,
    IsOnLine: true,
  })
  handleTabListById(list, pageNumber, page, total, id)
}
/**
 * 处理加载数据放在哪个 tab下
 *
 * @param list 数组
 * @param pageNumber 页码
 * @param page 总页数
 * @param total 总条数
 * @param id
 */
function handleTabListById(list: any[], pageNumber: number, page: number, total: number, id: string) {
  const findItem = tabDataList.value.find((item) => item.id === id)
  if (!findItem) return
  if (page <= pageNumber) {
    bottomLoadingText.value = '到底了~'
  }
  if (pageNumber === findItem.pageNumber) return
  findItem.page = page
  findItem.pageNumber = pageNumber
  findItem.total = total
  findItem.tableData.push(...list)
}

/** 子传父事件,传递id, all 是全部 */
const sendTabId = async (id: string) => {
  tabId.value = id
  loadDataById()
}

/** 加载数据 */
const loadDataById = async () => {
  const findItem = tabDataList.value.find((item) => item.id === tabId.value)
  if (!findItem) return
  bottomLoadingText.value = '加载中...'
  if (isSearch.value) {
    const { page, pageNumber } = searchTableData.value
    if (page <= pageNumber) {
      bottomLoadingText.value = '到底了~'
      return
    }
    getSearchTableAppList(searchValue.value, pageNumber + 1, 100)
  } else if (findItem) {
    const { page, pageNumber } = findItem
    if (page <= pageNumber) {
      bottomLoadingText.value = '到底了~'
      return
    }
    getAppList({ id: tabId.value, pageNum: pageNumber + 1 })
  }
}
/** 初始化数据 */
async function initWindow() {
  const { token } = getWindowUrlObj()
  if (isInset && !token) {
    router.push('/login')
    return
  }
  await getClassifyData()
  loadDataById()
}

onMounted(async () => {
  await initWindow()
})

const isShowStickyInput = ref(false)

/** 处理滚动事件 */
const handleScroll = async (data: any) => {
  if (!mainBoxRef.value) return
  const { scrollTop, clientHeight, scrollHeight } = data.target
  if (scrollTop < 190 && isShowStickyInput.value === true) {
    isShowStickyInput.value = false
  } else if (scrollTop > 200 && isShowStickyInput.value === false) {
    isShowStickyInput.value = true
  }
}
/** 查询数据请求接口 */
async function getSearchTableAppList(name: string, pageNum: number, pageSize: number) {
  const res = await getAppListAPI({ name, pageNum, pageSize })
  const { list, page, pageNumber, total } = res
  searchTableData.value.page = page
  searchTableData.value.pageNumber = pageNumber
  searchTableData.value.total = total
  searchTableData.value.tableData.push(...list)
}

/** 查询 */
const handleSearch = async () => {
  if (searchValue.value === '') {
    isSearch.value = false
  } else {
    isSearch.value = true
    tabId.value = 'all'
    searchTableData.value.tableData = []
    getSearchTableAppList(searchValue.value, 1, 100)
  }
}
</script>

<template>
  <div
    ref="mainBoxRef"
    class="main-right"
    @scroll="handleScroll"
    v-infinite-scroll="loadDataById"
    :infinite-scroll-delay="300"
    :infinite-scroll-distance="0"
  >
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
          <k-image style="width: 100%; height: 100%" :src="RPAImg" fit="fill" />
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
      <TableDataShop v-if="!isSearch" :tabDataList="tabDataList" @sendTabId="sendTabId" />
      <TabPane v-if="isSearch" :tableData="searchTableData.tableData" />
    </div>
    <div ref="loadingRef" class="load">
      <IconLoading v-if="bottomLoadingText === '加载中...'" />
      {{ bottomLoadingText }}
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
  // height: 100vh;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 1200px;
  width: 100%;
  height: calc(100% - 136px);
  box-sizing: border-box;
  // margin-top: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: var(--k-bg-1);
  .scroll-box {
    width: 100%;
    height: 100%;
  }
}
.load {
  margin-top: 20px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
