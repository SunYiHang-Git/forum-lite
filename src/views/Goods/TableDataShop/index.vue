<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'

import TabPane from './components/TabPane.vue'
import type { IGoodDataType } from '@/types/goods'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'
export interface ITabDataList {
  id?: string
  label: string
  name: string
  tableData: IGoodDataType[]
  pageSize?: number
  pageNumber: number
  page: number
  total: number
}
const { searchValue, activeNameTab } = defineProps<{
  searchValue: string
  activeNameTab: string
}>()

const emits = defineEmits<{
  (e: 'sendHandleSearch', item: ITabDataList, cb?: Function): void
}>()

/** 页码尺寸 */
const pageSize = ref(20)
const activeName = ref('all')
const tabDataList = ref<ITabDataList[]>([])

const allOption = ref<ITabDataList>({
  id: 'all',
  label: '全部',
  name: 'all',
  tableData: [],
  pageSize: pageSize.value,
  pageNumber: 0,
  page: 1,
  total: 0,
})

/** 获取分类数据 */
const getClassifyData = async () => {
  const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsGroupList', {})
  const table = new SQLTable(data.k_lite_shops_group)
  const rows: any[] = []
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
  const arr = rows.map((item) => {
    return {
      id: item.id,
      label: item.name,
      name: item.id,
      tableData: [],
      pageSize: pageSize.value,
      pageNumber: 0,
      page: 1,
      total: 0,
    }
  })
  arr.unshift(allOption.value as any)
  tabDataList.value = arr
}
/** 获取标签数据 */
const getTagsData = async (data: any) => {
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
  return rows
}
/** 数据 */
const tableData = reactive<IGoodDataType[]>([])
/**
 * 获取应用数据
 *
 * @param name 查询名称
 * @param id 类别名称
 * @param pageNumber 当前页码
 * @param pageSize 页面尺寸
 */
const getAppList = async (name: string = '', id: string = '', pageNum: number = 1, pageSize: number = 20) => {
  const params = { isAudit: false, Name: name, ClassifyID: id === 'all' ? '' : id, pageNumber: pageNum, pageSize }
  console.log('params--->', params)
  // const { data }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', { isAudit: false, Name: '' })
  const { data, pageNumber, page, total }: any = await callServerFunc('THawkeyeDM', 'GetShopsAppList', params)
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
  // tableData.length = 0
  // await nextTick()
  // tableData.push(...rows)
  // const allFindItem = tabDataList.value.find((item) => item.name === 'all')
  // if (allFindItem) {
  //   allFindItem.tableData = tableData as any
  // }
  console.log('rows--->', rows)
  return { list: rows, pageNumber, page, total }
}

/** 初始化数据 */
async function initWindow() {
  await getClassifyData()
  handleClick('all')
}

onMounted(async () => {
  await initWindow()
})

watch(
  () => activeNameTab,
  (val) => {
    if (!val) return
    activeName.value = val
  },
  {
    immediate: true,
  },
)
/** tab 切换事件 */
async function handleClick(tabName: string) {
  const findItem = tabDataList.value.find((item) => item.id === tabName)
  if (!findItem) return
  emits('sendHandleSearch', findItem, getAppList)
  console.log('tabDataList.value--->', tabDataList.value)
}
</script>

<template>
  <div class="table-shop">
    <k-tabs v-model="activeName" class="shop-tabs" @tab-change="handleClick">
      <k-tab-pane v-for="(item, index) in tabDataList" :key="index" :label="item.label" :name="item.name">
        <template #default>
          <div class="tab-pane-box">
            <TabPane :table-data="item.tableData" />
          </div>
        </template>
      </k-tab-pane>
    </k-tabs>
  </div>
</template>

<style lang="scss" scoped>
.table-shop {
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  padding-top: 80px;
  .tab-pane-box {
    display: flex;
  }
}
</style>
