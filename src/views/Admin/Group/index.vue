<script setup lang="tsx">
import {
  RPAAddSecondPostTypeLiteAPI,
  RPAAddTypeLiteAPI,
  RPADelTypeLiteAPI,
  RPAEditTypeLiteAPI,
  RPAGetAllPostsTypeLiteAPI,
  RPAMoveTypeLiteAPI,
} from '@/api/admin/group'
import { KButton, KMessage, KMessageBox, KOption, showDialog, type FormItemOptions } from '@ksware/ksw-ux'
import { computed, h, ref } from 'vue'
import GroupRoleDialog from './GroupRoleDialog.vue'

const tableTreeRef = ref<any>(null)

/** 公告 ids */
const noticeIds = ref<string[]>([])

const tableData = ref<any[]>([])

const widgets: string[] = ['search', 'refresh', 'transfer', 'custom1', 'sizeControl']
const advancedFilterConfig = ref({
  exclude: ['opt'],
  ignoreCase: true,
})

const column = ref([
  {
    type: 'radio',
    width: '50',
    align: 'center',
  },
  {
    field: 'name',
    title: '名称',
    treeNode: true,
    showIcon: true,
  },
  {
    field: 'desc',
    title: '描述',
  },
  {
    field: 'opt',
    title: '操作',
    fixed: 'right',
  },
])

/** 获取用户数据 */
const getUserList = async () => {
  const rows = await RPAGetAllPostsTypeLiteAPI({})
  tableData.value = rows
  noticeIds.value = rows.filter((item) => item.pid === '' && item.name.indexOf('公告') !== -1).map((item) => item.id)
}
/** 初始化 */
async function initWindow() {
  await getUserList()
  if (tableTreeRef.value) {
    tableTreeRef.value.clearRadioRow()
  }
}

initWindow()

/** 新增 */
const addGroup = async () => {
  if (!tableTreeRef.value) return
  const row = tableTreeRef.value.getRadioRecord()
  if (row && row.pid) {
    KMessage.warning('请选择根节点')
    return
  }
  const formItems: FormItemOptions[] = [
    {
      label: '专栏名称',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'Name',
      type: 'input',
      rules: [
        {
          required: true,
          message: '专栏名称是必填项',
          trigger: 'blur',
        },
        {
          pattern: /\S/,
          message: '必须包含非空白字符',
          trigger: 'blur',
        },
      ],
    },
    {
      label: '专栏描述',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'Desc',
      rules: [
        {
          required: true,
          message: '专栏描述是必填项',
          trigger: 'blur',
        },
        {
          pattern: /\S/,
          message: '必须包含非空白字符',
          trigger: 'blur',
        },
      ],
      attrs: { type: 'textarea' },
    },
  ]
  if (row) {
    const parentGroup: FormItemOptions = {
      label: '父级专栏',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'PID',
      type: 'input',
      value: row.name,
      attrs: {
        disabled: true,
      },
    }
    formItems.unshift(parentGroup)
  }
  showDialog({
    title: '新增专栏',
    formItems: formItems,
    confirm: async (close: any, payload: any) => {
      close()
      const { Name, Desc } = payload.form
      if (row) {
        // 新增二级专栏
        await RPAAddSecondPostTypeLiteAPI({ Name: Name.trim(), Desc: Desc.trim(), PID: row.id })
      } else {
        // 新增一级专栏
        await RPAAddTypeLiteAPI({ Name, Desc })
      }
      KMessage.success('新增专栏成功!')
      initWindow()
    },
    cancel: () => {},
  })
}

