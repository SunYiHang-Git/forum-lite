<script setup lang="ts">
import { addReplyForArticleAPI, getAllReplyNumAPI, getArticleInfoById, getReplyListAPI } from '@/api/home'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import TEditor from '@/component/TEditor/index.vue'

const replyValue = ref<string>('')
const replyValueDialog = ref<string>('')

const route = useRoute()

const ArticleId = ref('')

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
  const { id }: any = route.params
  if (!id) return
  ArticleId.value = id
}
getRouteId()

/** 回复 帖子 数据 */
const replyArticleList = ref<any[]>([])
/** 获取帖子的回复数据 */
const getReplyData = async () => {
  const params = { PostsID: ArticleId.value, PageNum: '0', PageSize: '200', iSort: 1 }
  const { firstList, secondList } = await getReplyListAPI(params)
  firstList.forEach((item: any) => {
    const arr = secondList.filter((v) => v.initialID === item.id)
    item.children = arr.map((v: any) => {
      const findItem = arr.find(({ id }: any) => id === v.pid)
      return { ...v, replyPerson: findItem?.userName ?? item.userName }
    })
  })
  replyArticleList.value = firstList
}

async function initWindow() {
  await getReplyData()
  await getArticleInfo(ArticleId.value)
}
initWindow()
/** 去评论 */
const handleToBottom = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  window.scrollTo({
    top: 150, // 滚动条总高度
    left: 0,
    behavior: 'smooth',
  })
}

/** 评论 */
const addReply = async () => {
  const params = { Content: replyValue.value, PostsID: ArticleId.value }
  await addReplyForArticleAPI(params)
  replyValue.value = ''
}
const showReplyDialog = ref(false)

/** 弹窗取消 */
const dialogCancel = () => {
  showReplyDialog.value = false
  replyValueDialog.value = ''
}

const dialogParams = ref<any>({})

const dialogReply = async () => {
  showReplyDialog.value = true
  const { PostsID, PID, InitialID } = dialogParams.value
  const params = {
    PostsID,
    PID,
    InitialID,
    Content: replyValueDialog.value,
  }
  await addReplyForArticleAPI(params)
  dialogCancel()
  initWindow()
}
const replyShowDialog = (item: any) => {
  showReplyDialog.value = true
  dialogParams.value = {
    PostsID: item.postId,
    PID: item.id,
    InitialID: item.initialID || item.id,
    userName: item.userName,
  }
}
</script>

