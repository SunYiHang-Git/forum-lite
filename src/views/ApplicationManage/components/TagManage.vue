<script setup lang="ts">
import type { IColumn, ITagType } from '@/types/goods'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { IDialogParamsType, IFormRenderType } from './AddOrEditName.vue'
import AddOrEditName from './AddOrEditName.vue'

interface IFormType {
  name?: string
}

const widgets = ref(['search', 'refresh', 'filter', 'transfer', 'custom1', 'sizeControl'])
const column = ref<IColumn<keyof ITagType>[]>([
  {
    field: 'id',
    title: '序号',
    type: 'seq',
    width: '50',
    dataType: 'number',
  },

  {
    field: 'name',
    title: '标签名称',
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
const tableData = reactive<ITagType[]>([])

// THawkeyeDM.GetTagList
/** 获取标签数据 */
const getTagsData = async () => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetTagList', {})
  const table = new SQLTable(data.k_tag)
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      name: table.s('Name'),
      tagColor: table.s('TagColor'),
      colorName: table.s('ColorName'),
      sort: table.s('Sort'),
      sType: table.s('sType') as '0' | '1',
      appNumber: table.s('AppNumber'),
    }
    rows.push(row)
    table.next()
  }
  tableData.length = 0
  await nextTick()
  tableData.push(...rows)
  console.log('rows---5555>', rows)
}

/** 初始化数据 */
async function initWindow() {
  getTagsData()
}

onMounted(() => {
  initWindow()
})

const formData = ref<IFormType>({})
const formRenderData = ref<IFormRenderType<IFormType>[]>([])
/** 新增/编辑分类 */
const tagParams = ref<IDialogParamsType<IFormType, IFormRenderType<IFormType>[]>>({
  visible: false,
  formData: formData.value,
  title: '新增分类',
  formRenderData: [],
  rules: {},
  cancel: () => {
    tagParams.value.visible = false
  },
})

/** 新增/编辑分类请求 */
const callClassifyAxios = async (type: 'add' | 'edit', name: string, id: string = '') => {
  // THawkeyeDM AddTag
  try {
    if (type === 'add') {
      await callServerFunc('THawkeyeDM', 'AddTag', { sType: 'k_lite', Name: name })
      KMessage.success('新建分类成功!')
    } else if (type === 'edit') {
      await callServerFunc('THawkeyeDM', 'SetTag', {
        ID: id,
        Name: name,
        sType: 'k_lite',
      })
    }
    getTagsData()
  } catch (error) {
    KMessage.success('新建分类失败')
  }
}

/** 新增-编辑 分类 */
const addOrEditClassify = (type: 'add' | 'edit', row: any = {}) => {
  tagParams.value.visible = true
  tagParams.value.title = type === 'add' ? '新增标签' : '编辑标签'
  tagParams.value.rules = {
    name: [{ required: true, message: '名称未必填项', trigger: 'blur' }],
  }
  formRenderData.value = [
    {
      name: '名称',
      field: 'name',
      type: 'input',
      placeholder: '请输入',
    },
  ]
  tagParams.value.formRenderData = formRenderData.value
  tagParams.value.formData = { name: row.name }
  tagParams.value.submit = (data: any) => {
    tagParams.value.visible = false
    const { name } = data
    callClassifyAxios(type, name.trim(), row.id)
  }
}

/** 删除 */
const handleDelById = async (item: ITagType) => {
  try {
    await KMessageBox.confirm('确定删除标签?', '删除标签', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    /** 删除接口 */
    await callServerFunc('THawkeyeDM', 'DelTag', { ID: item.id, sType: 'k_lite' })
    KMessage.success('删除成功!')
    getTagsData()
  } catch (error) {
    if (error === 'cancel') {
      return
    }
    KMessage.error('删除失败!')
  }
}
</script>

<template>
  <div class="tag-manage">
    <div class="name-box">
      <div class="title">标签</div>
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
  <AddOrEditName v-if="tagParams.visible" :params="tagParams" />
</template>

<style lang="scss" scoped>
.tag-manage {
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
    height: calc(100% - 32px);
    box-sizing: border-box;
    padding-bottom: 5px;
  }
}
</style>
