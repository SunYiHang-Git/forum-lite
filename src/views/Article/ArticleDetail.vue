<script setup lang="ts">
import {
  addReplyForArticleAPI,
  deleteArticleByIdAPI,
  getAllReplyNumAPI,
  getArticleInfoById,
  getReplyListAPI,
  setArticleAuditAPI,
  setArticleMenuStatusAPI,
  setCollectArticleAPI,
} from '@/api/home'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Vditor from '@/component/Vditor/index.vue'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import RightHotCard from '@/views/Article/RightHotCard.vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import { convertMarkdownToHtml } from '@/utils/format'
import { useUser } from '@/store/modules/user'
import CommentArticle from '@/views/Article/components/CommentArticle.vue'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUser())

const router = useRouter()

const replyValue = ref<string>('')

const route = useRoute()

const ArticleId = ref('')
/** 消息中心-评论id */
const commentId = ref('')

/** 帖子详情 */
const articleInfo = ref<any>({})

/** 帖子总数 */
const articleAllNum = ref(0)

/** 获取帖子详情 */
const getArticleInfo = async (id: string) => {
  const params = { PostsID: id }
  articleAllNum.value = await getAllReplyNumAPI(params)
  const data = await getArticleInfoById(params)
  articleInfo.value = data
}
/** 获取传入 ID */
function getRouteId() {
  const { params, query }: any = route
  if (params?.id) {
    // 常规获取详情请
    ArticleId.value = params.id
  } else if (query?.postId) {
    // 消息中心跳转
    ArticleId.value = query.postId
    commentId.value = query.commentId
  }
}
getRouteId()

/** 获取评论完成 */
const getDataFinish = async () => {
  if (!commentId.value) return
  // TODO 拿到评论 Id,将要跳转置顶位置
  await nextTick()
  setTimeout(() => {
    const dom = document.getElementById(commentId.value)
    dom && dom.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (dom) {
      dom.style.backgroundColor = 'rgba(9,9,9,.1)'
      setTimeout(() => {
        dom.style.backgroundColor = ''
      }, 1000)
    }
  }, 1000)
}

const dropDownItemList = ref<any[]>([])
/** 初始化下拉菜单 */
function initDropDown() {
  const { isAdminByUser, userInfo } = useUser()
  const arr = [
    {
      name: '编辑',
      icon: 'IconEdit',
      command: 'edit',
    },
    {
      name: articleInfo.value.isFine ? '取消精选' : '精选',
      icon: 'IconJinghuaColor',
      command: 'essence',
    },
    {
      name: articleInfo.value.isTop ? '取消置顶' : '置顶',
      icon: 'IconSortTop',
      command: 'top',
    },
    {
      name: '锁定',
      icon: 'IconLocked',
      command: 'lock',
    },
    {
      name: '删除',
      icon: 'IconDelete',
      command: 'delete',
    },
  ]
  const isAuthor = articleInfo.value.createUser === userInfo.loginId

  if (isAdminByUser()) {
    // 是管理员
    dropDownItemList.value = arr
  } else if (isAuthor) {
    // 不是管理员,是作者,可以编辑
    dropDownItemList.value = [
      {
        name: '编辑',
        icon: 'IconEdit',
        command: 'edit',
      },
    ]
  }
}
const signRefresh = ref(true)
async function initWindow() {
  await getArticleInfo(ArticleId.value)
  initDropDown()
}
initWindow()
/** 去评论的位置 */
const handleToBottom = () => {
  const { scrollHeight } = document.documentElement
  window.scrollTo({
    top: scrollHeight, // 滚动条总高度
    left: 0,
    behavior: 'smooth',
  })
}

/** 评论 */
const addReply = async () => {
  if (!userInfo.value.loginId) {
    KMessage.warning('请先登录!')
    return
  }
  await nextTick()
  if (!replyValue.value) {
    KMessage.warning('不能发布空内容!')
    return
  }
  const params = { Content: replyValue.value, PostsID: ArticleId.value }
  await addReplyForArticleAPI(params)
  replyValue.value = ''
  signRefresh.value = !signRefresh.value
  await initWindow()
}

