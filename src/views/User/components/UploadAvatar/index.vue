<script setup lang="ts">
import { ref } from 'vue'

const { picture } = defineProps<{
  picture: string
}>()

const defaultPictures = [
  { index: 1, src: '' },
  { index: 2, src: '' },
  { index: 3, src: '' },
  { index: 4, src: '' },
  { index: 5, src: '' },
  { index: 6, src: '' },
  { index: 7, src: '' },
  { index: 8, src: '' },
  { index: 9, src: '' },
]

const dialogVisible = ref(false)
/** 打开选择头像弹框 */
const showDialogPicture = () => {
  console.log('picture--->', picture)
  dialogVisible.value = true
}
/** 取消弹框 */
const handleClose = () => {
  dialogVisible.value = false
}
/** 确定弹框按钮 */
const handleConfirm = () => {
  //
}
</script>

<template>
  <div class="upload-avatar-box">
    <div class="img-box">
      <img :src="picture" class="avatar-img" />
    </div>
    <div class="btn-box" @click="showDialogPicture">点击修改</div>
  </div>
  <!-- 选择图片弹框 -->
  <k-dialog v-model="dialogVisible" title="Tips" width="550" :show-close="false">
    <template #header>
      <div class="dialog-header">
        更换头像
        <IconClose style="cursor: pointer" @click="handleClose" />
      </div>
    </template>
    <div class="dialog-main-box">
      <div class="user-box">
        <img :src="picture" />
        <k-button>自定义上传</k-button>
      </div>
      <div class="select-photo-box">
        <div class="grid-item-img" v-for="item in defaultPictures" :key="item.index">{{ item.index }}</div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="handleClose">取消</k-button>
        <k-button type="primary" main @click="handleConfirm">确定</k-button>
      </div>
    </template>
  </k-dialog>
</template>

<style lang="scss" scoped>
.upload-avatar-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .img-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .btn-box {
    height: 22px;
    width: fit-content;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    color: #0f0b1c;
    cursor: pointer;
  }
}
.k-dialog {
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 24px;
  }
  .dialog-main-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 350px;
    .user-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      justify-content: start;
      width: 130px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .select-photo-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      width: 330px;
      height: 330px;
      border-radius: 16px;
      background-color: #f9fafb;
      justify-items: center; /* 水平居中对齐所有网格项 */
      align-items: center;
      .grid-item-img {
        width: 92px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        background-color: pink;
        cursor: pointer;
      }
    }
  }
}
</style>
