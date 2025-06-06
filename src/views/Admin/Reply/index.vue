<script setup lang="ts">
import { RPADelPostsLiteAPI, RPAEditPostsLiteAPI, RPAPostsQueryLiteAPI } from '@/api/admin/reply'
import { reactive, ref } from 'vue'
import EditReplyDialog from './EditReplyDialog.vue'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
interface IFrom {
  Title: string
  Content: string
  TypeName: string
  UserName: string
  CreateTime: string
}
const form = reactive<IFrom>({
  Title: '',
  Content: '',
  TypeName: '',
  UserName: '',
  CreateTime: '',
})
const column = ref([
  {
    field: 'title',
    title: '帖子标题',
    minWidth: '120',
  },
  {
    field: 'tag',
    title: '标签',
    minWidth: '200',
  },
  {
    field: 'type',
    title: '帖子类型',
    width: '150',
  },
  {
    field: 'user',
    title: '发帖人',
    width: '150',
  },
  {
    field: 'time',
    title: '发帖时间',
    width: '180',
  },
  {
    field: 'fine',
    title: '精帖',
    width: '100',
    align: 'center',
  },
  {
    field: 'top',
    title: '置顶',
    width: '100',
    align: 'center',
  },
  {
    field: 'hot',
    title: '人气',
    width: '100',
    align: 'center',
  },
  {
    field: 'opt',
    title: '操作',
    align: 'center',
    width: '150',
    fixed: 'right',
  },
])

const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)

const tableData = ref<any[]>([])

/** 搜索数据 */
const onSubmit = async () => {
  const keys = Object.keys(form) as Array<keyof IFrom>
  const params: any = { PageNum: currentPage.value - 1, PageSize: pageSize.value }
  if (keys.length > 0) {
    const obj: any = { type: [], content: [] }
    keys.forEach((key) => {
      if (!form[key]) return
      obj.content.push(form[key])
      obj.type.push(key[0].toUpperCase() + key.substring(1))
    })
    if (obj.content.filter((item: string) => item !== '').length > 0) {
      params.KeywordLst = obj.content
      params.KeywordTypeLst = obj.type
    }
  }
  const { rows, total } = await RPAPostsQueryLiteAPI(params)
  tableData.value = rows
  pageTotal.value = total
}

const resetSearch = () => {
  currentPage.value = 1
  form.Content = ''
  form.CreateTime = ''
  form.Title = ''
  form.TypeName = ''
  form.UserName = ''
  onSubmit()
}

function initWindow() {
  onSubmit()
}
initWindow()

/** 页码变化 */
const pageChange = (page: number) => {
  currentPage.value = page
  onSubmit()
}

const replyProParams = ref<any>({
  visible: false,
  title: '修改帖子信息',
  cancel: () => (replyProParams.value.visible = false),
})
/** 编辑 */
const editReply = async (row: any) => {
  replyProParams.value.visible = true
  replyProParams.value.data = row
  replyProParams.value.confirm = async (data: any) => {
    const params = {
      ID: row.id,
      Tag: data.tagList.join(','),
      Title: data.title,
      iType: data.type.length > 1 ? data.type.at(-1) : (data.type?.at(-1) ?? ''),
      IsTop: data.top,
      IsFine: data.fine,
    }
    await RPAEditPostsLiteAPI(params)
    replyProParams.value.visible = false
    const findItem = tableData.value.find((item) => item.id === row.id)
    if (!findItem) return
    findItem.title = data.title
    findItem.tag = data.tagList.join(',')
    findItem.type = data.typeName
    findItem.tid = data.type.length > 1 ? data.type.at(-1) : ''
    findItem.tpid = data.type[0]
    findItem.fine = data.fine === 1
    findItem.top = data.top === 1
  }
}

const delReply = async (row: any) => {
  const { value } = await KMessageBox.prompt('请输入删除此帖子的原因', '删除帖子', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '原因不能为空',
  })
  const params = { Reason: value.trim(), PostsID: row.id }
  await RPADelPostsLiteAPI(params)
  KMessage.success('帖子已删除，可在回收站恢复')
  onSubmit()
}
</script>

<template>
  <div class="reply-page">
    <div class="header-search">
      <form @submit.prevent="onSubmit" class="form-content">
        <k-input v-model="form.Title" placeholder="帖子标题" style="width: 160px" />
        <k-input v-model="form.Content" placeholder="帖子内容" style="width: 160px" />
        <k-input v-model="form.TypeName" placeholder="帖子类型" style="width: 160px" />
        <k-input v-model="form.UserName" placeholder="发帖人" style="width: 160px" />
        <k-input v-model="form.CreateTime" placeholder="发帖时间" style="width: 160px" />
        <k-button main icon-left="IconSearch" @click="onSubmit">搜索</k-button>
        <k-button main icon-left="IconReset" @click="resetSearch">重置</k-button>
        <button type="submit" style="display: none"></button>
      </form>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table
          ref="treeTableRef"
          :widgets="['refresh', 'transfer', 'sizeControl']"
          :data="tableData"
          :column="column"
          hight="100%"
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
          <template #fine="{ row }">
            <el-tag :type="row.fine ? 'primary' : 'info'">精贴</el-tag>
          </template>
          <template #top="{ row }">
            <el-tag :type="row.top ? 'primary' : 'info'">置顶</el-tag>
          </template>
          <template #opt="{ row }">
            <k-button main size="sm" @click="editReply(row)">编辑</k-button>
            <k-button main type="danger" size="sm" @click="delReply(row)">删除</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
  <EditReplyDialog v-if="replyProParams.visible" :params="replyProParams" />
</template>

<style lang="scss" scoped>
.reply-page {
  width: 100%;
  height: 100%;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    width: 100%;
    height: 60px;
    .form-content {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 10px;
      width: 100%;
    }
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
