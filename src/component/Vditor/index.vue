<script setup lang="ts">
import Vditor from 'vditor'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { callServerFunc, getGuid } from '@ksware/micro-lib-web-temp'
import { fileHostUrl } from '@/views/home'
import 'vditor/src/assets/less/index.less'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    options?: any
    minHeight?: number
  }>(),
  {
    modelValue: '',
    placeholder: '请输入...',
    options: () => ({}),
  },
)
const vditorMinHeight = computed(() => {
  if (!props.minHeight) return 300 + 'px'
  if (typeof props.minHeight === 'string') return props.minHeight
  if (typeof props.minHeight === 'number') return props.minHeight + 'px'
})

const emit = defineEmits(['update:modelValue', 'upload-image'])

const vditor = ref<Vditor>()
const containerRef = ref<HTMLElement>()
const content = ref(props.modelValue)

/** 图片上传前校验 */
const validateImage = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png']
  const maxSize = 2 * 1024 * 1024 // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('仅支持 JPG/PNG 格式图片')
  }

  if (file.size > maxSize) {
    throw new Error('上传失败，图片大小请控制在 2M 以内!')
  }
}
// 新增图片上传服务方法
const uploadImageAPI = async (file: File): Promise<string> => {
  // 这里实现你的具体上传逻辑
  const formData = new FormData()
  formData.append('file', file)

  try {
    const params = { FileID: getGuid(), IsForum: true, FileType: '.' + file.name.split('.')[1] }
    const imgRes: any = await callServerFunc('TRPADM', 'RPAUploadForumPic', params, { isUpload: true, file })
    const ServerFile = imgRes.data.ImgUrl
    const imgUrl = fileHostUrl + ServerFile
    console.log('imgUrl--->', imgUrl)
    return imgUrl
    // const a = 'https://cdn.pixabay.com/photo/2022/02/13/17/22/cartoon-easter-bunny-7011655_1280.jpg'
    // return a
  } catch (error: any) {
    throw new Error(error.message || '图片上传失败')
  }
  // const file = files[0]
  //   const file = files[0]
  // const reader = new FileReader()
  // reader.onload = (e) => {
  //   vditor.value?.insertValue(`![${file.name}](${e.target?.result})`)
  // }
  // reader.readAsDataURL(file)
}
const uploadConfig: any = {
  accept: 'image/*',
  handler: async (files: any) => {
    if (!files?.[0]) return
    const file = files[0]
    try {
      // 执行校验
      validateImage(file)
      // 显示上传提示
      vditor.value?.tip('正在上传图片...', 2000)
      // 调用上传API
      const imageUrl = await uploadImageAPI(file)
      // 插入Markdown图片语法
      vditor.value?.insertValue(`![${file.name}](${imageUrl})`)
    } catch (error: any) {
      vditor.value?.tip(error.message, 3000)
    }
  },
}

