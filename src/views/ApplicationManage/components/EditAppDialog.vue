<script setup lang="ts">
import type { IGoodDataType } from '@/types/goods'
import { KMessage } from '@ksware/ksw-ux'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { computed, reactive, ref } from 'vue'

type RuleForm = Pick<IGoodDataType, 'name' | 'icon' | 'blurb' | 'instructions'> & {
  classify?: string
  tag?: string
}
const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  icon: '',
  name: '',
  blurb: '',
  classify: '',
  tag: '',
  instructions: '',
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '必须填写名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称为 2-20个字符', trigger: 'blur' },
  ],
})

const imageUrl = ref<string>('')

/** 上传应用图标之前 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   KMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   KMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}

/** 自定义上传图标 */
const httpRequest = async ({ file }: { file: File }) => {
  imageUrl.value = ''
  console.log('file--->', file)
}

/** 取消 */
const handleCancel = (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
  params.cancel()
}

/** 确定 */
const submit = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return
  await ruleFormRef.validate()
  params.submit(form)
}
</script>

<template>
  <k-dialog
    :model-value="dialogVisible"
    width="600"
    title="审核应用"
    class="edit-app-dialog"
    @close="handleCancel(ruleFormRef)"
    :close-on-click-modal="false"
  >
    <div class="content-box">
      <k-form ref="ruleFormRef" :model="form" label-position="left" label-width="100" :rules="rules">
        <k-form-item label="应用图标">
          <div class="form-item-upload">
            <k-upload
              class="k-avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="httpRequest"
            >
              <template #trigger>
                <div class="trigger-box">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <IconAdd :size="14" class="k-uploader__icon" />
                </div>
              </template>
            </k-upload>
            <div class="k-upload__tip">JPEG/PNG/SVG/BMP 格式，2 MB 以内，大于 240*240 px</div>
          </div>
        </k-form-item>
        <k-form-item label="名称" prop="name">
          <k-input v-model="form.name" placeholder="请输入名称" />
        </k-form-item>
        <k-form-item label="简介">
          <k-input v-model="form.blurb" show-word-limit :maxlength="50" placeholder="请输入应用简介" />
        </k-form-item>
        <k-form-item label="分类">
          <el-select v-model="form.classify" placeholder="请选择分类">
            <el-option label="Zone one" value="shanghai" />
          </el-select>
        </k-form-item>
        <k-form-item label="标签">
          <el-select v-model="form.tag" placeholder="请选择标签">
            <el-option label="Zone one" value="shanghai" />
          </el-select>
        </k-form-item>
        <k-form-item label="使用说明">
          <k-input
            v-model="form.instructions"
            placeholder="请输入使用说明"
            :rows="5"
            type="textarea"
            show-word-limit
            :maxlength="500"
          />
        </k-form-item>
      </k-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="handleCancel(ruleFormRef)">取消</k-button>
        <k-button main @click="submit(ruleFormRef)">确定</k-button>
      </div>
    </template>
  </k-dialog>
</template>

<style lang="scss" scoped>
.content-box {
  width: 100%;
  padding: 15px;
  .k-form-item {
    align-items: start;
  }
  .k-avatar-uploader {
    width: 50px;
    height: 50px;
    display: block;
    border: 1px dashed rgba(128, 128, 128, 0.5);
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      border-color: rgb(var(--k-blue-rgb-500));
      color: rgb(var(--k-blue-rgb-500));
    }
    .trigger-box {
      width: 50px;
      height: 50px;
      position: relative;
    }
    .k-uploader__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .form-item-upload {
    .k-upload__tip {
      font-size: 12px;
      font-weight: normal;
      color: #afabb3;
    }
  }
}
</style>
