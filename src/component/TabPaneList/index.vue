<script setup lang="ts">
import { ref } from 'vue'
import PageList from '@/views/classList/component/PageList.vue'
type ITabList = {
  label: string
  name: string
  tableList: any[]
}
const props = withDefaults(
  defineProps<{
    /** 列表数据 */
    tabList: ITabList[]
    /** tab 名称 */
    active: string
    /** 页码 */
    pageTotal?: number
    /** 页面尺寸 */
    pageSize?: number
    /** 是否显示分页 */
    showPagination?: boolean
  }>(),
  { pageTotal: 0, showPagination: true },
)

const emits = defineEmits<{
  (e: 'tabClick', name: string): void
  (e: 'changePage', page: number): void
}>()
/** 当前页 */
const currentPage = ref(1)

const activeName = ref(props.active)

function handleClick(tabName: any) {
  emits('tabClick', tabName)
  currentPage.value = 1
}

/** 切换分页 */
const handleCurrentChange = () => {
  emits('changePage', currentPage.value)
}
</script>

<template>
  <div class="tab-pane-list djc">
    <div class="tab-box">
      <k-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
        <k-tab-pane v-for="(item, index) in props.tabList" :key="index" :label="item?.label" :name="item?.name">
          <div class="tab-div-content">
            <PageList :tableData="item.tableList" :showUsername="false" />
          </div>
        </k-tab-pane>
      </k-tabs>
    </div>
    <div class="footer" v-if="showPagination">
      <k-pagination
        v-model:current-page="currentPage"
        :page-size="props.pageSize"
        layout="total,->, prev, pager, next, jumper"
        :total="props.pageTotal"
        :pager-count="5"
        background
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.djc {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.tab-pane-list {
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-height: calc(100vh - 302px);
  height: 100%;
  width: 100%;
  .tab-box {
    flex: 1;
    width: 100%;
    .k-tabs {
      width: 100%;
      height: 100%;
    }
    .tab-div-content {
      width: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    .k-pagination {
      width: 100%;
    }
  }
}
</style>
