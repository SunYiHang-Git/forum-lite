<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type DataType, getInstructionByIdAPI } from './liteData'

const route = useRoute()
const router = useRouter()

/** id */
const liteId = ref<string>('')
/** 指令数据对象 */
const infoData = ref<DataType>()
/** 版本 */
const version = ref<string>('')

/** 根据Id获取数据 */
const getDataById = async (id: string): Promise<DataType> => {
  const { data }: any = await getInstructionByIdAPI(id)
  return data
}
/** 初始化数据 */
const initData = async () => {
  const { id }: { id: string } = route.params as any
  if (!id) {
    ElMessage.error('缺少参数-ID')
    router.push('/lite')
    return
  }
  liteId.value = id
  infoData.value = await getDataById(id)
  version.value = infoData.value.version
}

onMounted(() => {
  initData()
})
/** 切换版本 */
const changeVersion = async (v: string) => {
  const { data } = await getInstructionByIdAPI(liteId.value, v)
  infoData.value = data
}

/** 下载指令集 */
const downInstruction = async () => {
  const res = await getInstructionByIdAPI(liteId.value, version.value)
  ElMessage.success('下载成功')
}
</script>

<template>
  <div class="lite-detail">
    <div class="top-box">
      <div class="title ellipsis">{{ infoData?.instructionName }}</div>
      <div class="top-content">
        <div>{{ infoData?.version }}</div>
        <div style="color: #14865c">Public</div>
        <div>{{ infoData?.updateTime }}</div>
      </div>
    </div>
    <div class="main">
      <div class="lite-detail-box">
        <div class="title ellipsis">{{ infoData?.instructionName }}</div>
        <div class="tags">
          <div class="tag" v-for="(tag, index) in infoData?.tags" :key="index">{{ tag }}</div>
        </div>
        <hr />
        <div class="img" v-if="infoData?.picture">
          <img :src="infoData?.picture" alt="" style="width: 100%; height: 100%" />
        </div>
        <div class="content">
          {{ infoData?.instructionDesc }}
        </div>
      </div>
      <div class="lite-info">
        <k-row class="lite-info-row">
          <div class="version-box">
            <div class="text">切换版本</div>
            <div class="num">
              <el-select v-model="version" placeholder="选择版本" style="width: 150px" @change="changeVersion">
                <el-option v-for="(item, index) in infoData?.historyVersion" :key="index" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
          <el-button type="primary" @click="downInstruction">下载指令集</el-button>
        </k-row>
        <div class="info-box">
          <div class="text">总下载量</div>
          <div class="num">{{ infoData?.download }}</div>
        </div>
        <div class="info-box">
          <div class="text">最新版本</div>
          <div class="num">{{ infoData?.version }}</div>
        </div>
        <div class="info-box">
          <div class="text">指令集大小</div>
          <div class="num">3Mb</div>
        </div>
        <div class="info-box">
          <div class="text">更新时间</div>
          <div class="num">{{ infoData?.updateTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lite-detail {
  width: 1175px;
  height: 100%;
  background-color: #fff;
  .top-box {
    width: 402px;
    height: 80px;
    padding: 10px 5px;
    .title {
      width: 100%;
      height: 26px;
      line-height: 26px;
      font-size: 18px;
      font-weight: 600;
    }
    .top-content {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
      height: 24px;
      margin-top: 10px;
    }
  }
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 0px;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    .lite-detail-box {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-self: start;
      gap: 5px;
      width: 770px;
      .title {
        font-size: 28px;
        font-weight: 600;
      }
      .tags {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 18px;
        .tag {
          padding: 2px 5px;
          background-color: #f2f2f2;
          border-radius: 4px;
          font-size: 14px;
          color: #18181e;
        }
      }
      .img {
        width: 100%;
        aspect-ratio: auto 2/1;
        background-color: gray;
        overflow: hidden;
      }
      .content {
        font-size: 16px;
        line-height: 2.2;
        font-weight: 500;
        color: #6d6d6d;
      }
    }
    .lite-info {
      font-size: 16px;
      padding: 5px 10px;
      width: 405px;
      .info-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        padding: 5px 10px;
        border-width: 1px 0px 1px 0px;
        border-style: solid;
        border-color: #eee;
      }
      .lite-info-row {
        display: flex;
        justify-content: start;
        gap: 20px;
        padding: 10px;
        align-items: end;
        .version-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 80px;
        }
      }
    }
  }
}
</style>