<template>
  <div class="article-detail">
    <div class="detail-box">
      <div class="left">
        <div class="collect-box">
          <k-badge :value="articleInfo.collectNum" type="info" class="item dfc">
            <IconStar :size="26" />
          </k-badge>
        </div>
        <div class="reply-box">
          <k-badge @click="handleToBottom" :value="articleAllNum" type="info" class="item dfc">
            <IconMessageOne :size="26" />
          </k-badge>
        </div>

        <k-dropdown placement="left-start" trigger="click">
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
            <k-dropdown-item style="width: 100px; display: flex; align-items: center; gap: 8px">
              <IconEdit />
              编辑
            </k-dropdown-item>
            <k-dropdown-item style="width: 100px; display: flex; align-items: center; gap: 8px">
              <span
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 14px;
                  height: 14px;
                  font-size: 10px;
                  color: #c55902;
                  background-color: #fff6d3;
                "
              >
                精
              </span>
              精华
            </k-dropdown-item>
            <k-dropdown-item style="width: 100px; display: flex; align-items: center; gap: 8px">
              <IconSortTop />
              置顶
            </k-dropdown-item>
            <k-dropdown-item style="width: 100px; display: flex; align-items: center; gap: 8px">
              <IconLocked />
              锁定
            </k-dropdown-item>
            <k-dropdown-item style="width: 100px; display: flex; align-items: center; gap: 8px">
              <IconDelete />
              删除
            </k-dropdown-item>
          </template>
        </k-dropdown>
      </div>
      <div class="content">
        <div class="content-box">
          <div class="title ove">{{ articleInfo.title }}</div>
          <div class="tags-box">
            <div class="tag" v-for="item in 8" :key="item">操作系统</div>
          </div>
          <div class="user-box dfc">
            <div class="userInfo dfc">
              <div class="avatar dfc">
                <k-image :src="articleInfo.userIcon"></k-image>
              </div>
              <div class="username ove">{{ articleInfo.username }}</div>
            </div>
            <div class="publish-time">发布于 {{ articleInfo.lastTime }}</div>
            <div class="show-num">{{ articleInfo.hot }} 浏览</div>
          </div>
          <div class="content-box-text" :innerHTML="articleInfo.content"></div>
        </div>
        <div class="comment-box">
          <div class="reply-num-box">{{ articleAllNum }} 条回复</div>
          <div class="reply-list-box">
            <div class="lis-reply" v-for="item in replyArticleList" :key="item.id">
              <div class="replyUser-box">
                <div class="replyUserName">
                  <div class="avatar">
                    <k-image :src="item.userIcon" />
                  </div>
                  <div class="user-name">{{ item.userName }}</div>
                </div>
                <div class="is-author" v-if="articleInfo.createUser === item.userId">作者</div>
                <div class="reply-time">{{ item.time }}</div>
              </div>
              <div class="reply-text-box" :innerHTML="item.content"></div>
              <div class="reply-to-article" @click="replyShowDialog(item)">
                <IconMessageOne />
                回复
              </div>
              <div class="reply-children-box-list">
                <div class="children-lis-reply" v-for="child in item.children" :key="child.id">
                  <div class="replyUser-box">
                    <div class="replyUserName">
                      <div class="avatar">
                        <k-image :src="child.userIcon" />
                      </div>
                      <div class="user-name">{{ child.userName }}</div>
                    </div>
                    <div class="is-author" v-if="articleInfo.createUser === child.userId">作者</div>
                    <div class="to-reply-person-box">
                      <div class="reply-to-text">回复</div>
                      <div class="reply-to-user-name">{{ child.replyPerson }}</div>
                    </div>
                    <div class="reply-time">{{ child.time }}</div>
                  </div>
                  <div class="reply-text-box" :innerHTML="child.content"></div>
                  <div class="reply-to-article" @click="replyShowDialog(child)">
                    <IconMessageOne />
                    回复
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="to-reply-box">
          <TEditor v-model="replyValue" :placeholder="$t('forum.formContent')" />
          <div class="submit-box">
            <k-button main @click="addReply">发 表</k-button>
          </div>
        </div>
      </div>
      <div class="right">right</div>
    </div>
  </div>
  <k-dialog v-model="showReplyDialog" :title="'回复: ' + dialogParams.userName" width="700">
    <div class="reply-dialog-box">
      <div class="reply-dialog-edit">
        <TEditor v-model="replyValueDialog" :placeholder="$t('forum.formContent')" />
      </div>
      <div class="btn-box">
        <k-button @click="dialogCancel">取 消</k-button>
        <k-button main @click="dialogReply">确 定</k-button>
      </div>
    </div>
  </k-dialog>
</template>

<style lang="scss" scoped>
.article-detail {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;
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
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: end;
      padding-right: 10px;
      padding-top: 40px;
      gap: 16px;
      width: 200px;
      height: fit-content;
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
      width: 350px;
      height: fit-content;
      overflow: hidden;
      background-color: gray;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: start;
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
        padding: 32px;
        background-color: #fff;
      }
      .title {
        width: 100%;
        height: 32px;
        font-family: Alibaba PuHuiTi 3;
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
          font-family: Alibaba PuHuiTi 3;
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
            font-family: Alibaba PuHuiTi 3;
            font-size: 14px;
            font-weight: 500;
            color: #171717;
          }
        }
        .publish-time,
        .show-num {
          height: 24%;
          line-height: 24px;
          font-family: Alibaba PuHuiTi 3;
          font-size: 14px;
          font-weight: normal;
          color: #a3a3a3;
          width: fit-content;
        }
      }
      .content-box-text {
        margin-top: 15px;
        width: 100%;
        overflow-x: hidden;
      }
      .comment-box {
        margin-top: 20px;
        width: 100%;
        padding: 32px;
        background-color: #fff;
        .reply-num-box {
          width: 100%;
          height: 24px;
          font-family: Alibaba PuHuiTi 3;
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
                  font-family: Alibaba PuHuiTi 3;
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
                font-family: Alibaba PuHuiTi 3;
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
                  font-family: Alibaba PuHuiTi 3;
                  font-size: 14px;
                  font-weight: normal;
                  color: #a3a3a3;
                }
                .reply-to-user-name {
                  max-width: 200px;
                  width: fit-content;
                  height: 24px;
                  line-height: 24px;
                  font-family: Alibaba PuHuiTi 3;
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
                font-family: Alibaba PuHuiTi 3;
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
              font-family: Alibaba PuHuiTi 3;
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
</style>
