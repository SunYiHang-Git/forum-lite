<script setup lang="tsx">
import type { IClassify, IColumn, IGoodDataType, ITagType } from '@/types/goods'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
import { nextTick, onMounted, reactive, ref } from 'vue'
import AuditDialog from './AuditDialog.vue'
import EditAppDialog from './EditAppDialog.vue'
import { getAppListAPI, upperOrLowerShelveAPI } from './data'
import { arrayBufferToHex } from '@/utils/download'
import IconImg from '@/assets/images/icon1.png'
import AppUpdateDialog from './AppUpdateDialog.vue'
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
  // {
  //   field: 'status',
  //   title: '状态',
  // },
  {
    field: 'isPassed',
    title: '审核',
  },
  {
    field: 'offLineType',
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
    field: 'remark',
    title: '审核备注',
  },
  {
    field: 'opt',
    title: '操作',
    width: '300',
    fixed: 'right',
  },
])

const tableData = reactive<IGoodDataType[]>([])

/** 获取应用数据 */
const getAppList = async () => {
  // 获取数据
  const params = { IsLimit: false }
  const { list } = await getAppListAPI(params)
  tableData.length = 0
  await nextTick()
  tableData.push(...list)
}

/** 审核应用 */
const auditAppById = async (id: string, auditType: number, desc: string = '') => {
  const params = { ID: id, IsPassed: auditType, Remark: desc }
  try {
    const res = await callServerFunc('THawkeyeDM', 'AuditShopsApp', params)
    const { IsPassed } = res.data as any
    if (IsPassed === 1) {
      KMessage.success('审核通过!')
    } else {
      KMessage.warning('审核不通过!')
    }
    initWindow()
  } catch (error) {
    KMessage.error('审核失败!')
    console.error(error)
  }
}
/** 修改应用 */
const editApp = async (data: any) => {
  const { icon, id, name, blurb, classify, funcDes, tags, version } = data
  const TagIDList = tags.join(',')
  const params = {
    Icon: icon,
    ID: id,
    Name: name,
    Blurb: blurb,
    Classify: classify,
    FuncDes: funcDes,
    TagIDList,
    IsBase64IMG: true,
    VerName: version,
  }
  try {
    await callServerFunc('THawkeyeDM', 'SetShopsApp', params)
    KMessage.success('修改成功!')
    initWindow()
  } catch (error) {
    KMessage.error('修改失败!')
    console.error(error)
  }
}

async function initWindow() {
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
    if (!item.id) return
    auditAppById(item.id, data.auditType, data.desc)
  }
}

/** 修改 */
const handleEdit = async (item: IGoodDataType) => {
  editAPPDialogParams.value.visible = true
  editAPPDialogParams.value.title = '修改应用'
  editAPPDialogParams.value.data = item
  editAPPDialogParams.value.cancel = () => {
    editAPPDialogParams.value.visible = false
  }
  editAPPDialogParams.value.submit = (data: any) => {
    editAPPDialogParams.value.visible = false
    editApp(data)
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
    await callServerFunc('THawkeyeDM', 'DelShopsApp', { ID: item.id })
    KMessage.success('删除成功!')
    initWindow()
  } catch (error) {
    if (error === 'cancel') {
      return
    }
    KMessage.error('删除失败!')
  }
}

/**
 * 上下架
 *
 * @param id ID
 * @param type 上架=1;下架=2
 */
async function upperOrLowerShelve(id: string, type: 1 | 2) {
  await upperOrLowerShelveAPI(id, type)
  initWindow()
}

/** 上传文件前 */
const beforeAvatarUpload = (rawFile: any) => {
  const fileExtension = rawFile.name.split('.').pop().toLowerCase()
  if (fileExtension !== 'db') {
    KMessage.error('文件后缀必须是.db格式！')
    return false
  }
  // 检查文件大小是否超过2MB
  // if (rawFile.size / 1024 / 1024 > 2) {
  //   KMessage.error('文件大小不能超过2MB！')
  //   return false
  // }

  return true
}
/** 导入上传文件应用 */
const importAppFileAPI = async (data: any) => {
  const { icon, id, version, name, blurb, classify, funcDes, tags } = data
  const TagIDList = tags.join(',')
  const params = {
    Icon: icon,
    ID: id,
    VerName: version,
    Name: name,
    Blurb: blurb,
    Classify: classify,
    FuncDes: funcDes,
    TagIDList,
    IsBase64IMG: true,
    IsDoing: 0,
  }
  try {
    await callServerFunc('THawkeyeDM', 'SetShopsApp', params)
    KMessage.success('导入成功!')
    initWindow()
  } catch (error) {
    KMessage.error('导入失败!')
    console.error(error)
  }
}
/** 处理解析后的文件 */
const handleAnalysisFile = async (obj: any) => {
  editAPPDialogParams.value.visible = true
  editAPPDialogParams.value.title = '导入应用文件'
  editAPPDialogParams.value.data = obj
  editAPPDialogParams.value.cancel = async () => {
    editAPPDialogParams.value.visible = false
    await callServerFunc('THawkeyeDM', 'DelShopsApp', { ID: obj.id })
  }
  editAPPDialogParams.value.submit = (data: any) => {
    editAPPDialogParams.value.visible = false
    importAppFileAPI(data)
  }
}
/** 导入文件 */
const httpRequestFile = async ({ file }: { file: File }) => {
  const reader = new FileReader()
  reader.onload = async (e: any) => {
    const arrayBuffer = e.target.result
    let newData: any = {}
    newData.file = arrayBufferToHex(arrayBuffer)
    newData.Cover = true
    // callServerFunc('THawkeyeDM', 'UpLoadShopsApp', newData).then(() => {
    //   KMessage({
    //     type: 'success',
    //     message: '导入成功',
    //   })
    //   initWindow()
    // })
    const { data }: any = await callServerFunc('THawkeyeDM', 'UpLoadShopsApp', newData)
    const obj = {
      icon: data.Icon,
      version: data.VerName,
      name: data.Name,
      blurb: data.Blurb,
      id: data.ID,
      classify: data.Classify || [],
      tags: data.tags || [],
      funcDes: data.FuncDes ?? '',
    }
    console.log(obj)
    handleAnalysisFile(obj)
  }
  reader.readAsArrayBuffer(file)
}

