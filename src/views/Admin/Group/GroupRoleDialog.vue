<script setup lang="tsx">
import { RPAGetTypePublishRoleLiteAPI, RPASetTypePublishRoleLiteAPI } from '@/api/admin/group'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import type { FormInstance } from 'element-plus'
import { computed, ref } from 'vue'

const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)

const treeTableRef = ref<any>()

const column = ref<any>([
  {
    type: 'checkbox',
    width: '50',
    align: 'center',
  },
  {
    field: 'name',
    title: '用户',
  },
  {
    field: 'phone',
    title: '手机',
    align: 'center',
  },
  {
    field: 'eMail',
    title: '邮箱',
  },
  {
    field: 'status',
    title: '状态',
    align: 'center',
    render: ({ row }: any) => {
      return row.publish === '1' ? <k-tag>允许发布</k-tag> : <k-tag type="danger">禁止发布</k-tag>
    },
  },
])

const userName = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)
const tableData = ref<any[]>([])

const search = () => {
  initWindow()
}
const clear = () => {
  userName.value = ''
  initWindow()
}

async function getRoleList() {
  const data = {
    PostsTypeID: params.tid,
    UserName: userName.value,
    iStartRow: (currentPage.value - 1) * pageSize.value,
    iCountRow: pageSize.value,
  }
  const { rows, total } = await RPAGetTypePublishRoleLiteAPI(data)
  tableData.value = rows
  pageTotal.value = total
}
async function initWindow() {
  currentPage.value = 1
  getRoleList()
}

initWindow()

/** 页码变化 */
const pageChange = (page: number) => {
  currentPage.value = page
  getRoleList()
}

/** 取消 */
const handleClose = () => {
  params.cancel()
}
/** 取消 */
const setRoleAuth = async () => {
  if (!treeTableRef.value) return
  const rows = treeTableRef.value.getCheckboxRecords(true)
  params.cancel()
  if (rows.length === 0) return
  const userIds: string[] = []
  const publish: string[] = []
  rows.forEach((row: any) => {
    userIds.push(row.id)
    publish.push(row.publish)
  })
  const data = { TypeID: params.tid, TypeUserID: userIds.join(','), Publish: publish.join(',') }
  await KMessageBox.confirm(`是否确定设置 ${params.tName} 专栏权限?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await RPASetTypePublishRoleLiteAPI(data)
  KMessage.success('设置成功')
}
</script>

<template>
  <k-dialog
    v-model="dialogVisible"
    width="800"
    class="info-dialog"
    :show-close="false"
    draggable
    resizable
    :show-resize-handles="false"
  >
    <template #header>
      <div class="my-header">
        <div class="dialog-title">{{ params.title }}</div>
        <k-button @click="handleClose" text color="#484848">
          <IconClose :size="20" />
        </k-button>
      </div>
    </template>
    <div class="main">
      <div class="search-box">
        请输入用户名查询
        <k-input v-model="userName" placeholder="请输入用户名" style="width: 240px" clearable @clear="clear" />
        <k-button main @click="search">查询</k-button>
      </div>
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
        ></k-tree-table>
      </div>
    </div>
    <template #footer>
      <k-button main @click="setRoleAuth">确定</k-button>
      <k-button @click="handleClose">取消</k-button>
    </template>
  </k-dialog>
</template>

<style lang="scss" scoped>
.info-dialog {
  .my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dialog-title {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      color: #171717;
    }
  }
  .main {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    .search-box {
      display: flex;
      justify-content: start;
      gap: 24px;
      width: 100%;
      height: 32px;
      line-height: 32px;
    }
    .table-box {
      margin-top: 18px;
      width: 100%;
      height: 450px;
    }
  }
}
</style>
