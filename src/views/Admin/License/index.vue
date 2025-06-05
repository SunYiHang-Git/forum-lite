<script setup lang="ts">
import { GetRpaLiteAuthorizeAPI, SetRpaLiteAuthorizeAPI } from '@/api/admin/license'
import { getFutureDate } from '@/utils/format'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { computed, ref } from 'vue'
import EditLicenseDialog from './EditLicenseDialog.vue'

const selectValue = ref('')
const searchValue = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)

const selectOptions = [
  {
    value: 0,
    label: '正在申请',
  },
  {
    value: 1,
    label: '试用中',
  },
  {
    value: 2,
    label: '试用结束',
  },
]

const tableData = ref<any[]>([])

const column = ref([
  {
    field: 'id',
    title: 'UID',
    minWidth: '320',
    align: 'center',
  },
  {
    field: 'userName',
    title: '昵称',
    minWidth: '180',
  },
  {
    field: 'mobile',
    title: '手机',
    width: '150',
    align: 'center',
  },
  {
    field: 'eMail',
    title: '邮箱',
    width: '150',
  },
  {
    field: 'beginDate',
    title: '注册时间',
    width: '120',
    align: 'center',
  },
  {
    field: 'endDate',
    title: '结束时间',
    width: '120',
    align: 'center',
  },
  {
    field: 'applyForUse',
    title: '申请使用',
    width: '180px',
    align: 'center',
  },
  {
    field: 'subscriber',
    title: '是否付费用户',
    width: '180px',
    align: 'center',
  },
  {
    field: 'iCount',
    title: '累计试用次数',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'opt',
    title: '操作',
    minWidth: '180',
    align: 'center',
    fixed: 'right',
  },
])

const paramsValue = computed(() => {
  const params: any = { KeySearch: searchValue.value }
  if (selectValue.value !== '') {
    params.ApplyForUse = selectValue.value
  }
  params.iStartRow = (currentPage.value - 1) * pageSize.value
  params.iCountRow = pageSize.value

  return params
})

/** 获取授权管理数据 */
async function getLicenseList() {
  const { rows, total } = await GetRpaLiteAuthorizeAPI(paramsValue.value)
  tableData.value = rows
  pageTotal.value = total
}

/** 重置 */
const reset = () => {
  selectValue.value = ''
  searchValue.value = ''
  currentPage.value = 1
  getLicenseList()
}

function initWindow() {
  reset()
}

initWindow()

const searchTable = () => {
  getLicenseList()
}

/** 页码变化 */
const pageChange = (page: number) => {
  currentPage.value = page
  getLicenseList()
}

const editUserParams = ref<any>({
  visible: false,
  title: '授权管理-编辑',
  cancel: () => (editUserParams.value.visible = false),
})

/** 编辑 */
const editUser = (item: any) => {
  editUserParams.value.visible = true
  editUserParams.value.data = item
  editUserParams.value.confirm = async (data: any) => {
    const params = { ID: item.id, ApplyForUse: 1, EndDate: data }
    await SetRpaLiteAuthorizeAPI(params)
    KMessage.success('授权成功!')
    getLicenseList()
  }
}
/** 同意 */
const onAllow = async (item: any) => {
  try {
    await KMessageBox.confirm('此操作将同意增加三十天使用权限?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success',
    })
    const endDate = getFutureDate(30)
    const params = { ID: item.id, EndDate: endDate, ApplyForUse: 1 }
    await SetRpaLiteAuthorizeAPI(params)
    KMessage.success('同意试用!')
    getLicenseList()
  } catch (error) {
    if (error === 'cancel') return
    KMessage.error('同意授权失败!')
  }
}
</script>

<template>
  <div class="license-index">
    <div class="header-search">
      <k-select v-model="selectValue" clearable placeholder="是否申请" style="width: 180px">
        <k-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
      </k-select>
      <KInput v-model="searchValue" style="width: 180px" placeholder="搜索" />
      <k-button icon-left="IconSearch" main @click="searchTable">搜索</k-button>
      <k-button icon-left="IconRotateClockwise" main @click="reset">重置</k-button>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table
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
          <template #applyForUse="{ row }">
            <span v-if="row.applyForUse === '0'" style="color: #f97316">正在申请</span>
            <span v-else-if="row.applyForUse === '1'" style="color: #9e9e9e">试用中</span>
            <span v-else-if="row.applyForUse === '2'" style="color: #9e9e9e">试用结束</span>
          </template>
          <template #subscriber="{ row }">
            <k-tag :type="row.subscriber === '0' ? 'info' : 'primary'">
              {{ row.subscriber === '0' ? '否' : '是' }}
            </k-tag>
          </template>
          <template #opt="{ row }">
            <k-button main text size="small" @click="editUser(row)">编辑</k-button>
            <k-button text main size="small" @click="onAllow(row)">同意试用</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
  <EditLicenseDialog v-if="editUserParams.visible" :params="editUserParams" />
</template>

<style lang="scss" scoped>
.license-index {
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
