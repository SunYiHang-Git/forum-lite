<script setup lang="ts">
import type { IGoodDataType } from '@/types/goods'
import { KMessage } from '@ksware/ksw-ux'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { getClassifyListAPI, getTagsListAPI } from './data'
import { callServerFunc } from '@ksware/micro-lib-web-temp'

type RuleForm = Pick<IGoodDataType, 'name' | 'icon' | 'blurb' | 'funcDes'> & {
  classify?: string
  tags?: string[]
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
  tags: [],
  funcDes: '',
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '必须填写名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称为 2-20个字符', trigger: 'blur' },
  ],
})

/** 标签列表 */
const tagsListOptions = ref<{ label: string; value: string }[]>([])
/** 分类列表 */
const classifyListOptions = ref<{ label: string; value: string }[]>([])
/** 处理分类和标签 */
const handleTagOrClass = async () => {
  const arrC = await getClassifyListAPI()
  classifyListOptions.value = arrC.map((item) => {
    return { label: item.name, value: item.id }
  })
  const arrT = await getTagsListAPI()
  tagsListOptions.value = arrT.map((item) => {
    return { label: item.name, value: item.id }
  })
}
/** 回显编辑的数据 */
const handleEditData = () => {
  const { icon, name, blurb, classify, tags } = params.data
  form.icon = icon
  form.name = name
  form.blurb = blurb
  form.classify = classify.map((item: any) => item.id)[0]
  form.tags = tags.map((item: any) => item.id)
}
onMounted(async () => {
  await nextTick()
  await handleTagOrClass()
  handleEditData()
})

const imageUrl = ref<string>('')

/** 上传应用图标之前 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/bmp']

  if (!validImageTypes.includes(rawFile.type)) {
    KMessage.error('只能上传指定格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    // 判断文件大小是否超过2MB
    KMessage.error('文件大小不能超过2MB!')
    return false
  }

  return true
}
const isShowLoading = ref(false)
const loadingText = ref('正在上传文件...')
/** 自定义上传图标 */
const httpRequest = async ({ file }: { file: File }) => {
  imageUrl.value = ''
  console.log('file--->', file)
  let fileName: string = file.name
  const requestData = {
    /** 支持自定义存放到某个位置： 如：20240101/imgs */
    folderName: 'Data/files',
    /** 是否为公开的文件，就是不需要校验token，任何人都可以访问的数据， 这个数据会被系统定时清除，具体清除时间再系统设置中可以设置 */
    isPublic: true,
  }
  callServerFunc('demo', 'uploadFile', requestData, { isUpload: true, file, awaitTime: true, isShowLoading: false })
    .then(({ data }: any) => {
      const { filePath } = data as { filePath: string }
      console.log('filePath--->', filePath)
    })
    .catch(() => {})
    .finally(() => {
      isShowLoading.value = false
    })
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
            <el-option v-for="item in classifyListOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </k-form-item>
        <k-form-item label="标签">
          <el-select
            v-model="form.tags"
            placeholder="请选择标签"
            multiple
            filterable
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option v-for="item in tagsListOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </k-form-item>
        <k-form-item label="功能描述">
          <k-input
            v-model="form.funcDes"
            placeholder="请输入功能描述"
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
