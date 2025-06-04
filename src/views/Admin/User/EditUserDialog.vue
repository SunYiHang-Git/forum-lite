<script setup lang="ts">
import { cityList } from '@/utils/city'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import defaultAvatar from '@/assets/svg/default-avatar.svg'
import defaultImage from '@/assets/images/default.jpg'
import { fileHostUrl } from '@/views/home'
import { RPAErrCountAPI } from '@/api/admin/user'

interface RuleForm {
  /** 用户头衔 */
  userIcon: string
  /** 用户昵称 */
  fullName: string
  /** 用户地址 */
  city: string | string[]
  /** 用户签名 */
  signature: string
  /** 修改理由 */
  updateReason: string
  /** 用户ID */
  userId: string
  /** 错误次数 */
  errorCount: number
}

const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  userIcon: '',
  fullName: '',
  city: '',
  signature: '',
  updateReason: '',
  userId: '',
  errorCount: 0,
})
const rules = reactive<FormRules<RuleForm>>({
  fullName: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
  city: [{ required: true, message: '城市不能为空', trigger: 'change' }],
  updateReason: [
    { required: true, message: '修改理由不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 判断是否全是空白字符（包括空格、换行、制表符等）
        if (value && typeof value === 'string' && !/\S/.test(value)) {
          callback(new Error('修改理由不能全为空白字符'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
const props = {
  expandTrigger: 'hover' as const,
  value: 'label',
}

/** 初始化 */
async function initWindow() {
  if (!params?.data) return
  const data = params.data

  let cityArr: any = []
  if (data.city) {
    const arr = data.city.split('/')
    const findItem = cityList.find((item) => item.label === arr[0])
    if (findItem) {
      cityArr = arr
    } else {
      cityArr = ''
    }
  }
  ruleForm.userIcon = data.userIcon
  ruleForm.fullName = data.name
  ruleForm.city = cityArr
  ruleForm.signature = data.signature
  ruleForm.userId = data.id
  const res = await RPAErrCountAPI({ LoginID: data.id })
  ruleForm.errorCount = res.ErrorCount
}
initWindow()

/** 重置头像 */
const resetIcon = () => {
  const url = fileHostUrl + 'UserIcon/default.jpg'
  // const url = fileHostUrl + 'UserIcon\\default.jpg'
  ruleForm.userIcon = url
}
const handleClose = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
  params.cancel()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  params.confirm(ruleForm)
  handleClose()
}
</script>

<template>
  <k-dialog v-model="dialogVisible" width="800" class="info-dialog" :show-close="false">
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
        <div class="top-header">
          <k-form-item label="用户头像">
            <k-image style="width: 65px; height: 65px; border-radius: 50%" :src="ruleForm.userIcon" fit="fill">
              <template #error>
                <div class="image-error">
                  <k-image style="width: 65px; height: 65px" :src="defaultAvatar" fit="fill" />
                </div>
              </template>
            </k-image>
            <k-button class="resetAvatar" @click="resetIcon">重置头像</k-button>
          </k-form-item>
          <k-form-item label="错误次数">
            <span style="font-size: 15px">0</span>
            <k-button class="resetAvatar" :disabled="ruleForm.errorCount === 0">重置次数</k-button>
          </k-form-item>
        </div>
        <k-form-item label="用户昵称" prop="fullName">
          <k-input v-model="ruleForm.fullName" placeholder="请输入账号" />
        </k-form-item>
        <k-form-item label="用户地址" prop="city">
          <k-cascader
            v-model="ruleForm.city"
            placeholder="请选择地址..."
            :options="cityList"
            clearable
            filterable
            :props="props"
            style="width: 100%"
          />
        </k-form-item>
        <k-form-item label="用户签名">
          <k-input
            v-model="ruleForm.signature"
            type="textarea"
            :rows="5"
            maxlength="500"
            show-word-limit
            placeholder="这个人很懒，什么都没留下。"
          />
        </k-form-item>
        <k-form-item label="修改理由" prop="updateReason">
          <k-input
            v-model="ruleForm.updateReason"
            type="textarea"
            :rows="5"
            maxlength="500"
            show-word-limit
            placeholder="这个人很懒，什么都没留下。"
          />
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
    .top-header {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 16px;
      .image-error {
        width: 65px;
        height: 65px;
      }
      .resetAvatar {
        margin-left: 20px;
        border-radius: 20px;
        padding: 0 20px;
      }
    }
  }
}
</style>
