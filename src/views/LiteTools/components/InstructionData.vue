<script setup lang="ts">
import type { DataType } from '../liteData'

interface Props {
  data: DataType
}
const { data } = defineProps<Props>()

/** 取第一个字 */
function getFirstChar(str: string): string {
  if (str.length === 0) {
    return ''
  }
  const t = str.charAt(0)
  return t.toUpperCase()
}
/** 处理数字渲染 */
function formatNumber(num: number): string {
  if (num < 9999) {
    return num.toString()
  }
  if (num < 999999) {
    return (num / 1000).toFixed(2) + 'k'
  }
  if (num < 99999999) {
    return (num / 10000).toFixed(2) + 'w'
  }
  return (num / 10000000).toFixed(2) + 'kw'
}
</script>

<template>
  <div class="instruction-data">
    <div class="box">
      <div class="title">
        <div class="name">{{ data.instructionName }}</div>
        <div class="exact-match">{{ data.systemVersion }}</div>
      </div>
      <div class="desc">
        {{ data.instructionDesc }}
      </div>
      <div class="tags">
        <div class="tag" v-for="(tag, index) in data.tags" :key="index">{{ tag }}</div>
      </div>
      <div class="footer">
        <div class="user">
          <div class="avatar">
            <img v-if="data.avatar" :src="data.avatar" alt="" srcset="" style="width: 100%; height: 100%" />
            <div v-else class="photo">{{ getFirstChar(data.lastUploadUser) }}</div>
          </div>
          <div class="username">{{ data.lastUploadUser }}</div>
        </div>
        <div class="info">
          <div class="version">版本号：{{ data.version }}</div>
          <div class="updateTime">更新时间：{{ data.updateTime }}</div>
        </div>
      </div>
    </div>
    <div class="download">
      <IconDownload />
      <div class="num">{{ formatNumber(data.download) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.instruction-data {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #c4c4c4b7;
  .download {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    .num {
      font-size: 16px;
    }
  }
  .box {
    flex: 1;
  }
  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    height: 26px;
    font-size: 18px;
    font-weight: 500;
    .name {
      height: 26px;
      line-height: 26px;
      max-width: 500px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .exact-match {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      padding: 0 5px;
      background-color: #efe7fc;
      border-radius: 4px;
    }
  }
  .desc {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 控制显示的最大行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all; /* 确保长单词或URL能被断开换行 */
    color: #8a959a;
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
  .footer {
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 10px;
    .user {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
      max-width: 200px;
      min-width: 100px;
      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        border-radius: 10px;
        overflow: hidden;
        .photo {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #457af7;
        }
      }
      .username {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .info {
      flex: 1;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      overflow: hidden;
    }
  }
}
</style>
