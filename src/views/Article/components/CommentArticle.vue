<script setup lang="ts">
import { addReplyForArticleAPI, getAllReplyNumAPI, getArticleInfoById, getReplyListAPI } from '@/api/home'
import Vditor from '@/component/Vditor/index.vue'
import { getSplitStrName, handleNameSuffixShow } from '@/utils/tools'
import { KMessage } from '@ksware/ksw-ux'
import { nextTick, ref, watch } from 'vue'
import ReplyCard from '@/views/Article/components/ReplyCard.vue'

interface IProps {
  /** 当前文章详情 */
  articleId: string
  /** 帖子详情 */
  articleInfo: any
  /** 回复帖子总数 */
  articleReplyCount: number
  /** 触发事件 */
  sign: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  articleId: '',
  articleInfo: () => {},
  articleReplyCount: 0,
})

const emits = defineEmits<{
  (e: 'init'): void
  (e: 'getDataFinish'): void
}>()
/** 回复内容 */
const replyValueDialog = ref<string>('')
/** 回复 帖子 数据 */
const replyArticleList = ref<any[]>([])
/** 回复帖子的弹框的显示 */
const showReplyDialog = ref(false)
/** 弹框相关数据 */
const dialogParams = ref<any>({})
/** 记录 userName 重复的 userId */
const userNameIdRepeatList = ref<any[]>([])

function handleUserNameReply(item: any) {
  if (userNameIdRepeatList.value.includes(item.userId)) {
    const starName = getSplitStrName(item.userName)
    const endName = '#' + getSplitStrName(item.userName, '#', 1)
    item.userName = starName
    item.suffix = endName
  }
  if (userNameIdRepeatList.value.includes(item.replyPersonUserId)) {
    const starReply = getSplitStrName(item.replyPerson)
    const endReply = '#' + getSplitStrName(item.replyPerson, '#', 1)
    item.replyPerson = starReply
    item.replySuffix = endReply
  }
}
/** 获取帖子的回复数据 */
const getReplyData = async () => {
  // TODO 获取帖子回复数量问题
  const params = { PostsID: props.articleId, PageNum: '0', PageSize: '2000', iSort: 1 }
  const { firstList, secondList } = await getReplyListAPI(params)
  console.log('firstList--->', firstList)
  console.log('secondList--->', secondList)
  firstList.forEach((item: any) => {
    const arr = secondList.filter((v) => v.initialID === item.id)
    item.children = arr.map((v: any) => {
      const findItem = arr.find(({ id }: any) => id === v.pid)
      return { ...v, replyPerson: findItem?.userName ?? item.userName }
    })
  })
  userNameIdRepeatList.value = handleNameSuffixShow(firstList)
  console.log('userNameIdRepeatList.value--->', userNameIdRepeatList.value)
  firstList.forEach((item: any) => {
    handleUserNameReply(item)
    item.children?.forEach((child: any) => {
      handleUserNameReply(child)
    })
  })
  replyArticleList.value = firstList
  console.log('firstList--->', firstList)
  // 数据获取完成,通知父组件
  await nextTick()
  emits('getDataFinish')
}

/** 显示回复弹框 */
const replyShowDialog = (item: any) => {
  showReplyDialog.value = true
  dialogParams.value = {
    PostsID: item.postId,
    PID: item.id,
    InitialID: item.initialID || item.id,
    userName: item.userName,
  }
}
/** 弹窗取消 */
const dialogCancel = () => {
  showReplyDialog.value = false
  replyValueDialog.value = ''
}
/** 弹框回复帖子 */
const dialogReply = async () => {
  await nextTick()
  if (!replyValueDialog.value) {
    KMessage.warning('不能回复空内容!')
    return
  }
  showReplyDialog.value = false
  const { PostsID, PID, InitialID } = dialogParams.value
  const params = {
    PostsID,
    PID,
    InitialID,
    Content: replyValueDialog.value,
  }
  await addReplyForArticleAPI(params)
  dialogCancel()
  emits('init')
  getReplyData()
}

watch(
  () => props.sign,
  () => {
    getReplyData()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="comment-article">
    <div class="reply-num-box">{{ articleReplyCount }} 条回复</div>
    <div class="reply-list-box">
      <div class="lis-reply" v-for="item in replyArticleList" :key="item.id">
        <ReplyCard :item="item" :isAuthor="articleInfo.createUser === item.userId" @showDialog="replyShowDialog" />
      </div>
    </div>
  </div>
  <k-dialog v-model="showReplyDialog" :title="'回复: ' + dialogParams.userName" width="700">
    <div class="reply-dialog-box">
      <div class="reply-dialog-edit">
        <Vditor v-model="replyValueDialog" :placeholder="$t('forum.formContent')" />
      </div>
      <div class="btn-box">
        <k-button @click="dialogCancel">取 消</k-button>
        <k-button main @click="dialogReply">确 定</k-button>
      </div>
    </div>
  </k-dialog>
</template>

<style lang="scss" scoped>
.comment-article {
  width: 100%;
  height: 100%;
  .reply-num-box {
    width: 100%;
    height: 24px;

    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    color: #171717;
  }
  .reply-list-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 16px;
    margin-top: 24px;
    .lis-reply {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      gap: 14px;
      min-height: 112px;
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}

.reply-dialog-box {
  width: 100%;
  .reply-dialog-edit {
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
  }
  .btn-box {
    display: flex;
    justify-content: end;
    padding: 0 25px;
    gap: 20px;
    align-items: center;
    width: 100%;
    margin-top: 15px;
  }
}
</style>
