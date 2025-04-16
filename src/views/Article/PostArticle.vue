<script setup lang="ts">
import { KMessage } from '@ksware/ksw-ux'
import type { FormInstance, FormRules, UploadInstance, UploadRawFile } from 'element-plus'
import { reactive, ref } from 'vue'
import MarkDown from '@/component/MarkDown.vue'
import { useRouter } from 'vue-router'

interface RuleForm {
  /** 标题 */
  title: string
  /** 所属专栏 */
  column: string
  /** 正文 */
  text: string
  /** 摘要 */
  abstract: string
  /** 标签 */
  tags: string[]
}

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  column: '',
  text: '',
  abstract: '',
  tags: [],
})
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  column: [{ required: true, message: '此为必填项', trigger: 'change' }],
  text: [{ required: true, message: '此为必填项', trigger: 'change' }],
})
// 创建一个响应式变量用于存储图片的 Data URL
const imageUrl = ref('')

const active = ref(0)

const upload = ref<UploadInstance>()

/** 上传文件前 */
const beforeAvatarUpload = (rawFile: any) => {
  const validTypes = ['image/png', 'image/jpeg']
  console.log('rawFile.type--->', rawFile.type)
  if (!validTypes.includes(rawFile.type)) {
    KMessage.error('仅支持JPG,PNG格式！')
    return false
  }
  // 检查文件大小是否超过2MB
  if (rawFile.size / 1024 / 1024 > 1) {
    KMessage.error('文件大小不能超过1MB！')
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
    imageUrl.value = e.target.result
    console.log('imageUrl.value--->', imageUrl.value)
    let newData: any = {}
    // newData.file = arrayBufferToHex(arrayBuffer)
    // appUploadFile.value = newData
  }
  // reader.readAsArrayBuffer(file)
  reader.readAsDataURL(file)
}
const handleRemove = (_: UploadRawFile, uploadFiles: any[]) => {
  if (uploadFiles.length === 0) {
    appUploadFile.value = null
    active.value = 0
  }
}
/** 删除图片 */
async function delPicture() {
  imageUrl.value = ''
  upload.value!.clearFiles()
}

/** 取消 */
async function cancel(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  router.push('/')
}
/** 提交 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  console.log('ruleForm--->', ruleForm)
}
</script>

<template>
  <div class="post-article-box">
    <div class="article-box djc">
      <div class="header-title">发帖</div>
      <div class="main-box">
        <div class="form-box">
          <k-form
            ref="ruleFormRef"
            style="width: 100%"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
            status-icon
            label-position="top"
          >
            <div class="form-title">基础信息</div>
            <k-form-item label="标题" prop="title">
              <k-input v-model.trim="ruleForm.title" placeholder="请输入帖子标题" />
            </k-form-item>
            <k-form-item label="所属专栏" prop="column">
              <k-radio-group v-model="ruleForm.column">
                <k-radio v-for="i in 4" :key="i" border :value="`操作系统相关${i}`">操作系统相关{{ i }}</k-radio>
              </k-radio-group>
            </k-form-item>
            <div class="hr"></div>
            <div class="form-title">正文</div>
            <k-form-item label="">
              <div style="width: 100%; height: 300px; background-color: pink">
                <MarkDown />
              </div>
            </k-form-item>
            <div class="hr"></div>
            <k-form-item label="摘要">
              <k-input
                v-model.trim="ruleForm.abstract"
                type="textarea"
                :maxlength="150"
                show-word-limit
                :rows="5"
                placeholder="请输入摘要"
              />
            </k-form-item>
            <k-form-item label="标签">
              <k-select
                v-model="ruleForm.tags"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
              ></k-select>
            </k-form-item>
            <k-form-item label="文章封面">
              <div class="upload-box">
                <k-upload
                  v-if="!imageUrl"
                  ref="upload"
                  class="upload-demo"
                  drag
                  :accept="'.jpg,.jpeg,.png'"
                  :before-upload="beforeAvatarUpload"
                  :http-request="httpRequestFile"
                  :on-remove="handleRemove"
                >
                  <template #trigger>
                    <div class="upload-main">
                      <div class="icon">
                        <IconUpload :size="24" />
                      </div>
                      <div class="text">仅支持JPG,PNG格式(最大1MB)</div>
                    </div>
                  </template>
                </k-upload>
                <div v-if="imageUrl" class="show-photo">
                  <div class="del-img dfc">
                    <div class="icon dfc" @click="delPicture">
                      <IconDelete :size="30" color="#fff" />
                    </div>
                  </div>
                  <k-image style="width: 100%; height: 100%" :src="imageUrl" fit="fill"></k-image>
                </div>
              </div>
            </k-form-item>
            <k-form-item>
              <k-button main @click="submitForm(ruleFormRef)" style="width: 90px; font-size: 18px; height: 30px">
                发 布
              </k-button>
              <k-button @click="cancel(ruleFormRef)" style="width: 90px; font-size: 18px; height: 30px">取 消</k-button>
            </k-form-item>
          </k-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-article-box {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f9f9f9;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .djc {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .article-box {
    width: 100%;
    max-width: 1200px;
    width: 900px;
    padding: 40px 0;
    min-height: calc(100vh - 70px);
    .header-title {
      width: 100%;
      font-family: Alibaba PuHuiTi 3;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: #000000;
    }
    .main-box {
      flex: 1;
      margin-top: 24px;
      width: 100%;
      min-height: 100px;
      background-color: #fff;
      padding: 16px 32px;
      .form-box {
        width: 100%;
        min-height: 100px;
        .form-title {
          margin-top: 24px;
          margin-bottom: 16px;
          width: 100%;
          font-family: Alibaba PuHuiTi 3;
          font-size: 16px;
          font-weight: bold;
          line-height: 22px;
          color: #3d3d3d;
        }
        .hr {
          margin-top: 20px;
          margin-bottom: 30px;
          width: 100%;
          height: 2px;
          background-color: #eae8eb;
        }
        .upload-box {
          width: 380px;
          height: 200px;
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
              height: 200px;
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
          .show-photo {
            position: relative;
            width: 100%;
            height: 100%;
            .del-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              background-color: #000;
              z-index: 10;
              &:hover {
                opacity: 0.5;
              }
            }
            .icon {
              width: 32px;
              height: 32px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
