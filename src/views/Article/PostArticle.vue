<script setup lang="ts">
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import type { FormInstance, FormRules, UploadInstance, UploadRawFile } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import Vditor from '@/component/Vditor/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { callServerFunc, getGuid, MD5 } from '@ksware/micro-lib-web-temp'
import { fileHostUrl } from '@/views/home/index'
import { getArticleInfoById, getArticleTypeListAPI } from '@/api/home'

interface RuleForm {
  /** 标题 */
  title: string
  /** 所属专栏 */
  type: string
  /** 正文 */
  content: string
  /** 摘要 */
  abstract: string
  /** 标签 */
  tags: string[]
  /** 封面 */
  cover: string
}

const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  type: '',
  content: '',
  abstract: '',
  tags: [],
  cover: '',
})
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  type: [{ required: true, message: '此为必选项', trigger: 'change' }],
  content: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  cover: [{ required: true, message: '此为必填项', trigger: 'blur' }],
})
// 创建一个响应式变量用于存储图片的 Data URL
const imageUrl = ref('')

const active = ref(0)
/** 帖子详情 */
const articleInfo = ref<any>({})
/** 获取帖子详情 */
const getArticleInfo = async (id: string) => {
  const params = { PostsID: id }
  const data = await getArticleInfoById(params)
  articleInfo.value = data
  const { title, type, content, abstract, tag, cover } = articleInfo.value
  ruleForm.title = title
  ruleForm.type = type
  ruleForm.content = content
  ruleForm.abstract = abstract
  ruleForm.tags = tag
  ruleForm.cover = cover
  imageUrl.value = cover
}
/** pageTitle */
const pageTitle = computed(() => (articleInfo.value?.id ? '编辑' : '发布'))
const pageSubmitText = computed(() => (articleInfo.value?.id ? '修改发布' : '发布'))
function getRouteId() {
  const { id } = route.params
  if (id === MD5('add')) {
    return
  }
  getArticleInfo(id as string)
}
getRouteId()
const upload = ref<UploadInstance>()

/** 专栏板块 option */
const columnOptions = ref<any[]>([])
/** 获取专栏 */
const getHomeClassList = async () => {
  const { parentList, sonList } = await getArticleTypeListAPI()
  columnOptions.value = parentList.map(({ postsTypeId, postsTypeName }: any) => {
    // const children = sonList.filter((item: any) => item.pid === postsTypeId)
    const children = sonList
      .filter((item: any) => item.pid === postsTypeId)
      .map((item: any) => {
        return { value: item.postsTypeId, label: item.postsTypeName }
      })
    return { value: postsTypeId, label: postsTypeName, children }
  })
  // const findInteraction: any = homeNavClassList.find((item) => item.postsTypeName === '互动解答')
  // const findKnow = homeNavClassList.find((item) => item.postsTypeName === '知识分享')
  // interactionId.value = findInteraction.postsTypeId
  // knowledgeId.value = findKnow.postsTypeId
}
getHomeClassList()
const handleChange = (arr: any): void => {
  if (!Array.isArray(arr)) return
  const a = arr.at(-1)
  ruleForm.type = a
}

/** 上传文件前 */
const beforeAvatarUpload = (rawFile: any) => {
  const validTypes = ['image/png', 'image/jpeg']
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
  const type = file.name.split('.')[1]
  const params = { FileID: getGuid(), IsForum: true, FileType: '.' + type }
  const { data }: any = await callServerFunc('TRPADM', 'RPAUploadForumPic', params, { isUpload: true, file: file })
  const ServerFile = data.ImgUrl
  const url = fileHostUrl + ServerFile
  imageUrl.value = url.split('\\').join('/')
  ruleForm.cover = imageUrl.value
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
  upload.value?.clearFiles()
}

/** 取消 */
async function cancel(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  router.back()
}
/** 提交 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  const { id } = articleInfo.value
  await KMessageBox.confirm(`确认要${pageSubmitText.value}帖子吗?`, `${pageSubmitText.value}提示`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'success',
  })
  const { title, content, type, abstract, tags, cover } = ruleForm
  const params = {
    postsID: getGuid(),
    Title: title,
    Content: content,
    Type: type,
    Abstract: abstract,
    Cover: cover,
    Tags: tags.join(','),
  }
  if (!id) {
    // 发布
    await callServerFunc('TRPADM', 'RPAPublish', params)
  } else {
    params.postsID = id
    await callServerFunc('TRPADM', 'RPAEditPostsContent', params)
  }
  router.back()
}
</script>

<template>
  <div class="post-article-box">
    <div class="article-box djc">
      <div class="header-title">{{ pageTitle }}</div>
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
              <k-input
                v-model.trim="ruleForm.title"
                :placeholder="$t('forum.formTitle')"
                maxlength="100"
                show-word-limit
              />
            </k-form-item>
            <k-form-item label="板块/专栏" prop="type">
              <el-cascader
                v-model="ruleForm.type"
                :options="columnOptions"
                filterable
                style="width: 100%"
                @change="handleChange"
              />
            </k-form-item>
            <div class="hr"></div>
            <div class="form-title">正文</div>
            <k-form-item label="" prop="content">
              <div style="width: 100%; min-height: 300px">
                <Vditor v-model="ruleForm.content" :placeholder="$t('forum.formContent')" />
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
            <k-form-item label="文章封面" prop="cover">
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
              <k-button main @click="submitForm(ruleFormRef)" style="width: 100px; font-size: 16px; height: 30px">
                {{ pageSubmitText }}
              </k-button>
              <k-button @click="cancel(ruleFormRef)" style="width: 100px; font-size: 16px; height: 30px">
                取 消
              </k-button>
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