/** 显示删除原因弹窗 */
const showDeleteDialog = ref(false)
/** 删除原因 */
const delReasonValue = ref('')

/** 收藏/取消收藏帖子 */
const handleCollect = async () => {
  const { isCollect, id } = articleInfo.value
  await KMessageBox.confirm(`是否确定要${isCollect ? '取消' : ''}收藏?`, `${isCollect ? '取消' : ''}收藏`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const collectValue = isCollect ? 0 : 1
  const params = { Value: collectValue, PostsID: id }
  await setCollectArticleAPI(params)
  articleInfo.value.isCollect = collectValue
  articleInfo.value.collectNum = articleInfo.value.collectNum + (collectValue ? 1 : -1)
}

/** 置顶 */
const onTop = async () => {
  const { isTop, id } = articleInfo.value
  const topValue = isTop ? 0 : 1
  await KMessageBox.confirm(`是否确定要${topValue ? '' : '取消'}置顶?`, `${topValue ? '' : '取消'}置顶`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const params = { PostsID: id, Field: 'IsTop', Value: topValue }
  await setArticleMenuStatusAPI(params)
  articleInfo.value.isTop = topValue
}

/** 生精 */
const onEssence = async () => {
  const { isFine, id } = articleInfo.value
  const fineValue = isFine ? 0 : 1
  await KMessageBox.confirm(`是否确定要${fineValue ? '' : '取消'}升精?`, `${fineValue ? '' : '取消'}升精`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const params = { PostsID: id, Field: 'IsFine', Value: fineValue }
  await setArticleMenuStatusAPI(params)
  articleInfo.value.isFine = fineValue
}

/** 锁定 */
const onAuditArticle = async () => {
  await KMessageBox.confirm(`是否确定要锁定该帖子?`, `锁定提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await setArticleAuditAPI({ PostsID: articleInfo.value.id })
}

/** 删除帖子 */
const showDelDialog = async () => {
  await KMessageBox.confirm(`是否确定要删除该帖子?`, `删除提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  showDeleteDialog.value = true
}
/** 取消删除 */
const cancelDelArticle = () => {
  showDeleteDialog.value = false
  delReasonValue.value = ''
}
/*  确认删除帖子**/
const confirmDelArticle = async () => {
  const { id } = articleInfo.value
  const params = { PostsID: id, Reason: delReasonValue.value, SyncData: false }
  await deleteArticleByIdAPI(params)
  cancelDelArticle()
  router.go(-1)
}

/** 去编辑页面 */
const goEditPage = () => {
  router.push(`/article/edit/${articleInfo.value.id}`)
}
const handleCommand = (command: string) => {
  switch (command) {
    case 'top':
      onTop()
      return
    case 'essence':
      onEssence()
      return
    case 'lock':
      onAuditArticle()
      return
    case 'delete':
      showDelDialog()
      return
    case 'edit':
      goEditPage()
      return
    default:
      return
  }
}

const goTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
const styleDropdownItem = {
  width: '120px',
}

const styleTemplateDiv = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
}
</script>

<template>
  <div class="article-detail">
    <div class="detail-box">
      <div class="left">
        <div v-if="userInfo.loginId" class="flex-left">
          <div class="flex-top">
            <div class="collect-box">
              <k-badge @click="handleCollect" :value="articleInfo.collectNum" type="info" class="item dfc">
                <IconStar v-if="articleInfo.isCollect === 0" :size="26" />
                <IconStarFill v-if="articleInfo.isCollect === 1" color="#FF8900" :size="26" />
              </k-badge>
            </div>
            <div class="reply-box">
              <k-badge @click="handleToBottom" :value="articleAllNum" type="info" class="item dfc">
                <IconMessageOne :size="26" />
              </k-badge>
            </div>
            <k-dropdown
              v-if="dropDownItemList.length > 1"
              placement="left-start"
              trigger="click"
              @command="handleCommand"
            >
              <template #title>
                <div class="more-box">
                  <IconMore
                    :size="26"
                    style="
                      width: 42px;
                      height: 42px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-color: #fff;
                    "
                  />
                </div>
              </template>
              <template #default>
                <k-dropdown-item
                  v-for="item in dropDownItemList"
                  :key="item.command"
                  :style="styleDropdownItem"
                  :command="item.command"
                >
                  <template #default>
                    <div :style="styleTemplateDiv">
                      <component :is="item.icon" />
                      <span style="width: 80px">{{ item.name }}</span>
                    </div>
                  </template>
                </k-dropdown-item>
              </template>
            </k-dropdown>
            <div class="more-box" v-if="dropDownItemList.length === 1">
              <IconEdit
                :size="26"
                style="
                  width: 42px;
                  height: 42px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #fff;
                  cursor: pointer;
                "
                @click="goEditPage"
              />
            </div>
          </div>
          <div class="goTop">
            <div @click="goTop" class="top-icon dfc">
              <IconSortTop :size="20" />
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-box">
          <div class="bread-box">
            <Breadcrumb />
          </div>
          <div class="title ove">{{ articleInfo.title }}</div>
          <div class="tags-box">
            <div class="tag" v-for="(item, index) in articleInfo.tag" :key="index">{{ item }}</div>
          </div>
          <div class="user-box dfc">
            <div class="userInfo dfc">
              <div class="avatar dfc">
                <k-image :src="articleInfo.userIcon"></k-image>
              </div>
              <div class="username ove">{{ articleInfo.userName }}</div>
            </div>
            <div class="publish-time">发布于 {{ articleInfo.lastTime }}</div>
            <div class="show-num">{{ articleInfo.hot }} 浏览</div>
          </div>
          <div class="content-box-text markdown-body" :innerHTML="convertMarkdownToHtml(articleInfo.content)"></div>
        </div>
        <div class="comment-box">
          <CommentArticle
            v-if="ArticleId"
            :articleId="ArticleId"
            :articleInfo="articleInfo"
            :articleReplyCount="articleAllNum"
            @init="initWindow"
            :sign="signRefresh"
            @getDataFinish="getDataFinish"
          />
        </div>
        <div id="textareaTEditor" class="to-reply-box">
          <Vditor v-model="replyValue" :placeholder="$t('forum.formContent')" />
          <div class="submit-box">
            <k-button main @click="addReply">发 表</k-button>
          </div>
        </div>
      </div>
      <div class="right">
        <RightHotCard />
      </div>
    </div>
  </div>
  <k-dialog v-model="showDeleteDialog" title="删除原因" width="700">
    <div class="delete-box-reason">
      <div class="textarea-box">
        <k-input v-model="delReasonValue" type="textarea" :rows="7" show-word-limit :maxlength="500" />
      </div>
      <div class="btn-row">
        <k-button @click="cancelDelArticle">取 消</k-button>
        <k-button @click="confirmDelArticle" main>删 除</k-button>
      </div>
    </div>
  </k-dialog>
</template>

<style lang="scss" scoped>
.article-detail {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
  padding-top: 32px;
  padding-bottom: 32px;
  .dfc {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .detail-box {
    display: flex;
    justify-content: center;
    gap: 16px;
    align-items: start;
    width: 100%;
    max-width: 1380px;
    .left {
      width: 200px;
      height: 100%;
      .flex-left {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: space-between;
        padding-right: 10px;
        padding-top: 40px;
        padding-bottom: 40px;
        width: 200px;
        height: calc(100vh - 100px);
        .flex-top {
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: end;
          gap: 16px;
        }
        .goTop {
          width: 70px;
          height: 50px;
          .top-icon {
            align-items: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
            cursor: pointer;
          }
        }
      }
      .collect-box,
      .reply-box,
      .more-box {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 70px;
        height: 60px;
        overflow: hidden;
        .item {
          align-items: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;
        }
      }
    }
    .right {
      position: sticky;
      top: 92px;
      width: 350px;
      height: fit-content;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: start;
      max-width: 980px;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      .ove {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .content-box {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 16px;
        width: 100%;
        padding: 24px 32px;
        background-color: #fff;
        border-radius: 12px;
        .bread-box {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30px;
        }
      }
      .title {
        width: 100%;
        height: 32px;

        font-size: 24px;
        font-weight: 500;
        color: #171717;
      }
      .tags-box {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        width: 100%;
        min-height: 10px;
        .tag {
          width: fit-content;
          height: 24px;
          line-height: 24px;
          border-radius: 4px;
          padding: 0 6px;

          font-size: 12px;
          font-weight: 500;
          color: #2563eb;
          background-color: #dbeafe;
        }
      }
      .user-box {
        justify-content: start;
        gap: 16px;
        width: 100%;
        height: 24px;
        .userInfo {
          justify-content: start;
          gap: 8px;
          width: fit-content;
          .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            overflow: hidden;
          }
          .username {
            height: 24px;
            line-height: 24px;
            width: fit-content;
            max-width: 300px;
            overflow: hidden;

            font-size: 14px;
            font-weight: 500;
            color: #171717;
          }
        }
        .publish-time,
        .show-num {
          height: 24%;
          line-height: 24px;

          font-size: 14px;
          font-weight: normal;
          color: #a3a3a3;
          width: fit-content;
        }
      }
      .content-box-text {
        margin-top: 15px;
        width: 100%;
        height: fit-content;
      }
      .comment-box {
        width: 100%;
        padding: 24px 32px;
        background-color: #fff;
        border-radius: 12px 12px 0 0;
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
          margin-top: 20px;
          .lis-reply {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            gap: 14px;
            min-height: 112px;
            padding: 20px 0;
            border-bottom: 1px solid #e5e5e5;
            .replyUser-box {
              display: flex;
              align-items: center;
              justify-content: start;
              gap: 20px;
              width: 100%;
              height: 24px;
              .replyUserName {
                display: flex;
                gap: 8px;
                height: 24px;
                .avatar {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  overflow: hidden;
                }
                .user-name {
                  max-width: 200px;
                  width: fit-content;
                  height: 24px;
                  line-height: 24px;

                  font-size: 14px;
                  font-weight: 500;
                  color: #171717;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .is-author {
                height: 24px;
                line-height: 24px;
                padding: 0 8px;
                background-color: #f5f5f5;

                font-size: 12px;
                font-weight: normal;
                color: #6b7280;
                border-radius: 5px;
              }
              .to-reply-person-box {
                display: flex;
                align-items: center;
                justify-content: start;
                width: fit-content;
                height: 100%;
                width: 200px;
                gap: 20px;
                .reply-to-text {
                  height: 24px;
                  line-height: 24px;

                  font-size: 14px;
                  font-weight: normal;
                  color: #a3a3a3;
                }
                .reply-to-user-name {
                  max-width: 200px;
                  width: fit-content;
                  height: 24px;
                  line-height: 24px;

                  font-size: 14px;
                  font-weight: 500;
                  color: #171717;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .reply-time {
                flex: 1;
                display: flex;
                justify-content: end;
                padding-right: 15px;
                height: 24px;
                line-height: 24px;

                font-size: 14px;
                font-weight: normal;
                color: #a3a3a3;
              }
            }
            .reply-text-box {
              width: 100%;
              padding-left: 34px;
              box-sizing: border-box;
            }
            .reply-to-article {
              width: fit-content;
              box-sizing: border-box;
              margin-left: 34px;

              font-size: 14px;
              font-weight: normal;
              color: #737373;
              cursor: pointer;
            }
            .reply-children-box-list {
              display: flex;
              flex-direction: column;
              justify-content: start;
              gap: 6px;
              margin-left: 34px;
              margin-top: 10px;
              // width: 100%;
              height: fit-content;
              overflow: hidden;

              .children-lis-reply {
                display: flex;
                flex-direction: column;
                justify-content: start;
                gap: 16px;
                width: 100%;
                padding: 10px 0px;
              }
            }
          }
        }
      }
      .to-reply-box {
        margin-top: -16px;
        width: 100%;
        padding: 32px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 0 0 12px 12px;
        .submit-box {
          margin-top: 10px;
          width: 100%;
          text-align: right;
        }
      }
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
.delete-box-reason {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: start;
  width: 100%;
  max-height: 70vh;
  .textarea-box {
    flex: 1;
    height: 100%;
    min-height: 100px;
    max-height: 70vh;
    overflow-y: auto;
  }
  .btn-row {
    display: flex;
    justify-content: end;
    width: 100%;
    padding-right: 25px;
    height: 35px;
  }
}
</style>