const appUpdateDialogParams = ref<any>({
  visible: false,
})
/** 更新接口 */
const appUploadFileAPI = async (params: any) => {
  console.log('params', params)
  try {
    await callServerFunc('THawkeyeDM', 'SetShopsApp', params)
    KMessage.success('更新成功!')
    initWindow()
  } catch (error) {
    console.error(error)
  }
}
/** 更新 */
const appUpdate = (row: any) => {
  appUpdateDialogParams.value.visible = true
  appUpdateDialogParams.value.item = row
  appUpdateDialogParams.value.cancel = () => {
    appUpdateDialogParams.value.visible = false
  }
  appUpdateDialogParams.value.submit = (data: any) => {
    const { file, updateInfo, version } = data
    const params = { ID: row.id, VerName: version, file, UpdateInfo: updateInfo }
    appUploadFileAPI(params)
    appUpdateDialogParams.value.visible = false
  }
}

const handleApplyForAudit = async (row: any) => {
  console.log('申请审核', row)
  // AskShopsApp
  try {
    await callServerFunc('THawkeyeDM', 'AskShopsApp', { ID: row.id })
    KMessage.success('申请成功!')
    initWindow()
  } catch (error) {
    KMessage.error('申请失败!')
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
          <k-upload class="upload-demo" :before-upload="beforeAvatarUpload" :http-request="httpRequestFile">
            <template #trigger>
              <k-button type="primary" main>导入</k-button>
            </template>
          </k-upload>
        </template>
        <template #name="{ row }">
          <div class="name-app-box">
            <div class="img-icon">
              <k-image style="width: 100%; height: 100%" :src="row.icon" fit="fill">
                <template #error>
                  <k-image style="width: 100%; height: 100%" :src="IconImg" fit="fill" />
                </template>
              </k-image>
            </div>
            <div class="app-info">
              <div class="app-title">{{ row.name }}</div>
              <div class="app-blurb">{{ row.blurb }}</div>
            </div>
          </div>
        </template>
        <template #isPassed="{ row }">
          <k-tag v-if="row.isPassed === '0'" type="primary">待审核</k-tag>
          <k-tag v-if="row.isPassed === '1'" type="success">审核通过</k-tag>
          <k-tag v-if="row.isPassed === '2'" type="danger">审核不通过</k-tag>
        </template>
        <template #offLineType="{ row }">
          <k-tag v-if="row.offLineType === '1'" type="warning">上架</k-tag>
          <k-tag v-if="row.offLineType === '2'" type="info">下架</k-tag>
        </template>
        <template #classify="{ row }">
          <k-tag v-for="item in row.classify" :key="item.id">{{ item.name }}</k-tag>
        </template>
        <template #tags="{ row }">
          <k-tag v-for="item in row.tags" :key="item.id">{{ item.name }}</k-tag>
        </template>
        <template #opt="{ row }">
          <k-button text :disabled="row.isPassed !== '2'" color="primary" @click="handleApplyForAudit(row)">
            申请审核
          </k-button>
          <k-button text :disabled="row.isPassed !== '0'" color="primary" @click="handleAudit(row)">审核</k-button>
          <k-button
            text
            :disabled="row.status === '0'"
            color="primary"
            @click="upperOrLowerShelve(row.id, row.status === '2' ? 2 : 1)"
          >
            {{ row.status === '2' ? '下架' : '上架' }}
          </k-button>
          <k-button text color="primary" @click="appUpdate(row)">更新</k-button>
          <k-button text color="primary" :disabled="row.status === '2'" @click="handleEdit(row)">修改</k-button>
          <k-button text color="error" @click="handleDelById(row)">删除</k-button>
        </template>
      </k-tree-table>
    </div>
  </div>
  <AuditDialog v-if="auditDialogParams.visible" :params="auditDialogParams" />
  <EditAppDialog v-if="editAPPDialogParams.visible" :params="editAPPDialogParams" />
  <AppUpdateDialog v-if="appUpdateDialogParams.visible" :params="appUpdateDialogParams" />
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
    overflow: auto;
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
    .k-upload {
      :deep(.upload-demo) {
        & > .el-upload__tip {
          display: none;
        }
        & > .el-upload-list {
          display: none;
        }
      }
    }
  }
}
</style>
