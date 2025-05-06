<script setup lang="ts">
import { convertMarkdownToHtml } from '@/utils/format'

const { item, isAuthor } = defineProps<{
  item: any
  /** 是否是作者 */
  isAuthor: boolean
}>()

const emits = defineEmits<{
  (e: 'showDialog', item: any): void
}>()
const replyShowDialog = (item: any) => {
  emits('showDialog', item)
}
</script>

<template>
  <div class="reply-card">
    <div :id="item.id">
      <div class="replyUser-box">
        <div class="replyUserName">
          <div class="avatar">
            <k-image :src="item.userIcon" />
          </div>
          <div class="user-name">
            {{ item.userName }}
            <div v-if="item.suffix">{{ item.suffix }}</div>
          </div>
        </div>
        <div class="is-author" v-if="isAuthor">作者</div>
        <div class="reply-time">{{ item.time }}</div>
      </div>
      <div class="reply-text-box" :innerHTML="convertMarkdownToHtml(item.content)"></div>
      <div class="reply-to-article" @click="replyShowDialog(item)">
        <IconMessageOne />
        回复
      </div>
    </div>
    <div class="reply-children-box-list">
      <div class="children-lis-reply" v-for="child in item.children" :key="child.id" :id="child.id">
        <div class="replyUser-box">
          <div class="replyUserName">
            <div class="avatar">
              <k-image :src="child.userIcon" />
            </div>
            <div class="user-name">
              {{ child.userName }}
              <div v-if="child.suffix">{{ child.suffix }}</div>
            </div>
          </div>
          <div class="is-author" v-if="isAuthor">作者</div>
          <div class="to-reply-person-box">
            <div class="reply-to-text">回复</div>
            <div class="reply-to-user-name">
              {{ child.replyPerson }}
              <div v-if="child.replySuffix">{{ child.replySuffix }}</div>
            </div>
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
</template>

<style lang="scss" scoped>
.reply-card {
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
        display: flex;
        align-items: center;
        max-width: 300px;
        width: fit-content;
        height: 24px;
        line-height: 24px;

        font-size: 14px;
        font-weight: 500;

        color: #736f78;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        div {
          height: 24px;

          font-size: 14px;
          font-weight: normal;
          line-height: 24px;
          color: #d1d5db;
        }
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
      width: fit-content;
      gap: 20px;
      .reply-to-text {
        height: 24px;
        line-height: 24px;

        font-size: 14px;
        font-weight: normal;
        color: #a3a3a3;
      }
      .reply-to-user-name {
        display: flex;
        align-items: center;
        max-width: 300px;
        width: fit-content;
        height: 24px;
        line-height: 24px;

        font-size: 14px;
        font-weight: 500;
        color: #736f78;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        div {
          height: 24px;

          font-size: 14px;
          font-weight: normal;
          line-height: 24px;
          color: #d1d5db;
        }
      }
    }
    .reply-time {
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
    margin: 12px 0 12px 0;
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
      width: 100%;
      padding: 10px 0px;
    }
  }
}
</style>
