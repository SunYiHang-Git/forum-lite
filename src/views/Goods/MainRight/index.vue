<script setup lang="ts">
import TableDataShop, { type ITabDataList } from '../TableDataShop/index.vue'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
/** 搜索值 */
const searchValue = ref<string>('')
/** tab 切换名称 */
const activeNameTab = ref<string>('')

const mainBoxRef = useTemplateRef('mainBoxRef')

const tabPineChange = ref<{ item: ITabDataList | null; cb: Function }>({
  item: null,
  cb: (name: string, id: string, pageNumber: number = 1) => {},
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
  //
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('到底了--->', tabPineChange.value.item)
    const { page, pageNumber, id, tableData }: any = tabPineChange.value.item
    if (pageNumber === page) {
      console.log('没有数据离开--->')
      return
    }
    const object = await tabPineChange.value.cb(searchValue.value, id, pageNumber + 1)
    const { list } = object
    tableData.push(...list)
    tabPineChange.value.item!.pageNumber = object.pageNumber
    tabPineChange.value.item!.page = object.page
    tabPineChange.value.item!.total = object.total
  }
}

async function sendHandleSearch(item: ITabDataList, cb: any) {
  tabPineChange.value.item = item
  tabPineChange.value.cb = cb
  await nextTick()
  handleScroll({ target: mainBoxRef.value })
}
/** 查询 */
const handleSearch = async () => {
  const { page, pageNumber, id, tableData }: any = tabPineChange.value.item
  const object = await tabPineChange.value.cb(searchValue.value, tabPineChange.value.item?.id)
  const { list } = object
  tableData.length = 0
  await nextTick()
  tableData.push(...list)
  tabPineChange.value.item!.pageNumber = object.pageNumber
  tabPineChange.value.item!.page = object.page
  tabPineChange.value.item!.total = object.total
}

onMounted(async () => {
  //
})
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
      <TableDataShop :searchValue="searchValue" :activeNameTab="activeNameTab" @sendHandleSearch="sendHandleSearch" />
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
