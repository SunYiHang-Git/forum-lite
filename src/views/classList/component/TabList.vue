<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import PageList from './PageList.vue'
import { getClassByIdAPI, getInteractionListAPI } from '@/api/home'

const props = defineProps<{ pid: string; searchVale: string }>()

const activeName = ref('all')

const isFine = ref<'1' | ''>('')

/** 页面分配 */
const pageClassList = ref<any[]>([])

/** 当前页 */
const currentPage = ref(1)
/** 页面数据尺寸 */
const pageSize = ref(20)
/** 总共页数 */
const pageTotal = ref(0)
/** 数据 */
const tableDataList = ref<any[]>([])
/** 子类id */
const sonClassId = ref('')
/** 搜索值 */
const searchVale = computed(() => props.searchVale)

/** 获取互动解答,知识分享数据接口 */
const getInteractionListData = async () => {
  const params = {
    PageNum: currentPage.value - 1,
    PageSize: pageSize.value,
    PostsTypePID: props.pid,
    PostsType: sonClassId.value,
    CollectNum: true,
    isFine: isFine.value,
    Title: searchVale.value,
    Order: 'LastTime',
  }
  const { list, total } = await getInteractionListAPI(params)
  tableDataList.value = list
  pageTotal.value = total
}
watch(
  () => searchVale.value,
  () => {
    getInteractionListData()
  },
)

/** 获取 tablist 数据 */
const gatTabList = async () => {
  pageClassList.value = []
  pageClassList.value = await getClassByIdAPI({ id: props.pid })
  const one = { postsTypeName: '全部', postsTypeId: 'all', postsTypeDesc: '全部数据' }
  pageClassList.value.unshift(one)
  await getInteractionListData()
}
onMounted(() => {
  gatTabList()
})

const activeBtnValue = ref('onFine')
const filterChangeBtn = (name: string) => {
  if (name === 'isFine') {
    isFine.value = '1'
  } else {
    isFine.value = ''
  }
  activeBtnValue.value = name
  getInteractionListData()
}

function handleClick(tabName: any) {
  if (tabName === 'all') {
    sonClassId.value = ''
  } else {
    sonClassId.value = tabName
  }
  currentPage.value = 1
  getInteractionListData()
}

/** 切换分页 */
const handleCurrentChange = () => {
  getInteractionListData()
}
</script>

<template>
  <div class="tab-list">
    <k-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <k-tab-pane
        v-for="(item, index) in pageClassList"
        :key="index"
        :label="item.postsTypeName"
        :name="item.postsTypeId"
      >
        <div class="tab-div-content">
          <div class="nav-btns">
            <div class="btn" @click="filterChangeBtn('onFine')" :class="activeBtnValue === 'onFine' ? 'active' : ''">
              综合
            </div>
            <div class="btn" @click="filterChangeBtn('isFine')" :class="activeBtnValue === 'isFine' ? 'active' : ''">
              精华
            </div>
          </div>

          <PageList :tableData="tableDataList" />
        </div>
      </k-tab-pane>
    </k-tabs>
    <div class="page-footer">
      <k-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total,->, prev, pager, next, jumper"
        :total="pageTotal"
        :pager-count="5"
        background
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  .demo-tabs {
    position: relative;
  }
  .select-btn {
    position: absolute;
    display: flex;
    right: 0px;
    top: 3px;
    height: 40px;
    width: 140px;
    box-sizing: border-box;
    padding: 0 15px;
    z-index: 999;
    .k-slider-button {
      height: 32px;
      font-size: 12px;
      &::before {
        height: unset;
        height: 24px;
      }
      :deep(.k-slider-button-pane) {
        height: 100%;
      }
    }
  }
  .tab-div-content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 0;
    min-height: calc(100vh - 400px);
    .nav-btns {
      display: flex;
      justify-content: start;
      gap: 8px;
      padding-top: 1px;
      box-sizing: border-box;
      margin: 8px 0 8px 0;
      .btn {
        width: 52px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #f5f5f5;
        font-size: 14px;
        font-weight: normal;
        color: #404040;
        border-radius: 4px;
      }
      .btn.active {
        color: #0a4aeb;
        background-color: #d7eaff;
      }
    }
  }
  .page-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 72px;
    padding: 0 15px;
    .k-pagination {
      width: 100%;
    }
  }
}
</style>
