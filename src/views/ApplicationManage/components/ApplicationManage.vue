<script setup lang="tsx">
import type { IClassify, IColumn, IGoodDataType, ITagType } from '@/types/goods'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
import { nextTick, onMounted, reactive, ref } from 'vue'
import AuditDialog from './AuditDialog.vue'
import EditAppDialog from './EditAppDialog.vue'
import { handleAuditStatus } from './data'
/** 表格工具栏 */
const widgets = ref(['search', 'refresh', 'filter', 'transfer', 'custom1', 'sizeControl'])
/** 表格每行的高度 */
const tableRowHeight = ref<number>(60)
const column = ref<IColumn<keyof IGoodDataType>[]>([
  {
    type: 'seq',
    field: 'id',
    title: '序号',
    width: '50',
    dataType: 'number',
  },
  {
    field: 'name',
    title: '应用',
    width: '150',
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
    field: 'status',
    title: '状态',
  },
  {
    field: 'auditUserName',
    title: '审核人',
  },
  {
    field: 'classify',
    title: '分类',
  },
  {
    field: 'tags',
    title: '标签',
  },
  {
    field: 'funcDes',
    title: '功能描述',
  },
  {
    field: 'opt',
    title: '操作',
  },
])

const tableData = reactive<IGoodDataType[]>([])
/** 标签列表 */
const tagsList = ref<ITagType[]>([])
/** 分类列表 */
const classifyList = ref<IClassify[]>([])
/** 获取标签数据 */
const getTagsData = async () => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', {}, { isShowLoading: false })
  const table = new SQLTable(data.k_tag)
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('TagID'),
      name: table.s('Name'),
      tagColor: table.s('TagColor'),
      colorName: table.s('ColorName'),
      sort: table.s('Sort'),
      sType: table.s('sType') as '0' | '1',
      appNumber: table.s('AppNumber'),
      appId: table.s('AppID'),
    }
    rows.push(row)
    table.next()
  }
  tagsList.value = rows
}

/** 获取分类 */
const getClassifyList = async () => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsGroupList', {}, { isShowLoading: false })
  const table = new SQLTable(data.k_lite_shops_group)
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      pid: table.s('PID'),
      name: table.s('Name'),
      level: table.s('Level'),
      sort: table.s('Sort'),
      shopType: table.s('ShopType') as '0' | '1',
      appNumber: table.s('AppNumber'),
    }
    rows.push(row)
    table.next()
  }
  classifyList.value = rows
}
/** 获取应用数据 */
const getAppList = async (name: string = '') => {
  // 获取数据
  const params = { isAudit: false, Name: name, IsLimit: false }
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', params, { isShowLoading: true })
  const table = new SQLTable(data.k_lite_application)
  const rows = []
  while (!table.eof()) {
    const pid = table.s('PID')
    const id = table.s('ID')
    const audit = table.s('Audit') as '0' | '1'
    const offLineType = table.s('OffLineType') as '0' | '1' | '2'
    const row = {
      id,
      pid,
      name: table.s('Name'),
      icon: table.s('Icon'),
      blurb: table.s('Blurb'),
      createTime: table.s('CreateTime'),
      sort: table.s('Sort'),
      developer: table.s('Developer'),
      funcDes: table.s('FuncDes'),
      updateInfo: table.s('UpdateInfo'),
      modifyBy: table.s('ModifyBy'),
      modifyTime: table.s('ModifyTime'),
      downloadCount: table.s('DownloadCount'),
      version: table.s('Version'),
      status: handleAuditStatus(audit, offLineType),
      auditBy: table.s('AuditBy'),
      last: table.s('Last'),
      devUserName: table.s('DevUserName'),
      modifyUserName: table.s('ModifyUserName'),
      auditUserName: table.s('AuditUserName'),
      tags: tagsList.value.filter((item) => item.appId === id),
      classify: classifyList.value.filter((item) => item.id === pid),
    }
    rows.push(row)
    table.next()
  }
  tableData.length = 0
  await nextTick()
  tableData.push(...rows)
  console.log('数据', rows)
}

