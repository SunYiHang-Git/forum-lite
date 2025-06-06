<script setup lang="ts">
import { RPAGetAllPostsTypeLiteAPI } from '@/api/admin/group'
import { buildTree } from '@/utils/format'
import type { FormInstance, FormRules, InputInstance } from 'element-plus'
import { computed, nextTick, reactive, ref } from 'vue'
interface RuleForm {
  /** 标题 */
  title: string
  /** 类型 */
  type: string
  /** 类型名称 */
  typeName: string
  /** 精贴 */
  fine: number
  /** 置顶 */
  top: number
  /** 标签 */
  tagList: string[]
}

const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)

const inputTagName = ref('')
const inputTagVisible = ref(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  type: '',
  typeName: '',
  fine: 0,
  top: 0,
  tagList: [],
})
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    {
      pattern: /\S/,
      message: '必须包含非空白字符',
      trigger: 'blur',
    },
  ],
})

const cascaderProps = { label: 'name', value: 'id' }

const postTypeList = ref<any[]>([])
/** 获取帖子类型 */
const getPosyType = async () => {
  const rows = await RPAGetAllPostsTypeLiteAPI({})
  postTypeList.value = rows
}

/** 初始化 */
async function initWindow() {
  if (!params?.data) return
  const data = params.data
  ruleForm.title = data.title
  ruleForm.type = data.tid
  ruleForm.fine = data.fine ? 1 : 0
  ruleForm.top = data.top ? 1 : 0
  ruleForm.tagList = data.tag?.split(',').filter(Boolean)
  getPosyType()
}
initWindow()

const handleClose = () => {
  params.cancel()
}

const handleTagClose = (tag: string) => {
  ruleForm.tagList.splice(ruleForm.tagList.indexOf(tag), 1)
}
const handleTagInputConfirm = () => {
  if (inputTagName.value) {
    ruleForm.tagList.push(inputTagName.value)
  }
  inputTagVisible.value = false
  inputTagName.value = ''
}
const InputRef = ref<InputInstance>()
const showTagInput = async () => {
  inputTagVisible.value = true
  await nextTick()
  InputRef.value!.input!.focus()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  ruleForm.typeName = postTypeList.value.find((item) => item.id === ruleForm.type.at(-1))?.name ?? ''
  params.confirm(ruleForm)
}
</script>

<template>
  <k-dialog v-model="dialogVisible" width="600" class="info-dialog" :show-close="false">
    <template #header>
      <div class="my-header">
        <div class="dialog-title">{{ params.title }}</div>
        <k-button @click="handleClose" text color="#484848">
          <IconClose :size="20" />
        </k-button>
      </div>
    </template>
    <div class="form-box">
      <k-form
        ref="ruleFormRef"
        style="max-width: 100%"
        label-width="100"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <k-form-item label="标题">
          <k-input v-model="ruleForm.title" style="width: 100%" />
        </k-form-item>
        <k-form-item label="类型">
          <k-cascader
            v-model="ruleForm.type"
            :options="buildTree(postTypeList)"
            :props="cascaderProps"
            style="width: 100%"
          />
        </k-form-item>
        <k-form-item label="精帖">
          <k-radio-group v-model="ruleForm.fine">
            <k-radio :value="1">是</k-radio>
            <k-radio :value="0">否</k-radio>
          </k-radio-group>
        </k-form-item>
        <k-form-item label="置顶">
          <k-radio-group v-model="ruleForm.top">
            <k-radio :value="1">是</k-radio>
            <k-radio :value="0">否</k-radio>
          </k-radio-group>
        </k-form-item>
        <k-form-item label="标签">
          <div class="tagList-box">
            <k-tag
              v-for="tag in ruleForm.tagList"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)"
            >
              {{ tag }}
            </k-tag>
            <k-input
              v-if="inputTagVisible"
              ref="InputRef"
              v-model="inputTagName"
              style="width: 100px"
              :maxlength="6"
              size="sm"
              @keyup.enter="handleTagInputConfirm"
              @blur="handleTagInputConfirm"
            />
            <k-button v-else class="button-new-tag" size="sm" @click="showTagInput">+ 标签</k-button>
          </div>
        </k-form-item>
        <k-form-item>
          <k-row style="display: flex; justify-content: end; width: 100%; padding-right: 25px">
            <K-button main @click="submitForm(ruleFormRef)">确定</K-button>
            <K-button @click="handleClose">取消</K-button>
          </k-row>
        </k-form-item>
      </k-form>
    </div>
  </k-dialog>
</template>

<style lang="scss" scoped>
.info-dialog {
  .my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dialog-title {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      color: #171717;
    }
  }
  .form-box {
    .tagList-box {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      width: 100%;
    }
  }
}
</style>
