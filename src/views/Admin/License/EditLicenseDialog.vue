<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'

interface RuleForm {
  /** 用户昵称 */
  userName: string
  /** 手机号 */
  mobile: string
  /** 邮箱号 */
  eMail: string
  /** 授权时间 */
  licenseTime: string
}

const { params } = defineProps<{
  params: any
}>()
const dialogVisible = computed(() => params.visible)

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  userName: '',
  mobile: '',
  eMail: '',
  licenseTime: '',
})
const rules = reactive<FormRules<RuleForm>>({
  licenseTime: [{ required: true, message: '日期不能为空', trigger: 'change' }],
})

const disabledDate = (time: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return time.getTime() < today.getTime()
}

/** 初始化 */
async function initWindow() {
  if (!params?.data) return
  const data = params.data
  ruleForm.userName = data.userName
  ruleForm.mobile = data.mobile
  ruleForm.eMail = data.eMail
}
initWindow()

const handleClose = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
  params.cancel()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  params.confirm(ruleForm.licenseTime)
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
        <k-form-item label="用户昵称">
          <k-input v-model="ruleForm.userName" :disabled="true" />
        </k-form-item>
        <k-form-item label="手机号">
          <k-input v-model="ruleForm.mobile" :disabled="true" />
        </k-form-item>
        <k-form-item label="用户邮箱">
          <k-input v-model="ruleForm.eMail" :disabled="true" />
        </k-form-item>
        <k-form-item label="到期时间" prop="licenseTime">
          <k-date-picker
            v-model="ruleForm.licenseTime"
            type="date"
            clearable
            placeholder="选择日期"
            :disabled-date="disabledDate"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :shortcuts="[]"
            size="base"
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