/** 删除专栏 */
const delGroup = async (row: any) => {
  try {
    await KMessageBox({
      title: '删除提示',
      message: h('div', [
        `是否删除${row.name}专栏`,
        h('div', { style: { color: 'red' } }, '将删除该专栏下所有帖子，此操作不可逆'),
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const params = { TypeID: row.id }
    await RPADelTypeLiteAPI(params)
    tableData.value = tableData.value.filter((item) => item.id !== row.id)
    KMessage.success('删除专栏成功')
  } catch (error) {
    if (error === 'cancel') return
    KMessage.error('删除专栏失败')
  }
}

/** 编辑专栏 */
const editGroup = async (row: any) => {
  const pNode = tableData.value.find((v) => v.id === row.pid)
  const formItems: FormItemOptions[] = [
    {
      label: '专栏名称',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'Name',
      type: 'input',
      value: row.name,
      rules: [
        {
          required: true,
          message: '专栏名称是必填项',
          trigger: 'blur',
        },
        {
          pattern: /\S/,
          message: '必须包含非空白字符',
          trigger: 'blur',
        },
      ],
    },
    {
      label: '专栏描述',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'Desc',
      value: row.desc,
      rules: [
        {
          required: true,
          message: '专栏描述是必填项',
          trigger: 'blur',
        },
        {
          pattern: /\S/,
          message: '必须包含非空白字符',
          trigger: 'blur',
        },
      ],
      attrs: { type: 'textarea' },
    },
  ]
  if (pNode) {
    const p: FormItemOptions = {
      label: '父级专栏',
      labelPosition: 'right',
      labelWidth: '100',
      prop: 'parent',
      value: pNode.name,
      attrs: {
        disabled: true,
      },
    }
    formItems.unshift(p)
  }
  showDialog({
    title: '编辑专栏',
    formItems: formItems,
    confirm: async (close: any, payload: any) => {
      close()
      const { Name, Desc } = payload.form
      const params = { TypeID: row.id, PID: row.pid, Name: Name.trim(), Desc: Desc.trim() }
      await RPAEditTypeLiteAPI(params)
      const findItem = tableData.value.find((item) => item.id === row.id)
      if (!findItem) return
      findItem.name = Name.trim()
      findItem.desc = Desc.trim()
      KMessage.success('编辑专栏成功!')
    },
    cancel: () => {
      KMessage.info('取消')
    },
  })
}

const groupMoveParams = ref<any>({
  name: '',
  next: '',
})

/** 移动专栏接口 */
const moveGroupByTypeId = async (id: string) => {
  console.log('groupMoveParams', groupMoveParams.value)
  const params: any = { TypeID: id }
  if (groupMoveParams.value.next) {
    params.NextID = groupMoveParams.value.next
  }
  await RPAMoveTypeLiteAPI(params)
  groupMoveParams.value.name = ''
  groupMoveParams.value.next = ''
  initWindow()
}
/** 移动 */
const moveGroup = async (item: any) => {
  const data: any[] = []
  const arr = tableData.value.filter((table) => {
    return table.pid === (item.pid ? item.pid : '')
  })
  data.push(...arr)
  groupMoveParams.value.name = item.name
  showDialog({
    slots: {
      header: () => '移动专栏',
      default: () => (
        <k-form model={groupMoveParams.value} label-width="100">
          <k-form-item label="本专栏名称">
            <k-input v-model={groupMoveParams.value.name} disabled />
          </k-form-item>
          <k-form-item label="NEXT 专栏">
            <k-select v-model={groupMoveParams.value.next} placeholder="请选择 NEXT 专栏">
              {data.map((item: any) => (
                <KOption key={item.id} label={item.name} value={item.id} />
              ))}
            </k-select>
          </k-form-item>
          <k-form-item label="">
            <span>Tips:NEXT 专栏不选则移动到最后</span>
          </k-form-item>
        </k-form>
      ),
    },

    confirm: (close: any) => {
      moveGroupByTypeId(item.id)
      close()
    },
    cancel: () => {
      groupMoveParams.value.name = ''
      groupMoveParams.value.next = ''
    },
  })
}

/** 权限 */
const groupRoleParams = ref<any>({
  visible: false,
  cancel: () => (groupRoleParams.value.visible = false),
})
const setGroupRole = async (row: any) => {
  groupRoleParams.value.tid = row.id
  groupRoleParams.value.tName = row.name
  groupRoleParams.value.title = `编辑${row.name}专栏权限`
  groupRoleParams.value.visible = true
}
</script>

<template>
  <div class="group-page">
    <div class="header-search">
      <k-button main size="sm" icon-left="IconRefresh1" @click="initWindow">刷新</k-button>
      <k-button main size="sm" icon-left="IconAdd" @click="addGroup">新增</k-button>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table
          ref="tableTreeRef"
          use-tree
          :tree-config="{ rowField: 'id', parentField: 'pid', expandAll: true }"
          :radio-config="{ strict: false }"
          :widgets="widgets"
          :data="tableData"
          :column="column"
          @refresh="initWindow"
          :advancedFilterConfig="advancedFilterConfig"
        >
          <template #opt="{ row }">
            <k-button main type="success" :disabled="noticeIds.indexOf(row.pid) !== -1" @click="moveGroup(row)">
              移动
            </k-button>
            <k-button main type="warning" @click="setGroupRole(row)">权限</k-button>
            <k-button main type="primary" @click="editGroup(row)">编辑</k-button>
            <k-button main type="danger" @click="delGroup(row)">删除</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
  <GroupRoleDialog v-if="groupRoleParams.visible" :params="groupRoleParams" />
</template>

<style lang="scss" scoped>
.k-row-item {
  width: 100%;
  display: flex;
  justify-content: end;
}
.group-page {
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
