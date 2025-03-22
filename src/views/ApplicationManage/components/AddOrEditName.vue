<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { computed, reactive, ref } from 'vue'
export type IFormData<T extends Record<string, any> = Record<string, any>> = T
export type IFormRenderType<T extends Record<string, any> = Record<string, any>> = {
  /** label 名称 */
  name: string
  /** 字段键名 */
  field: keyof IFormData<T>
  /** 渲染类型 */
  type: 'input' | 'select'
  /** 提示文字 */
  placeholder?: string
  /** 选择项,类型为 select 时必填 */
  options?: { label: string; value: string }[]
}

// 辅助类型：从 IFormRenderType[] 中提取所有的 field 形成联合类型
type ExtractFields<T extends IFormRenderType<any>[]> = T[number]['field']

export type IDialogParamsType<T extends Record<string, any>, K extends IFormRenderType<T>[]> = {
  /** 控制弹窗显示 */
  visible: boolean
  /** form 数据 */
  formData: IFormData<T>
  /** 弹窗名称 */
  title: string
  /** 渲染 form 表单组件 */
  formRenderData: K
  /** 校验规则 */
  rules?: Partial<Record<ExtractFields<K>, any[]>>
  /** 取消 */
  cancel: () => void
  /** 确定 */
  submit?: (data: IFormData<T>) => void
}

const { params } = defineProps<{
  params: IDialogParamsType<IFormData, IFormRenderType<IFormData>[]>
}>()

const ruleFormRef = ref<FormInstance>()
const dialogVisible = computed(() => params.visible)
const form = reactive({
  ...params.formData,
})
const rules = computed(() => params.rules ?? {})

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
  params.submit?.(form)
}
</script>

<template>
  <k-dialog
    :model-value="dialogVisible"
    width="600"
    :title="params.title"
    class="add-edit-name"
    @close="handleCancel(ruleFormRef)"
    :close-on-click-modal="false"
  >
    <k-form ref="ruleFormRef" :model="form" label-position="left" label-width="100" :rules="rules">
      <k-form-item v-for="(item, index) in params.formRenderData" :key="index" :label="item.name" :prop="item.field">
        <!-- input -->
        <k-input v-if="item.type === 'input'" v-model="form[item.field]" :placeholder="item.placeholder" />
        <!-- select -->
        <k-select v-if="item.type === 'select'" v-model="form[item.field]" :placeholder="item.placeholder">
          <k-option v-for="(option, i) in item.options" :key="i" :label="option.label" :value="option.value" />
        </k-select>
      </k-form-item>
    </k-form>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="handleCancel(ruleFormRef)">取消</k-button>
        <k-button main @click="submit(ruleFormRef)">确定</k-button>
      </div>
    </template>
  </k-dialog>
</template>

<style lang="scss" scoped>
.add-edit-name {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
</style>