/** 审核应用 */
const auditAppById = async (id: string, auditType: boolean, desc: string = '') => {
  const params = { ID: id, IsPassed: auditType, Remark: desc }
  try {
    callServerFunc('THawkeyeDM', 'AuditShopsApp', params)
    KMessage.success('审核成功!')
    initWindow()
  } catch (error) {
    KMessage.error('审核失败!')
    console.error(error)
  }
}
/** 修改应用 */
const editApp = async (data: any) => {
  const { icon, id, name, blurb, classify, funcDes, tags } = data
  const TaIDList = tags.join(',')
  const params = { Icon: icon, ID: id, Name: name, Blurb: blurb, Classify: classify, FuncDes: funcDes, TaIDList }
  console.log('params', params)
  try {
    callServerFunc('THawkeyeDM', 'SetShopsApp', params)
    KMessage.success('修改成功!')
    getAppList()
  } catch (error) {
    KMessage.error('修改失败!')
    console.error(error)
  }
}
/** 新增应用 */
const addAppAPI = async (data: any) => {
  const { icon, id, name, blurb, classify, funcDes, tags } = data
  const TaIDList = tags.join(',')
  const UpdateInfo = '更新信息.....'
  const params = { Icon: icon, Name: name, Blurb: blurb, PID: classify, FuncDes: funcDes, TaIDList, UpdateInfo }
  console.log('params', params)
  try {
    callServerFunc('THawkeyeDM', 'NewShopsApp', params)
    KMessage.success('新增应用成功!')
    getAppList()
  } catch (error) {
    KMessage.error('新增应用失败!')
    console.error(error)
  }
}

async function initWindow() {
  await getTagsData()
  await getClassifyList()
  await getAppList()
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
    auditDialogParams.value.visible = false
    console.log('审核', data)
    if (!item.id) return
    auditAppById(item.id, data.auditType, data.desc)
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
    editApp({ id: item.id, ...data })
  }
}
/** 新增 */
const addApp = async () => {
  editAPPDialogParams.value.visible = true
  editAPPDialogParams.value.data = { icon: '', name: '', blurb: '', classify: '', tags: [], funcDes: '' }
  editAPPDialogParams.value.cancel = () => {
    editAPPDialogParams.value.visible = false
  }
  editAPPDialogParams.value.submit = (data: any) => {
    editAPPDialogParams.value.visible = false
    addAppAPI({ ...data })
  }
}
/** 删除通过 Id */
const handleDelById = async (item: IGoodDataType) => {
  console.log('删除', item)
  try {
    await KMessageBox.confirm('确定删除应用?', '删除应用', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    callServerFunc('THawkeyeDM', 'DelShopsApp', { ID: item.id })
    KMessage.success('删除成功!')
    getAppList()
  } catch (error) {
    if (error === 'cancel') {
      return
    }
    KMessage.error('删除失败!')
  }
}
</script>

<template>
  <div class="application-com">
    <div class="title">所有应用</div>
    <div class="table-box">
      <k-tree-table
        :widgets="widgets"
        :data="tableData"
        :column="column"
        @refresh="initWindow"
        :row-style="{ height: tableRowHeight + 'px' }"
      >
        <template #custom1>
          <k-button main @click="addApp">新增</k-button>
        </template>
        <template #name="{ row }">
          <div class="name-app-box">
            <div class="img-icon">图标</div>
            <div class="app-info">
              <div class="app-title">{{ row.name }}</div>
              <div class="app-blurb">{{ row.blurb }}</div>
            </div>
          </div>
        </template>
        <template #status="{ row }">
          <k-tag v-if="row.status === '0'" type="primary">待审核</k-tag>
          <k-tag v-if="row.status === '1'" type="success">已审核</k-tag>
          <k-tag v-if="row.status === '2'" type="warning">上架</k-tag>
          <k-tag v-if="row.status === '3'" type="info">下架</k-tag>
        </template>
        <template #classify="{ row }">
          <k-tag v-for="item in row.classify" :key="item.id">{{ item.name }}</k-tag>
        </template>
        <template #tags="{ row }">
          <k-tag v-for="item in row.tags" :key="item.id">{{ item.name }}</k-tag>
        </template>
        <template #opt="{ row }">
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
    .name-app-box {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 6px;
      .img-icon {
        width: 40px;
        height: 40px;
        overflow: hidden;
        background-color: pink;
      }
      .app-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 46px;
        min-width: 80px;
        .app-title {
          font-family: Alibaba PuHuiTi 3;
          font-size: 14px;
          font-weight: 600;
          color: #38363c;
        }
        .app-blurb {
          font-family: Alibaba PuHuiTi 2;
          font-size: 14px;
          font-weight: normal;
          color: #38363c;
        }
      }
    }
  }
}
</style>
