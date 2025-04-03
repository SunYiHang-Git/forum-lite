<script setup lang="ts">
import { onMounted, ref } from 'vue'

import GoodInfoDialog from '../../GoodInfoDialog.vue'
import { downLoadFileById } from '@/utils/download'
import type { IGoodDataType } from '@/types/goods'
import IconImg from '@/assets/images/icon1.png'

export type IParams = {
  visible: boolean
  info: IGoodDataType
  cancel?: () => void
  submit?: (data?: any) => void
  [key: string]: any
}
const { tableData } = defineProps<{
  tableData: any[]
}>()
const parentOrigin = ref()
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  parentOrigin.value = urlParams.get('parentOrigin') ?? 'http://127.0.0.1:8071'
})

const shopInfoParams = ref<IParams>({
  visible: false,
  info: { id: '' },
})

const handleInfo = (item: any) => {
  shopInfoParams.value.visible = true
  shopInfoParams.value.info = item
  shopInfoParams.value.cancel = () => {
    shopInfoParams.value.visible = false
  }
}
const download = async (item: any) => {
  const res = await downLoadFileById(item.id, item.name)
  if (!res) return
  sendMessageToParent(res)
}
function sendMessageToParent(data: any) {
  const obj = {
    name: 'downloadApp',
    ...data,
  }
  parent.window?.postMessage(obj, parentOrigin.value)
}
</script>

<template>
  <div class="tab-pane">
    <div class="gird-box">
      <div v-for="(item, index) in tableData" :key="index" class="gird-item" @click="handleInfo(item)">
        <div class="img">
          <k-image style="width: 100%; height: 100%" :src="item.icon" fit="fill">
            <template #error>
              <!-- <k-image style="width: 100%; height: 100%" src="./images/icon1.png" fit="fill" /> -->
              <k-image style="width: 100%; height: 100%" :src="IconImg" fit="fill" />
            </template>
          </k-image>
        </div>
        <div class="content">
          <div class="box">
            <div class="title overHide">{{ item.name }}</div>
            <div class="desc overHide">{{ item.funcDes }}</div>
          </div>
          <div class="download" @click.stop="download(item)">下载</div>
        </div>
      </div>
    </div>
  </div>
  <GoodInfoDialog v-if="shopInfoParams.visible" :params="shopInfoParams" />
</template>

<style lang="scss" scoped>
.tab-pane {
  width: 100%;
  padding-bottom: 30px;
  font-family: Alibaba PuHuiTi 3;
  .gird-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(384px, 1fr)); /* 子元素宽度自适应，最小宽度是384px */
    grid-template-rows: 82px;
    gap: 16px;
    width: 100%;
  }
  .gird-item {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 12px;
    padding: 0px 16px;
    min-width: 384px;
    height: 82px;
    border-radius: 16px;
    background-color: #fff;
    cursor: pointer;
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      overflow: hidden;
    }
    .content {
      flex: 1;
      max-width: 100%;
      min-width: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 100%;
      border-bottom: 2px solid var(--k-bg-3);
      .box {
        flex: 1;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 224px;
        height: 50px;
        overflow: hidden;
        .overHide {
          white-space: nowrap; /* 强制文本在一行内显示 */
          overflow: hidden; /* 隐藏超出容器的内容 */
          text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
          display: block;
        }
        .title {
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 600;
          color: var(--k-text-title);
        }
        .desc {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-weight: normal;
          color: var(--k-text-desc);
        }
      }
      .download {
        width: 52px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        color: #2882ff;
        border-radius: 437px;
        background: rgba(0, 0, 0, 0.04);
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
