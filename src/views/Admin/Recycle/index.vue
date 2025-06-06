<script setup lang="ts">
import { RPAGetAllRecycleBinLiteAPI, RPARecoveryPostLiteAPI } from '@/api/admin/comment'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)

const tableData = ref<any[]>([])

const column = ref<any[]>([
  {
    field: 'title',
    title: '帖子标题',
  },
  {
    field: 'tag',
    title: '标签',
  },
  {
    field: 'type',
    title: '帖子类型',
    render: ({ row }: any) => {
      return `${row.pType ? row.pType + ' / ' : ''}  ${row.type}`
    },
  },
  {
    field: 'cUser',
    title: '创建人',
  },
  {
    field: 'dUser',
    title: '删除人',
  },
  {
    field: 'time',
    title: '删除时间',
  },
  {
    field: 'desc',
    title: '删除原因',
  },
  {
    field: 'opt',
    title: '操作',
    fixed: 'right',
  },
])

/** 获取回收站数据 */
const getList = async () => {
  const params = { PageNum: (currentPage.value - 1).toString(), PageSize: pageSize.value.toString() }
  const { rows, total } = await RPAGetAllRecycleBinLiteAPI(params)
  tableData.value = rows
  pageTotal.value = total
}
/** 初始化 */
async function initWindow() {
  currentPage.value = 1
  getList()
}

initWindow()

const pageChange = (page: number) => {
  currentPage.value = page
  getList()
}

/** 回复帖子 */
const onRecovery = async (row: any) => {
  await KMessageBox.confirm(`是否恢复帖子"${row.title}"?`, '恢复', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success',
  })
  const params = { PostsID: row.id }
  await RPARecoveryPostLiteAPI(params)
  tableData.value = tableData.value.filter((item) => item.id !== row.id)
  KMessage.success('恢复帖子成功!')
}
</script>

<template>
  <div class="recycle-page">
    <div class="header-search">
      <k-button main size="sm" icon-left="IconRefresh1" @click="initWindow">刷新数据</k-button>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table
          ref="treeTableRef"
          :widgets="['refresh', 'transfer', 'sizeControl']"
          :data="tableData"
          :column="column"
          hight="100%"
          :row-style="{ height: 40 + 'px' }"
          @refresh="initWindow"
          :pagination-config="{
            layout: 'total,->, prev, pager, next, jumper',
            pageSize: pageSize,
            total: pageTotal,
            currentPage: currentPage,
            isRemotePaging: true,
          }"
          @page-change="pageChange"
        >
          <template #opt="{ row }">
            <k-button main size="sm" @click="onRecovery(row)">恢复</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recycle-page {
  width: 100%;
  height: 100%;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    width: 100%;
    height: 60px;
  }
  .main-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: calc(100vh - 130px);
    .table-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
