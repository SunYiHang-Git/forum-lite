<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import InstructionData from './InstructionData.vue'
import { useRoute, useRouter } from 'vue-router'
import { getInstructionListDataAPI, getSortDataAPI, type DataType } from '../liteData'

const router = useRouter()
const route = useRoute()

const propsData = ref<DataType[]>([])

/** 获取指令集列表 */
const getInstructionList = async (filterValue: string = '') => {
  const res: any = await getInstructionListDataAPI(filterValue)
  propsData.value = res.data
}

const sortValue = ref<string>('3')
const sortOptions = [
  {
    value: '1',
    label: '升序',
  },
  {
    value: '2',
    label: '降序',
  },
  {
    value: '3',
    label: '默认',
  },
]

const handleClick = (item: DataType) => {
  // 跳转详情页
  router.push(`/detail/${item.id}`)
}

/** 切换排序 */
const changeSort = async (value: string) => {
  const res = await getSortDataAPI(value)
  propsData.value = res.data
}

watch(
  () => route.query,
  (data) => {
    const { searchValue }: any = data
    getInstructionList(searchValue)
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="box-page">
    <div class="top-data">
      <div class="number">发现：{{ propsData.length }}</div>
      <div class="sort-box">
        排序方式：
        <el-select
          v-model="sortValue"
          placeholder="请选择"
          size="small"
          style="width: 128px; height: 24px"
          @change="changeSort"
        >
          <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="page-list">
      <el-scrollbar height="100%">
        <div class="box-li" v-for="item in propsData" :key="item.id" @click="handleClick(item)">
          <InstructionData :data="item" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-page {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
}
.top-data {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: normal;
  .number {
    line-height: normal;
    font-size: 14px;
  }
  .sort-box {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }
}
.page-list {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 4px;
  overflow: hidden;
  .box-li {
    width: 100%;
    cursor: pointer;
  }
}
</style>
