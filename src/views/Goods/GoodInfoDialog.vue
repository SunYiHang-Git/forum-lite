<script setup lang="ts">
import { computed, ref } from 'vue'
import TextTip from '@/component/TextTip/index.vue'
import { historyList, type IHistoryList } from './data'
import HistoryVersion from './HistoryVersion.vue'
import type { IParams } from './TableDataShop/components/TabPane.vue'
import { downLoadFileById } from '@/utils/download'

const { params } = defineProps<{
  params: IParams
}>()
const isShowHistory = ref(false)
const dialogVisible = computed(() => params.visible)

const handleClose = () => {
  params.cancel?.()
}

const dataInfo = computed(() => params.info || {})

const historyData = ref<{
  list: IHistoryList[]
  goBack: () => void
}>({
  list: [],
  goBack: () => {
    isShowHistory.value = false
  },
})

const showHistoryVersion = () => {
  // 请求
  historyData.value.list = historyList
  isShowHistory.value = true
}

const download = () => {
  downLoadFileById(params.info.ID)
}
</script>

<template>
  <k-dialog v-model="dialogVisible" title="" width="900" class="info-dialog" :before-close="handleClose">
    <div v-if="!isShowHistory" class="content-box">
      <div class="top">
        <div class="icon-box">头像</div>
        <div class="right-box">
          <div class="title overHide">{{ dataInfo.Name }}</div>
          <div class="desc overHide">
            {{ dataInfo.FuncDes }}
          </div>
          <k-button main type="primary" class="button" @click="download">下载</k-button>
        </div>
      </div>
      <div class="main-box">
        <div class="func-content">
          <k-scrollbar max-height="90%">
            <div class="func-box">
              <div class="func-title">功能描述</div>
              <div class="func-desc">
                <TextTip :text="dataInfo.FuncDes" :lineNumber="3" />
              </div>
            </div>
            <div class="update-box">
              <div class="left-update">
                <div class="update-title">变更内容</div>
                <div class="update-desc"><TextTip :text="dataInfo.UpdateInfo" :lineNumber="3" /></div>
              </div>
              <div class="right-update">
                <div class="history" @click="showHistoryVersion">版本历史记录</div>
                <div class="desc-info">
                  <div class="time">{{ dataInfo.CreateTime }}</div>
                  <div class="version">{{ dataInfo.Ver }}</div>
                </div>
              </div>
            </div>
          </k-scrollbar>
        </div>
        <div class="develop-box">
          <div class="dev">
            <div class="dev-title">开发者</div>
            <div class="sign">
              <div class="img">
                <el-image style="width: 100%; height: 100%" src="/images/RPA.png" fit="fill" />
              </div>
              <!-- <div class="team">K-RPA Lite 团队</div> -->
              <div class="team">{{ dataInfo.Developer }}</div>
            </div>
          </div>
          <div class="tag-box">
            <div class="title">标签</div>
            <div class="tags">
              <div class="tag">金融</div>
              <div class="tag">脚本</div>
              <div class="tag">金融</div>
              <div class="tag">脚本</div>
              <div class="tag">金融</div>
              <div class="tag">脚本</div>
              <div class="tag">金融</div>
              <div class="tag">脚本</div>
              <div class="tag">金融</div>
              <div class="tag">脚本</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HistoryVersion v-if="isShowHistory" :historyData="historyData" />
  </k-dialog>
</template>

<style lang="scss" scoped>
.k-dialog {
  padding: 0 !important;
}
.overHide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-dialog {
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 600px;
    .top {
      display: flex;
      align-items: start;
      justify-content: start;
      gap: 32px;
      width: 100%;
      height: 132px;
      border-bottom: 1px solid var(--k-border-color);
      .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 24px;
        box-sizing: border-box;
        border: 1.04px solid rgba(0, 0, 0, 0.12);
        overflow: hidden;
        background-color: pink;
      }
      .right-box {
        flex: 1;
        min-width: 50px;
        height: 100px;
        .title {
          height: 32px;
          font-size: 20px;
          font-weight: bold;
          color: #0f0b1c;
          font-family: Alibaba PuHuiTi 3;
        }
        .desc {
          height: 22px;
          margin-top: 4px;
          font-size: 14px;
          font-weight: normal;
          color: #a3a3a3;
          font-family: Alibaba PuHuiTi 2;
        }
        .button {
          margin-top: 10px;
          width: 76px;
          height: 32px;
          border-radius: 437px;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .main-box {
      flex: 1;
      min-height: 300px;
      display: flex;
      justify-content: space-between;
      gap: 40px;
      margin-top: 32px;
      width: 100%;
      overflow: hidden;
      .func-content {
        flex: 1;
        min-width: 100px;
        height: 100%;
        .func-box {
          .func-title {
            font-size: 16px;
            font-weight: bold;
          }
          .func-desc {
            margin-top: 16px;
            width: 100%;
          }
        }
        .update-box {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          margin-top: 30px;
          .left-update {
            flex: 1;
            min-width: 100px;
            .update-title {
              font-size: 16px;
              font-weight: bold;
            }
            .update-desc {
              margin-top: 16px;
              width: 100%;
            }
          }
          .right-update {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 63px;
            height: 80px;
            .history {
              font-family: Alibaba PuHuiTi 2;
              font-size: 14px;
              font-weight: normal;
              color: #2882ff;
              cursor: pointer;
            }
            .desc-info {
              display: flex;
              flex-direction: column;
              align-items: end;
              gap: 5px;
              font-size: 14px;
              font-weight: normal;
              color: #a3a3a3;
            }
          }
        }
      }
      .develop-box {
        width: 260px;
        .dev {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 112px;
          .dev-title {
            font-family: Alibaba PuHuiTi 3;
            font-size: 16px;
            font-weight: bold;
            color: #171717;
          }
          .sign {
            display: flex;
            align-items: center;
            gap: 16px;
            justify-content: start;
            width: 100%;
            height: 72px;
            border-radius: 16px;
            box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding-left: 16px;
            .img {
              width: 40px;
              height: 40px;
            }
            .team {
              font-family: Alibaba PuHuiTi 3;
              font-size: 14px;
              font-weight: 600;
              color: #0f0b1c;
            }
          }
        }
        .tag-box {
          width: 100%;
          .title {
            margin-top: 32px;
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: bold;
            color: #171717;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            width: 100%;
          }
          .tag {
            width: fit-content;
            height: 26px;
            border-radius: 6px;
            padding: 4px 8px;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.08);
          }
        }
      }
    }
  }
}
</style>
