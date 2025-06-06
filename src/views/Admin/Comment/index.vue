<script setup lang="ts">
import { RPADelReplyLiteAPI, RPAReplyQueryLiteAPI } from '@/api/admin/comment'
import { KMessageBox } from '@ksware/ksw-ux'
import { ref } from 'vue'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'

// 回车搜索逻辑
const { onEnter, onCompositionStart, onCompositionEnd } = useEnterSubmit(() => {
  searchTable()
})

const widgets: string[] = ['search', 'refresh', 'transfer', 'custom1', 'sizeControl']

/** 搜索类型 */
const selectType = [
  { label: '标题搜索', value: 'Title' },
  { label: '内容搜索', value: 'Content' },
  { label: '用户搜索', value: 'UserName' },
]
/** 选中搜索类型值 */
const selectTypeValue = ref('Title')

/** 搜索值 */
const searchValue = ref('')

const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)

const tableData = ref<any[]>([])
const column = ref([
  {
    field: 'user',
    title: '用户姓名',
    width: '150',
  },
  {
    field: 'title',
    title: '帖子标题',
  },
  {
    field: 'content',
    title: '评论内容',
  },
  {
    field: 'time',
    title: '评论时间',
    align: 'center',
    width: '200',
  },
  {
    field: 'opt',
    title: '操作',
    width: '100',
    align: 'center',
    fixed: 'right',
  },
])

const reset = () => {
  selectTypeValue.value = 'Title'
  searchValue.value = ''
  currentPage.value = 1
  searchTable()
}
const searchTable = async () => {
  const params = {
    Keyword: searchValue.value,
    KeywordType: selectTypeValue.value,
    PageNum: currentPage.value - 1,
    PageSize: pageSize.value,
  }
  const { rows, total } = await RPAReplyQueryLiteAPI(params)
  tableData.value = rows
  pageTotal.value = total
}

function initWindow() {
  currentPage.value = 1
  searchTable()
}
initWindow()

const onDelComment = async (row: any) => {
  await KMessageBox.confirm('确认要删除该评论吗?', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const params = { ReplyID: row.id }
  await RPADelReplyLiteAPI(params)
  searchTable()
}
</script>

<template>
  <div class="comment-page">
    <div class="header-search">
      <k-select v-model="selectTypeValue" clearable placeholder="是否申请" style="width: 180px">
        <k-option v-for="item in selectType" :key="item.value" :label="item.label" :value="item.value" />
      </k-select>
      <KInput
        v-model="searchValue"
        style="width: 180px"
        placeholder="搜索内容"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @keydown.enter="onEnter"
      />
      <k-button icon-left="IconSearch" main @click="searchTable">搜索</k-button>
      <k-button icon-left="IconRotateClockwise" main @click="reset">重置</k-button>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table ref="tableTreeRef" :widgets="widgets" :data="tableData" :column="column" @refresh="initWindow">
          <template #opt="{ row }">
            <k-button main type="danger" @click="onDelComment(row)">删除</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-page {
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
