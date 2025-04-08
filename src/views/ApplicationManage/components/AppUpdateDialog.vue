<script setup lang="ts">
import { arrayBufferToHex } from '@/utils/download'
import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc } from '@ksware/micro-lib-web-temp'
import {
  genFileId,
  type FormInstance,
  type FormRules,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile,
  type UploadUserFile,
} from 'element-plus'
import { computed, reactive, ref } from 'vue'
interface RuleForm {
  version: string
  updateInfo: string
}
const { params } = defineProps<{
  params: any
}>()

const dialogVisible = computed(() => params.visible)
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  version: '',
  updateInfo: '',
})
const rules = reactive<FormRules<RuleForm>>({
  version: [
    {
      required: true,
      message: '此为必选项',
      trigger: 'blur',
    },
  ],
  updateInfo: [{ required: true, message: '此为必选项', trigger: 'blur' }],
})

/** 取消 */
const handleCancel = () => {
  params.cancel()
}
const active = ref(0)

const upload = ref<UploadInstance>()

/** 上传文件前 */
const beforeAvatarUpload = (rawFile: any) => {
  const fileExtension = rawFile.name.split('.').pop().toLowerCase()
  if (fileExtension !== 'db') {
    KMessage.error('文件后缀必须是.db格式！')
    return false
  }
  // 检查文件大小是否超过2MB
  if (rawFile.size / 1024 / 1024 > 2) {
    KMessage.error('文件大小不能超过2MB！')
    return false
  }
  upload.value!.clearFiles()
  return true
}
const appUploadFile = ref<any>(null)

const httpRequestFile = async ({ file }: { file: UploadRawFile }) => {
  upload.value!.handleStart(file)
  const reader = new FileReader()
  reader.onload = (e: any) => {
    const arrayBuffer = e.target.result
    let newData: any = {}
    newData.file = arrayBufferToHex(arrayBuffer)
    newData.Cover = true
    appUploadFile.value = newData
    //   callServerFunc('THawkeyeDM', 'UpLoadShopsApp', newData).then(() => {
    //     KMessage({
    //       type: 'success',
    //       message: '导入成功',
    //     })
    //   })
  }
  reader.readAsArrayBuffer(file)
}
const handleRemove = (_: UploadRawFile, uploadFiles: any[]) => {
  if (uploadFiles.length === 0) {
    appUploadFile.value = null
    active.value = 0
  }
}
const handlePrev = () => {
  if (active.value < 1) return
  active.value--
}
const next = () => {
  if (!appUploadFile.value) {
    KMessage.warning('请选择文件!')
    return
  }
  if (active.value > 2) return
  active.value++
}
const submit = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate()
  const data = {
    ...form,
    file: appUploadFile.value,
  }
  params?.submit(data)
}
</script>

<template>
  <k-dialog
    v-model="dialogVisible"
    width="650"
    title="更新应用"
    class="update-app"
    @close="handleCancel"
    :close-on-click-modal="false"
  >
    <div class="dialog-box">
      <k-steps capsule style="width: 100%" :active="active" :height="32">
        <k-step v-for="(item, index) in ['上传应用', '编辑信息']" :key="index" :title="item" />
      </k-steps>
      <div class="upload-box">
        <k-upload
          v-show="active === 0"
          ref="upload"
          class="upload-demo"
          drag
          :before-upload="beforeAvatarUpload"
          :http-request="httpRequestFile"
          :on-remove="handleRemove"
        >
          <template #trigger>
            <div class="upload-main">
              <div class="icon">
                <IconUpload :size="24" />
              </div>
              <div class="text">上传文件</div>
            </div>
          </template>
        </k-upload>
        <div v-show="active === 1" class="form-box">
          <k-form ref="ruleFormRef" :model="form" label-position="left" label-width="80" :rules="rules">
            <k-form-item label="版本号" prop="version">
              <k-input v-model="form.version" :maxlength="60" />
            </k-form-item>
            <k-form-item label="变更内容" prop="updateInfo">
              <k-input v-model="form.updateInfo" :rows="5" type="textarea" show-word-limit :maxlength="500" />
            </k-form-item>
          </k-form>
        </div>
      </div>
      <div class="btn-box">
        <k-button v-if="active === 0" secondary>取 消</k-button>
        <k-button v-if="active === 1" secondary @click="handlePrev">上一步</k-button>
        <k-button v-if="active === 0" main @click="next">下一步</k-button>
        <k-button v-if="active === 1" main @click="submit">保存</k-button>
      </div>
    </div>
  </k-dialog>
</template>

<style lang="scss" scoped>
.update-app {
  .dialog-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 24px;
    width: 100%;
    min-height: 100px;
    .upload-box {
      width: 100%;
      //   max-height: 210px;
      height: 210px;
      .k-upload {
        :deep(.el-upload) {
          padding: 0;
          .el-upload-dragger {
            padding: 0;
          }
        }
        .upload-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-self: center;
          gap: 10px;
          width: 100%;
          height: 180px;
          box-sizing: border-box;
          border: 1px dashed #d4d4d4;
          border-radius: 8px;
          .text {
            font-family: Alibaba PuHuiTi 3;
            font-size: 14px;
            color: #525252;
          }
        }
      }
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
    }
  }
}
</style>
