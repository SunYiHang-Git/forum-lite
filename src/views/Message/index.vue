<script setup lang="ts">
import { RPAGetNotReadLiteAPI, RPAInformationLiteAPI, RPASetReadMessageLiteAPI } from '@/api/message'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import MessageCard from '@/views/Message/components/MessageCard.vue'
import { KMessageBox } from '@ksware/ksw-ux'
import { onMounted, ref, useTemplateRef } from 'vue'

const ListBoxRef = useTemplateRef('ListBoxRef')

const tabList = ref<any[]>([
  {
    label: '全部消息',
    name: 'all',
    count: 0,
  },
  {
    label: '帖子消息',
    name: 'article',
    count: 0,
  },
  {
    label: '评论消息',
    name: 'reply',
    count: 0,
  },
  {
    label: '系统消息',
    name: 'system',
    count: 0,
  },
])

const getNoteData = async () => {
  const data = await RPAGetNotReadLiteAPI()
  const { Count, PostsCount, ReplyCount, SystemCount } = data
  tabList.value = [
    {
      label: '全部消息',
      name: 'all',
      count: Count,
    },
    {
      label: '帖子消息',
      name: 'article',
      count: PostsCount,
    },
    {
      label: '评论消息',
      name: 'reply',
      count: ReplyCount,
    },
    {
      label: '系统消息',
      name: 'system',
      count: SystemCount,
    },
  ]
}
getNoteData()
const activeName = ref('all')

const tabType = ref(0)

/** 全部或者未读 0=全部, 1=未读 */
const messageType = ref<0 | 1>(0)
/** 页码 */
const currentPage = ref<number>(1)
/** 页数尺寸 */
const pageSize = ref<number>(20)
/** 总条数 */
const totalMessage = ref(0)

/** 搜索 */
const searchValue = ref('')
/** 当前页消息列表 */
const tableData = ref<any>([])

/** 获取帖子信息 */
const getFormaInfoList = async () => {
  const params: any = {
    pageNum: currentPage.value - 1,
    pageSize: pageSize.value,
    State: messageType.value,
    KeySearch: searchValue.value,
    MessageType: 1,
  }
  if (tabType.value !== 0) {
    params.iType = tabType.value
  }
  const { list, total } = await RPAInformationLiteAPI(params, { loadingEl: ListBoxRef.value })
  totalMessage.value = total
  tableData.value = list
}
onMounted(() => {
  getFormaInfoList()
})
/** tab 切换事件 */
const handleClick = (name: string) => {
  switch (name) {
    case 'all':
      tabType.value = 0
      break
    case 'article':
      tabType.value = 1
      break
    case 'reply':
      tabType.value = 2
      break
    case 'system':
      tabType.value = 3
      break
    default:
      tabType.value = 0
      break
  }
  getFormaInfoList()
}
/** 选择消息全部或者未读 */
const selectMsgType = (type: 0 | 1) => {
  messageType.value = type
  getFormaInfoList()
}
/** 全部已读 */
const allReady = async () => {
  await KMessageBox.confirm('是否确认全部已读?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success',
  })
  const params = { MessageState: 1 }
  await RPASetReadMessageLiteAPI(params)
  getFormaInfoList()
}

/** 搜索事件 */
const handleEnterPress = () => {
  currentPage.value = 1
  getFormaInfoList()
}
const clearSearch = () => {
  currentPage.value = 1
  searchValue.value = ''
  getFormaInfoList()
}

/** 分页 */
const handleCurrentChange = () => {
  getFormaInfoList()
}
</script>

<template>
  <div class="message">
    <div class="message-center">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="main-box" ref="ListBoxRef">
        <k-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
          <k-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
            <div class="component-box">
              <div class="nav-box">
                <div class="type">
                  <div @click="selectMsgType(0)" class="btn" :class="messageType === 0 ? 'activeType' : ''">全部</div>
                  <div @click="selectMsgType(1)" class="btn" :class="messageType === 1 ? 'activeType' : ''">未读</div>
                </div>
                <div class="opt-box">
                  <div class="search">
                    <k-input
                      v-model="searchValue"
                      @keyup.enter="handleEnterPress"
                      style="width: 160px"
                      placeholder="搜索..."
                      clearable
                      @clear="clearSearch"
                    ></k-input>
                  </div>
                  <k-button @click="allReady">全部已读</k-button>
                </div>
              </div>
              <MessageCard :list="tableData" class="MessageCard" @resetCount="getFormaInfoList" />
              <div class="footer">
                <k-pagination
                  v-model:current-page="currentPage"
                  :page-size="20"
                  layout="total,->, prev, pager, next, jumper"
                  :total="totalMessage"
                  :pager-count="9"
                  background
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </k-tab-pane>
        </k-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  background: url('@/assets/images/user-bg.png') no-repeat top;
  background-size: 100% 100%;
  padding-top: 40px;
  .message-center {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 24px;
    max-width: 1200px;
    width: 100%;
    min-height: calc(100vh - 100px);
    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
    }
    .main-box {
      width: 100%;
      flex: 1;
      min-height: calc(100vh - 154px);
      border-radius: 12px;
      padding: 16px 32px 24px 32px;
      background-color: #fff;
      .k-tabs {
        width: 100%;
        min-height: calc(100vh - 194px);
      }
      .component-box {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 100%;
        min-height: calc(100vh - 248px);
        .nav-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 64px;
          .type {
            display: flex;
            align-items: center;
            gap: 16px;
            .btn {
              font-size: 14px;
              font-weight: normal;
              width: 52px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              color: #404040;
              border-radius: 4px;
              background-color: #f5f5f5;
              cursor: pointer;
            }
            .btn.activeType {
              color: #0a4aeb;
              background-color: #d7eaff;
            }
          }
          .opt-box {
            display: flex;
            align-items: center;
            gap: 16px;
          }
        }
        .MessageCard {
          flex: 1;
        }
        .footer {
          display: flex;
          align-items: center;
          width: 100%;
          height: 72px;
          .k-pagination {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
