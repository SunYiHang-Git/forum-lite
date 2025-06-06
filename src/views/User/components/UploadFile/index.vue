<script setup lang="ts">
import { useUser } from '@/store/modules/user'
import { fileHostUrl } from '@/views/home'
import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc } from '@ksware/micro-lib-web-temp'
import type { UploadRawFile } from 'element-plus'
import { computed, ref } from 'vue'
const { setUserInfo } = useUser()

type Props = {
  modelValue?: string
  /** 接收类型 */
  accept?: string[]
  /** 尺寸 */
  maxSize?: number
  /** 上传前校验类型 */
  validTypes?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  accept: () => ['jpg', 'png'],
  maxSize: 2, // 默认最大2MB
  validTypes: () => ['image/png', 'image/jpeg'],
})

const emits = defineEmits<{
  (e: 'update:modelValue', src: string): void
}>()

const acceptTypes = computed(() => {
  return props.accept.map((ext) => `.${ext}`).join(', ')
})
// http://192.168.104.182:8888/UserIcon/20DA62D450BA4236BD70E2A937268DB1.jpg
const imageUrl = ref(props.modelValue)
/** 上传文件前 */
const beforeAvatarUpload = (rawFile: any) => {
  if (!props.validTypes.includes(rawFile.type)) {
    const msg = `仅支持${acceptTypes.value.toUpperCase()}格式！`
    KMessage.error(msg)
    return false
  }
  // 检查文件大小是否超过2MB
  if (rawFile.size / 1024 / 1024 > props.maxSize) {
    KMessage.error(`文件大小不能超过${props.maxSize}MB！`)
    return false
  }
  return true
}

const httpRequestFile = async ({ file }: { file: UploadRawFile }) => {
  const type = file.name.split('.').pop()
  const params = { FileType: '.' + type }
  const { data }: any = await callServerFunc('TRPADM', 'RPAUploadIconLite', params, { isUpload: true, file: file })
  const ServerFile = data.UserIcon
  const url = fileHostUrl + ServerFile
  imageUrl.value = url.split('\\').join('/')
  emits('update:modelValue', imageUrl.value)
  setUserInfo({ avatar: imageUrl.value })
}
</script>

<template>
  <div class="upload-image-box">
    <k-upload
      :show-file-list="false"
      action="#"
      :accept="acceptTypes"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequestFile"
    >
      <template #trigger>
        <div class="uploadIcon dfc">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <IconAdd v-else :size="44" class="k-uploader__icon" />
        </div>
      </template>
    </k-upload>
  </div>
</template>

<style lang="scss" scoped>
.dfc {
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-image-box {
  width: 100%;
  height: 100%;
  :deep(.k-upload) {
    width: 100%;
    height: 100%;
    div {
      width: 100%;
      height: 100%;
      .uploadIcon {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .avatar {
          width: 100%;
          height: 100%;
        }
      }
      .el-upload__tip {
        display: none;
      }
    }
  }
}
</style>