/** 初始化 */
function initOption() {
  if (!containerRef.value) return
  vditor.value = new Vditor(containerRef.value, {
    height: '100%',
    width: '100%',
    theme: 'classic',
    icon: 'material',
    mode: 'wysiwyg', // 启用所见即所得模式
    markdown: {
      html: true, // 启用 HTML
    },
    preview: {
      mode: 'editor', // 编辑器内预览
      hljs: {
        style: 'github', // 代码高亮风格一致
      },
    },
    counter: {
      enable: true,
      type: 'text', // 统计类型与渲染一致
    },
    placeholder: props.placeholder,
    value: props.modelValue,
    cache: {
      enable: false,
    },
    toolbar: [
      {
        name: 'emoji',
        tip: '插入表情符号 😀',
      },
      {
        name: 'headings',
        tip: '标题格式 #',
      },
      {
        name: 'bold',
        tip: '加粗 **B**',
      },
      {
        name: 'italic',
        tip: '斜体 *I*',
      },
      {
        name: 'strike',
        tip: '删除线 ~~S~~',
      },
      '|', // 第一组分隔线
      {
        name: 'line',
        tip: '水平线 ---',
      },
      {
        name: 'quote',
        tip: '引用 >',
      },
      {
        name: 'list',
        tip: '无序列表 -',
      },
      {
        name: 'ordered-list',
        tip: '有序列表 1.',
      },
      {
        name: 'check',
        tip: '任务列表 [ ]',
      },
      {
        name: 'outdent',
        tip: '减少缩进 ←',
      },
      {
        name: 'indent',
        tip: '增加缩进 →',
      },
      '|', // 第二组分隔线
      {
        name: 'code',
        tip: '代码块 ```',
      },
      {
        name: 'inline-code',
        tip: '行内代码 `',
      },
      {
        name: 'insert-after',
        tip: '后方插入内容',
      },
      {
        name: 'insert-before',
        tip: '前方插入内容',
      },
      '|', // 第三组分隔线
      {
        name: 'undo',
        tip: '撤销 ⌘Z',
      },
      {
        name: 'redo',
        tip: '重做 ⌘Y',
      },
      {
        name: 'upload',
        tip: '上传图片 🖼️',
        className: 'custom-upload',
      },
      {
        name: 'link',
        tip: '插入链接 🔗',
      },
      {
        name: 'table',
        tip: '插入表格 ⌥⌘T',
      },
      // {
      //   name: 'record',
      //   tip: '语音录入 🎙️',
      //   click: () => {
      //     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //       // 处理音频流
      //     })
      //   }
      // },
      '|', // 第四组分隔线
      {
        name: 'edit-mode',
        tip: '切换编辑模式',
      },
      {
        name: 'both',
        tip: '分屏编辑',
      },
      {
        name: 'preview',
        tip: '预览模式',
      },
      {
        name: 'fullscreen',
        tip: '全屏模式 ⛶',
      },
      {
        name: 'outline',
        tip: '文档大纲',
      },
      '|', // 第五组分隔线
      {
        name: 'code-theme',
        tip: '代码主题',
      },
      {
        name: 'content-theme',
        tip: '内容主题',
      },
      {
        name: 'export',
        tip: '导出内容',
      },
      // {
      //   name: 'devtools',
      //   tip: '开发者工具'
      // },
      {
        name: 'info',
        tip: '版本信息',
      },
      {
        name: 'help',
        tip: '帮助文档',
      },
      {
        name: 'br',
        tip: '换行符',
      },
    ],
    upload: uploadConfig,
    image: { isPreview: true },
    resize: {
      enable: false,
    },
    after: () => {
      // 初始化后设置内容
      vditor.value?.setValue(props.modelValue)
    },
    input: (value: string) => {
      content.value = value
      emit('update:modelValue', value)
    },
    ...props.options,
  })
}
onMounted(() => {
  initOption()
})

// 监听外部内容变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== content.value) {
      content.value = newVal
      vditor.value?.setValue(newVal)
    }
  },
  {
    deep: true,
  },
)

// 销毁实例
onUnmounted(() => {
  vditor.value?.destroy()
})

/**
 * upload: { accept: 'image/*', // handler(files) { // // 这里实现你的上传逻辑 // const file = files[0] // const reader = new
 * FileReader() // reader.onload = (e) => { // vditor.value?.insertValue(`![${file.name}](${e.target?.result})`) // } //
 * reader.readAsDataURL(file) // } handler: async (files) => { const file = files[0] try { // 执行校验 validateImage(file)
 *
 *           // 触发上传事件
 *           emit('upload-image', file, {
 *             insert: (url: string) => {
 *               vditor.value?.insertValue(`![${file.name}](${url})`)
 *             },
 *             fail: (message: string) => {
 *               vditor.value?.tip(message)
 *             }
 *           })
 *         } catch (error: any) {
 *           vditor.value?.tip(error.message)
 *         }
 *       }
 *     }
 */
</script>

<template>
  <div class="edit-box">
    <div ref="containerRef" class="vditor-container" :style="{ minHeight: vditorMinHeight }"></div>
  </div>
</template>

<style lang="scss" scoped>
.edit-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .vditor-container {
    width: 100%;
    height: 100%;
  }
}
</style>
