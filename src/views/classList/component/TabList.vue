<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import PageList from './PageList.vue'
import { getInteractionListAPI } from '@/api/home'

const props = defineProps<{ params: any[] }>()

const activeName = ref('all')

const filterBtnList = [
  {
    label: '综合',
    name: 'onFine',
  },
  {
    label: '精品',
    name: 'isFine',
  },
]
const isFine = ref(0)

/** 当前页 */
const currentPage = ref(1)
/** 总共页数 */
const pageTotal = ref(0)
/** 数据 */
const tableDataList = ref<any[]>([])
/** 子类id */
const sonClassId = ref('')

/** 获取互动解答数据 */
const getInteractionListData = async () => {
  if (props.params.length === 0) {
    return
  }
  const pid = props.params[0].pid
  const params = {
    PageNum: currentPage.value + '',
    PageSize: '20',
    PostsTypePID: pid,
    PostsType: sonClassId.value,
    CollectNum: true,
    isFine: isFine.value === 1 ? '1' : '0',
  }
  const { list, total } = await getInteractionListAPI(params)
  tableDataList.value = list
  console.log('tableDataList.value--->', tableDataList.value)
  pageTotal.value = total
}

const filterChangeBtn = (name: string) => {
  if (name === 'isFine') {
    isFine.value = 1
  } else {
    isFine.value = 0
  }
  getInteractionListData()
}

function handleClick(tabName: string) {
  if (tabName === 'all') {
    sonClassId.value = ''
  } else {
    sonClassId.value = tabName
  }
  getInteractionListData()
}

/** 切换分页 */
const handleCurrentChange = () => {
  getInteractionListData()
}
watch(
  () => props.params.length,
  () => {
    sonClassId.value = ''
    getInteractionListData()
  },
)
</script>

<template>
  <div class="tab-list">
    <k-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <div class="select-btn">
        <k-slider-button @change="filterChangeBtn" :items="filterBtnList" active="onFine"></k-slider-button>
      </div>
      <k-tab-pane v-for="(item, index) in params" :key="index" :label="item.postsTypeName" :name="item.postsTypeId">
        <div class="tab-div-content">
          <PageList :tableData="tableDataList" />
        </div>
      </k-tab-pane>
    </k-tabs>
    <div class="page-footer">
      <k-pagination
        v-model:current-page="currentPage"
        :page-size="20"
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
  padding: 0 32px;
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
    min-height: calc(100vh - 400px);
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
