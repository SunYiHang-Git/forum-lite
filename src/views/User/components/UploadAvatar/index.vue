<script setup lang="ts">
import { ref, watch } from 'vue'
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
import { fileHostUrl } from '@/views/home'
import { useUser } from '@/store/modules/user'
import { RPAGetUserIconAPI, RPAUploadIconAPI } from '@/api/user'
const { setUserInfo } = useUser()

const { picture } = defineProps<{
  picture: string
}>()
const defaultPictures = ref<any[]>([
  { index: 1, src: AvatarDefaultImg1 },
  { index: 2, src: AvatarDefaultImg2 },
  { index: 3, src: AvatarDefaultImg3 },
  { index: 4, src: AvatarDefaultImg4 },
  { index: 5, src: AvatarDefaultImg5 },
  { index: 6, src: AvatarDefaultImg6 },
  { index: 7, src: AvatarDefaultImg7 },
  { index: 8, src: AvatarDefaultImg8 },
  { index: 9, src: AvatarDefaultImg9 },
])
/** 选中图片的index */
const activeAvatarIndex = ref(0)
/** 获取默认头像 */
const getDefaultAvatarList = async () => {
  const list = await RPAGetUserIconAPI()
  defaultPictures.value = list.map((item: string, index: number) => {
    return { index: index + 1, src: fileHostUrl + item }
  })
  const findItem = defaultPictures.value.find((item) => item.src === picture)
  if (!findItem) return
  activeAvatarIndex.value = findItem.index
}

/** 临时存储选中的图片 */
const tempSelectImg = ref<any>({})
const imageUrl = ref(picture)

const dialogVisible = ref(false)
/** 打开选择头像弹框 */
const showDialogPicture = () => {
  dialogVisible.value = true
  getDefaultAvatarList()
}
/** 取消弹框 */
const handleClose = () => {
  dialogVisible.value = false
  activeAvatarIndex.value = 0
}
/** 确定弹框按钮 */
const handleConfirm = async () => {
  activeAvatarIndex.value = 0
  const { src } = tempSelectImg.value
  if (!src) {
    handleClose()
    return
  }
  const url = src.replace(fileHostUrl, '')
  const params = { FileType: '.jpg', IsLite: true, Icon: url }
  await RPAUploadIconAPI(params, {})
  setUserInfo({ avatar: src })
  handleClose()
  KMessage.success('修改头像成功!')
}

/** 切换/选择图片 */
const handleSelectPicture = (index: number) => {
  activeAvatarIndex.value = index
  const findItem = defaultPictures.value.find((item) => item.index === index)
  if (!findItem) return
  tempSelectImg.value = findItem
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
  const params = { FileType: '.' + type, IsLite: false }
  const data = await RPAUploadIconAPI(params, { isUpload: true, file: file })
  const ServerFile = data.UserIcon
  const url = fileHostUrl + ServerFile
  imageUrl.value = url.split('\\').join('/')
  setUserInfo({ avatar: imageUrl.value })
  KMessage.success('修改头像成功!')
  activeAvatarIndex.value = 0
  tempSelectImg.value = {}
}

watch(
  () => picture,
  () => {
    imageUrl.value = picture
  },
)
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
