<script setup lang="ts">
import { ref } from 'vue'
import AvatarDefaultImg1 from '@/assets/images/avatar/avatar-default-1.jpg'
import AvatarDefaultImg2 from '@/assets/images/avatar/avatar-default-2.jpg'
import AvatarDefaultImg3 from '@/assets/images/avatar/avatar-default-3.jpg'
import AvatarDefaultImg4 from '@/assets/images/avatar/avatar-default-4.jpg'
import AvatarDefaultImg5 from '@/assets/images/avatar/avatar-default-5.jpg'
import AvatarDefaultImg6 from '@/assets/images/avatar/avatar-default-6.jpg'
import AvatarDefaultImg7 from '@/assets/images/avatar/avatar-default-7.jpg'
import AvatarDefaultImg8 from '@/assets/images/avatar/avatar-default-8.jpg'
import AvatarDefaultImg9 from '@/assets/images/avatar/avatar-default-9.jpg'
import { KMessage } from '@ksware/ksw-ux'
import type { UploadRawFile } from 'element-plus'
import { callServerFunc } from '@ksware/micro-lib-web-temp'
import { fileHostUrl } from '@/views/home'
import { useUser } from '@/store/modules/user'
const { setUserInfo } = useUser()

const { picture } = defineProps<{
  picture: string
}>()

const defaultPictures = [
  { index: 1, src: AvatarDefaultImg1 },
  { index: 2, src: AvatarDefaultImg2 },
  { index: 3, src: AvatarDefaultImg3 },
  { index: 4, src: AvatarDefaultImg4 },
  { index: 5, src: AvatarDefaultImg5 },
  { index: 6, src: AvatarDefaultImg6 },
  { index: 7, src: AvatarDefaultImg7 },
  { index: 8, src: AvatarDefaultImg8 },
  { index: 9, src: AvatarDefaultImg9 },
]
/** 临时存储选中的图片 */
const tempSelectImg = ref<any>({})
const imageUrl = ref(picture)

const dialogVisible = ref(false)
/** 打开选择头像弹框 */
const showDialogPicture = () => {
  dialogVisible.value = true
}
/** 取消弹框 */
const handleClose = () => {
  dialogVisible.value = false
  activeAvatarIndex.value = 0
}
/** 确定弹框按钮 */
const handleConfirm = () => {
  activeAvatarIndex.value = 0
  console.log('tempSelectImg.value--->', tempSelectImg.value)
}

const activeAvatarIndex = ref(0)
const handleSelectPicture = (index: number) => {
  activeAvatarIndex.value = index
  tempSelectImg.value = defaultPictures[index - 1]
}

const beforeAvatarUpload = (rawFile: any) => {
  if (!['image/png', 'image/jpeg'].includes(rawFile.type)) {
    const msg = `仅支持JPG,PNG格式！`
    KMessage.error(msg)
    return false
  }
  // 检查文件大小是否超过2MB
  if (rawFile.size / 1024 / 1024 > 5) {
    KMessage.error(`文件大小不能超过5MB！`)
    return false
  }
  return true
}

const httpRequestFile = async ({ file }: { file: UploadRawFile }) => {
  const type = file.name.split('.').pop()
  const params = { FileType: '.' + type }
  const { data }: any = await callServerFunc('TRPADM', 'RPAUploadIcon', params, { isUpload: true, file: file })
  const ServerFile = data.UserIcon
  const url = fileHostUrl + ServerFile
  imageUrl.value = url.split('\\').join('/')
  activeAvatarIndex.value = 0
  setUserInfo({ avatar: imageUrl.value })
}
</script>

<template>
  <div class="upload-avatar-box">
    <div class="img-box">
      <img :src="imageUrl" class="avatar-img" />
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
        <img :src="imageUrl" />
        <!-- <k-button @click="httpUploadAvatar">自定义上传</k-button> -->
        <k-upload
          action="#"
          :show-file-list="false"
          accept=".jpg,.png"
          :before-upload="beforeAvatarUpload"
          :http-request="httpRequestFile"
        >
          <template #trigger>
            <k-button>自定义上传</k-button>
          </template>
        </k-upload>
      </div>
      <div class="select-photo-box">
        <div
          class="grid-item-img"
          v-for="item in defaultPictures"
          :key="item.index"
          @click="handleSelectPicture(item.index)"
        >
          <img :src="item.src" />
          <div v-if="activeAvatarIndex === item.index" class="active-avatar-box">
            <IconStatusSuccess :size="30" color="#3B82F6" />
          </div>
        </div>
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
        position: relative;
        width: 92px;
        height: 90px;
        overflow: hidden;
        cursor: pointer;
        .active-avatar-box {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #fff;
          overflow: hidden;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
