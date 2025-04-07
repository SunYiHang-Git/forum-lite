<script setup lang="ts">
import type { IClassify, IColumn } from '@/types/goods'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import AddOrEditName, { type IDialogParamsType, type IFormData, type IFormRenderType } from './AddOrEditName.vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
import { getClassifyListAPI } from './data'
interface IFormType {
  name?: string
}
/** 表格工具栏 */
const widgets = ref(['search', 'refresh', 'filter', 'transfer', 'custom1', 'sizeControl'])
const column = ref<IColumn<keyof IClassify>[]>([
  {
    field: 'id',
    title: '序号',
    type: 'seq',
    width: '50',
    dataType: 'number',
  },

  {
    field: 'name',
    title: '分类名称',
  },
  {
    field: 'appNumber',
    title: '应用数量',
  },
  {
    field: 'opt',
    title: '操作',
    width: '150',
    align: 'center',
  },
])

const tableData = reactive<IClassify[]>([])

/** 获取分类数据 */
const getClassifyData = async () => {
  const rows = await getClassifyListAPI<IClassify>()
  tableData.length = 0
  await nextTick()
  tableData.push(...rows)
}

/** 初始化数据 */
async function initWindow() {
  getClassifyData()
}

onMounted(() => {
  initWindow()
})

const formData = ref<IFormType>({})
const formRenderData = ref<IFormRenderType<IFormType>[]>([])
/** 新增/编辑分类 */
const classifyParams = ref<IDialogParamsType<IFormType, IFormRenderType<IFormType>[]>>({
  visible: false,
  formData: formData.value,
  title: '新增分类',
  formRenderData: [],
  rules: {},
  cancel: () => {
    classifyParams.value.visible = false
  },
})

/** 新增/编辑分类请求 */
const callClassifyAxios = async (type: 'add' | 'edit', name: string, id: string = '') => {
  // THawkeyeDM NewShopsGroup    SetShopsGroup
  if (type === 'add') {
    await callServerFunc('THawkeyeDM', 'NewShopsGroup', { ShopType: 1, Name: name })
    KMessage.success('新建分类成功!')
  } else if (type === 'edit') {
    await callServerFunc('THawkeyeDM', 'SetShopsGroup', { ID: id, Name: name })
    KMessage.success('编辑分类成功!')
  }
  getClassifyData()
}

/** 新增-编辑 分类 */
const addOrEditClassify = (type: 'add' | 'edit', row: any = {}) => {
  classifyParams.value.visible = true
  classifyParams.value.title = type === 'add' ? '新增分类' : '编辑分类'
  classifyParams.value.rules = {
    name: [{ required: true, message: '名称为必填项', trigger: 'blur' }],
  }
  formRenderData.value = [
    {
      name: '名称',
      field: 'name',
      type: 'input',
      placeholder: '请输入',
    },
  ]
  classifyParams.value.formRenderData = formRenderData.value
  classifyParams.value.formData = { name: row.name }
  classifyParams.value.submit = (data: any) => {
    classifyParams.value.visible = false
    const { name } = data
    callClassifyAxios(type, name.trim(), row.id)
  }
}

/** 删除 */
const handleDelById = async (item: IClassify) => {
  try {
    await KMessageBox.confirm('确定删除分类?', '删除分类', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    /** 删除接口 */
    await callServerFunc('THawkeyeDM', 'DelShopsGroup', { ID: item.id })
    KMessage.success('删除成功!')
    getClassifyData()
  } catch (error) {
    if (error === 'cancel') {
      return
    }
    KMessage.error('删除失败!')
  }
}
</script>

<template>
  <div class="classify-box">
    <div class="name-box">
      <div class="title">分类</div>
      <k-button main @click="addOrEditClassify('add')">新增</k-button>
    </div>
    <div class="table-box">
      <k-tree-table :widgets="widgets" :data="tableData" :column="column" @refresh="initWindow">
        <template #opt="{ row }">
          <k-button text color="primary" @click="addOrEditClassify('edit', row)">编辑</k-button>
          <k-button text color="error" @click="handleDelById(row)">删除</k-button>
        </template>
      </k-tree-table>
    </div>
  </div>
  <AddOrEditName v-if="classifyParams.visible" :params="classifyParams" />
</template>

<style lang="scss" scoped>
.classify-box {
  width: 100%;
  height: 100%;
  .name-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-family: Alibaba PuHuiTi 3;
      font-size: 24px;
      font-weight: bold;
      height: 32px;
      line-height: 32px;
      color: var(--k-text-title);
    }
  }
  .table-box {
    width: 100%;
    height: calc(100% - 42px);
    box-sizing: border-box;
    padding-bottom: 5px;
  }
}
</style>
