<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
const { params } = defineProps<{
  params: any
}>()
interface RuleForm {
  auditType: 1 | 2
  desc: string
}
const dialogVisible = computed(() => params.visible)
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  auditType: 1,
  desc: '',
})
const rules = reactive<FormRules<RuleForm>>({
  auditType: [
    {
      required: true,
      message: '此为必选项',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '必须填写备注', trigger: 'blur' }],
})

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
    v-model="dialogVisible"
    width="500"
    title="审核应用"
    class="audit-dialog"
    @close="handleCancel(ruleFormRef)"
    :close-on-click-modal="false"
  >
    <div class="content-box">
      <k-form ref="ruleFormRef" :model="form" label-position="left" label-width="100" :rules="rules">
        <k-form-item label="审核" prop="auditType">
          <k-radio-group v-model="form.auditType">
            <k-radio :value="1">通过</k-radio>
            <!-- <k-radio :value="2">不通过</k-radio> -->
          </k-radio-group>
        </k-form-item>
        <k-form-item label="备注" prop="desc">
          <k-input v-model="form.desc" :rows="5" type="textarea" show-word-limit :maxlength="500" />
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
  height: 300px;
  padding: 20px;
  .k-form-item {
    align-items: start;
  }
}
</style>
