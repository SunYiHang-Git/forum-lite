<script setup lang="ts">
import type { IColumn, IGoodDataType } from '@/types/goods'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
import { nextTick, onMounted, reactive, ref } from 'vue'
import AuditDialog from './AuditDialog.vue'
import EditAppDialog from './EditAppDialog.vue'
/** 表格工具栏 */
const widgets = ref(['search', 'refresh', 'filter', 'transfer', 'custom1', 'sizeControl'])

const column = ref<IColumn<keyof IGoodDataType>[]>([
  {
    type: 'seq',
    field: 'id',
    title: '序号',
    width: '50',
    dataType: 'number',
  },
  {
    field: 'devUserName',
    title: '开发者',
  },
  {
    field: 'version',
    title: '版本号',
  },
  {
    field: 'isPassed',
    title: '审核',
  },
  {
    field: 'auditUserName',
    title: '审核人',
  },
  {
    field: 'opt',
    title: '操作',
  },
])

const tableData = reactive<IGoodDataType[]>([])

async function initWindow() {
  // 获取数据
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', { isAudit: false })
  console.log('data--->', data)
  const table = new SQLTable(data.k_lite_application)
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      pid: table.s('PID'),
      name: table.s('Name'),
      icon: table.s('Icon'),
      createTime: table.s('CreateTime'),
      sort: table.s('Sort'),
      developer: table.s('Developer'),
      funcDes: table.s('FuncDes'),
      updateInfo: table.s('UpdateInfo'),
      modifyBy: table.s('ModifyBy'),
      modifyTime: table.s('ModifyTime'),
      downloadCount: table.s('DownloadCount'),
      version: table.s('Version'),
      audit: table.s('Audit'),
      auditBy: table.s('AuditBy'),
      last: table.s('Last'),
      devUserName: table.s('DevUserName'),
      modifyUserName: table.s('ModifyUserName'),
      auditUserName: table.s('AuditUserName'),
    }
    rows.push(row)
    table.next()
  }
  tableData.length = 0
  await nextTick()
  tableData.push(...rows)
  console.log('tableData--->', tableData)
}

onMounted(() => {
  initWindow()
})

/** 审核应用弹框 */
const auditDialogParams = ref<any>({
  visible: false,
})

/** 修改应用弹框 */
const editAPPDialogParams = ref<any>({
  visible: false,
})

/** 审核 */
const handleAudit = async (item: IGoodDataType) => {
  auditDialogParams.value.visible = true
  auditDialogParams.value.data = item
  auditDialogParams.value.cancel = () => {
    auditDialogParams.value.visible = false
  }
  auditDialogParams.value.submit = (data: any) => {
    console.log('data--->', data)
    auditDialogParams.value.visible = false
  }
}

/** 修改 */
const handleEdit = async (item: IGoodDataType) => {
  editAPPDialogParams.value.visible = true
  editAPPDialogParams.value.data = item
  editAPPDialogParams.value.cancel = () => {
    editAPPDialogParams.value.visible = false
  }
  editAPPDialogParams.value.submit = (data: any) => {
    console.log('data--->', data)
    editAPPDialogParams.value.visible = false
  }
}
/** 删除通过 Id */
const handleDelById = async (item: IGoodDataType) => {
  try {
    await KMessageBox.confirm('确定删除应用?', '删除应用', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    /** 删除接口 */
    KMessage.success('删除成功!')
  } catch (error) {
    if (error === 'cancel') {
      console.log('取消--->')
      return
    }
    KMessage.error('删除失败!')
    console.log('error--->', error)
  }
}
</script>

<template>
  <div class="application-com">
    <div class="title">所有应用</div>
    <div class="table-box">
      <k-tree-table :widgets="widgets" :data="tableData" :column="column">
        <template #opt="{ row }">
          <!-- {{ row.funcDes }} -->
          <k-button text color="primary" @click="handleAudit(row)">审核</k-button>
          <k-button text color="primary" @click="handleEdit(row)">修改</k-button>
          <k-button text color="error" @click="handleDelById(row)">删除</k-button>
        </template>
      </k-tree-table>
    </div>
  </div>
  <AuditDialog v-if="auditDialogParams.visible" :params="auditDialogParams" />
  <EditAppDialog v-if="editAPPDialogParams.visible" :params="editAPPDialogParams" />
</template>

<style lang="scss" scoped>
.application-com {
  width: 100%;
  height: 100%;
  .title {
    font-family: Alibaba PuHuiTi 3;
    font-size: 24px;
    font-weight: bold;
    height: 32px;
    line-height: 32px;
    color: var(--k-text-title);
  }
  .table-box {
    width: 100%;
    height: calc(100% - 32px);
    box-sizing: border-box;
    padding-bottom: 5px;
  }
}
</style>
