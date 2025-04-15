<script setup lang="ts">
import logoSvg from '@/assets/svg/logo.svg'
import avatarSvg from '@/assets/svg/default-avatar.svg'
import helpSvg from '@/assets/svg/help.svg'
import interactionSvg from '@/assets/svg/interaction.svg'
import knowledgeSvg from '@/assets/svg/knowledge.svg'
import noticeSvg from '@/assets/svg/notice.svg'
import firstSvg from '@/assets/svg/first.svg'
import importantSvg from '@/assets/svg/important.svg'
import RPA_LOGO from '@/assets/images/K-RPA-logo.png'
import Footer from './Footer/index.vue'
import { ref } from 'vue'
import Banner from './component/banner.vue'
const searchValue = ref<string>('')
</script>

<template>
  <div class="home-box">
    <div class="center-box">
      <div class="main">
        <div class="header">
          <div class="carousel-box">
            <Banner />
          </div>
          <div class="userInfo-box">
            <div class="user-box">
              <div class="avatar">
                <img :src="avatarSvg" />
              </div>
              <div class="userInfo">
                <div class="name">你好</div>
                <div class="desc">欢迎登录...</div>
              </div>
              <div class="right-box dfc"><IconRight /></div>
            </div>
            <div class="user-menu">
              <div class="menu-link">
                <div class="menu-title">提问</div>
                <div class="menu-num">0</div>
              </div>
              <div class="menu-link">
                <div class="menu-title">文章</div>
                <div class="menu-num">0</div>
              </div>
              <div class="menu-link">
                <div class="menu-title">回复</div>
                <div class="menu-num">0</div>
              </div>
              <div class="menu-link">
                <div class="menu-title">收藏</div>
                <div class="menu-num">0</div>
              </div>
            </div>
            <k-button main style="width: 100%">发帖</k-button>
          </div>
        </div>
        <div class="nav-box">
          <div class="nav-link">
            <div class="nav-icon">
              <img :src="knowledgeSvg" />
            </div>
            <div class="nav-connect">
              <div class="title">知识分享</div>
              <div class="desc">传播智慧的桥梁</div>
            </div>
          </div>
          <div class="nav-link">
            <div class="nav-icon">
              <img :src="interactionSvg" />
            </div>
            <div class="nav-connect">
              <div class="title">互动解答</div>
              <div class="desc">交流思想的舞台</div>
            </div>
          </div>
          <div class="nav-link">
            <div class="nav-icon">
              <img :src="noticeSvg" />
            </div>
            <div class="nav-connect">
              <div class="title">官方公馆</div>
              <div class="desc">传递信息的窗口</div>
            </div>
          </div>
          <div class="nav-link">
            <div class="nav-icon">
              <img :src="helpSvg" />
            </div>
            <div class="nav-connect">
              <div class="title">帮助文档</div>
              <div class="desc">指引操作的指南</div>
            </div>
          </div>
        </div>
        <div class="official-announcement">
          <div class="announcement">
            <div class="reply-header">
              <div class="title-note">官方公告</div>
              <k-button text class="more">更多</k-button>
            </div>
            <div class="announcement-list">
              <div class="notice-lis" v-for="i in 5" :key="i">
                <div class="tag-box">
                  <div class="tag">
                    <img :src="importantSvg" />
                  </div>
                  <div class="tag">
                    <div class="tag-sign">发布更新</div>
                  </div>
                </div>
                <div class="lis-title-box">
                  <div class="title">
                    系统即将于今日(20222024777）发布..系统即将于今日(20222024777）发布..系统即将于今日(20222024777）发布..
                  </div>
                </div>
                <div class="lis-time">2025-02-28 12:01</div>
              </div>
            </div>
          </div>
          <div class="reply">
            <div class="reply-weekly-list">回帖周榜</div>
            <div class="list-box">
              <div class="lis" v-for="i in 5" :key="i">
                <div class="reply-icon dfc">
                  <div class="icon dfc">
                    <img :src="firstSvg" />
                  </div>
                </div>
                <div class="avatar dfc">avr</div>
                <div class="username">王一婷</div>
                <div class="reply-num">9999</div>
              </div>
            </div>
          </div>
        </div>
        <div class="interaction">
          <div class="header-title">
            <div class="title">互动解答</div>
            <k-button text class="more">更多</k-button>
          </div>
          <div class="interaction-card-box">
            <div class="interaction-card">
              <div class="sign-name">热门</div>
              <div class="card-list-box">
                <div class="lis-data" v-for="(item, index) in 5" :key="index">
                  <div class="main-content-top">
                    <div class="icon dfc"><IconWarning /></div>
                    <div class="system dfc">操作系统</div>
                    <div class="hot-title">新版RPA社区版使用手册</div>
                    <div class="answer" v-if="index !== 0">n 个回答</div>
                  </div>
                  <div v-if="index === 0" class="hot-desc">
                    滑块验证码中获取了body 值后，
                    点击鼠标拖动slider的具体作，鼠标移动中的横坐标加上body值后，然后再鼠标弹起，还是位置不对
                  </div>
                  <div v-if="index === 0" class="hot-user-box">
                    <div class="user-avatar dfc">
                      <k-image :src="RPA_LOGO" />
                    </div>
                    <div class="user-name dfc">隔壁老王</div>
                    <div class="page-vies dfc">浏览 13222</div>
                    <div class="answer">n 个回答</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="interaction-card">
              <div class="sign-name">最新</div>
              <div class="card-list-box">
                <div class="lis-data" v-for="(item, index) in 5" :key="index">
                  <div class="main-content-top">
                    <div class="icon dfc"><IconWarning /></div>
                    <div class="system dfc">操作系统</div>
                    <div class="hot-title">新版RPA社区版使用手册</div>
                    <div class="answer" v-if="index !== 0">n 个回答</div>
                  </div>
                  <div v-if="index === 0" class="hot-desc">
                    滑块验证码中获取了body 值后，
                    点击鼠标拖动slider的具体作，鼠标移动中的横坐标加上body值后，然后再鼠标弹起，还是位置不对
                  </div>
                  <div v-if="index === 0" class="hot-user-box">
                    <div class="user-avatar dfc">
                      <k-image :src="RPA_LOGO" />
                    </div>
                    <div class="user-name dfc">隔壁老王</div>
                    <div class="page-vies dfc">浏览 13222</div>
                    <div class="answer">n 个回答</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="interaction-card">
              <div class="sign-name">标签</div>
            </div>
          </div>
        </div>
        <div class="knowledge-share">
          <div class="header-title">
            <div class="title">知识分享</div>
            <k-button text class="more">更多</k-button>
          </div>
          <div class="knowledge-card-box">
            <div class="knowledge-card">
              <div class="header-title-card">热门</div>
              <div class="know-content">
                <div v-for="i in 4" :key="i" class="lis-hot-know">
                  <div class="lis-top">
                    <div class="icon dfc"><IconWarning /></div>
                    <div class="system dfc">操作系统</div>
                    <div class="hot-title">新版RPA社区版使用手册</div>
                  </div>
                  <div class="lis-desc">
                    滑块验证码中获取了body 值后，
                    点击鼠标拖动slider的具体作，鼠标移动中的横坐标加上body值后，然后再鼠标弹起，还是位置不对
                  </div>
                  <div class="hot-user-box">
                    <div class="user-avatar dfc">
                      <k-image :src="RPA_LOGO" />
                    </div>
                    <div class="user-name dfc">隔壁老王</div>
                    <div class="page-vies dfc">浏览 13222</div>
                    <div class="answer">n 个回答</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="knowledge-card-now">
              <div class="header-title-card">最新</div>
              <div class="know-content">
                <div v-for="i in 4" :key="i" class="lis-hot-know">
                  <div class="lis-top">
                    <div class="icon dfc"><IconWarning /></div>
                    <div class="system dfc">操作系统</div>
                    <div class="hot-title">新版RPA社区版使用手册</div>
                  </div>
                  <div class="lis-desc">
                    滑块验证码中获取了body 值后，
                    点击鼠标拖动slider的具体作，鼠标移动中的横坐标加上body值后，然后再鼠标弹起，还是位置不对
                  </div>
                  <div class="hot-user-box">
                    <div class="user-avatar dfc">
                      <k-image :src="RPA_LOGO" />
                    </div>
                    <div class="user-name dfc">隔壁老王</div>
                    <div class="page-vies dfc">浏览 13222</div>
                    <div class="answer">n 个回答</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-content">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center-box {
    max-width: 1200px;
    width: 100%;
    .main {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 24px;
      width: 100%;
      padding-top: 40px;
      box-sizing: border-box;
      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 16px;
        .carousel-box {
          flex: 1;
          min-width: 600px;
          width: 100%;
          height: 232px;
          border-radius: 12px;
          overflow: hidden;
        }
        .userInfo-box {
          top: 0px;
          width: 400px;
          height: 232px;
          border-radius: 12px;
          opacity: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 32px;
          box-sizing: border-box;
          gap: 24px;
          .user-box {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 8px;
            .avatar {
              width: 48px;
              height: 48px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .userInfo {
              flex: 1;
              .name {
                font-family: Alibaba PuHuiTi 3;
                font-size: 18px;
                font-weight: 600;
                line-height: 24px;
                letter-spacing: 0px;
                color: #171717;
              }
              .desc {
                font-family: Alibaba PuHuiTi 3;
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                letter-spacing: 0px;
                color: #737373;
              }
            }
            .right-box {
              width: 16px;
              height: 16px;
              font-size: 24px;
            }
          }
          .user-menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0;
            width: 100%;
            height: 56px;
            .menu-link {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              height: 100%;
              .menu-title {
                font-family: Alibaba PuHuiTi 3;
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                letter-spacing: 0px;
              }
              .menu-num {
                height: 26px;
                font-family: Alibaba PuHuiTi 3;
                font-size: 18px;
                font-weight: 600;
                line-height: 26px;
                letter-spacing: 0px;
                color: #3d3d3d;
              }
            }
          }
        }
      }
      .nav-box {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        justify-items: center;
        width: 100%;
        height: 96px;
        .nav-link {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          height: 96px;
          .nav-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
          }
          .nav-connect {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: 100%;
            height: 48px;
            .title {
              font-family: Alibaba PuHuiTi 3;
              font-size: 18px;
              font-weight: 600;
              line-height: 26px;
              letter-spacing: 0px;
              color: #3d3d3d;
            }
            .desc {
              font-family: Alibaba PuHuiTi 3;
              font-size: 12px;
              font-weight: normal;
              line-height: 20px;
              letter-spacing: 0px;
              color: #3d3d3d;
            }
          }
        }
      }
      // 官方公告
      .official-announcement {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        box-sizing: border-box;
        padding-bottom: 10px;
        .announcement {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 24px;
          box-sizing: border-box;
          border-radius: 12px;
          .reply-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 32px;
            .title-note {
              font-family: Alibaba PuHuiTi 3;
              font-size: 24px;
              font-weight: 600;
              line-height: 32px;
              color: #000000;
            }
            .more {
              font-size: 14px;
            }
          }
          .announcement-list {
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 32px;
            width: 100%;
            .notice-lis {
              display: flex;
              justify-content: start;
              align-items: center;
              width: 100%;
              height: 24px;
              gap: 8px;
              .tag-box {
                display: flex;
                align-items: center;
                gap: 4px;
                height: 100%;
                width: fit-content;
                .tag {
                  width: fit-content;
                  height: 100%;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  .tag-sign {
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 5px;
                    width: fit-content;
                    height: 100%;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 12px;
                    font-weight: 500;
                    display: flex;
                    color: #736f78;
                    background-color: rgba(0, 0, 0, 0.06);
                  }
                }
              }
              .lis-title-box {
                flex: 1;
                height: 100%;
                .title {
                  width: 240px;
                  height: 20px;
                  font-family: Alibaba PuHuiTi 3;
                  font-size: 14px;
                  font-weight: normal;
                  letter-spacing: 0px;
                  color: #171717;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-wrap: nowrap;
                }
              }
              .lis-time {
                display: flex;
                align-items: center;
                height: 100%;
                width: fit-content;
                font-family: Alibaba PuHuiTi 3;
                font-size: 12px;
                font-weight: normal;
                color: #a3a3a3;
              }
            }
          }
        }
        .reply {
          width: 390px;
          height: 352px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 24px;
          box-sizing: border-box;
          background: #ffffff;
          .reply-weekly-list {
            font-family: Alibaba PuHuiTi 3;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
            letter-spacing: 0px;
            color: #000000;
          }
          .list-box {
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 22px;
            width: 100%;
            .lis {
              display: flex;
              justify-content: start;
              align-items: center;
              gap: 14px;
              width: 100%;
              height: 32px;
              .reply-icon {
                width: 32px;
                height: 32px;
                .icon {
                  width: 25px;
                  height: 27px;
                }
              }
              .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: red;
                overflow: hidden;
              }
              .username {
                flex: 1;
                height: 22px;
                font-family: Alibaba PuHuiTi 3;
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                color: #38363c;
              }
              .reply-num {
                width: fit-content;
                font-family: Alibaba PuHuiTi 3;
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                text-align: right;
                letter-spacing: 0px;
                color: #afabb3;
              }
            }
          }
        }
      }
      .header-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        .title {
          font-family: Alibaba PuHuiTi 3;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          letter-spacing: 0px;
          color: #38363c;
        }
        .more {
          font-size: 14px;
          font-weight: normal;
        }
      }
      // 互动解答
      .interaction {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 24px;
        position: relative;
        width: 100%;
        height: 568px;
        box-sizing: border-box;
        padding: 40px 0;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 568px;
          background-color: #f5f5f5;
          z-index: -1;
        }
        .interaction-card-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          height: 432px;
          .interaction-card {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 24px;
            height: 432px;
            box-sizing: border-box;
            padding: 24px;
            border-radius: 12px;
            background-color: #fff;
            .sign-name {
              height: 28px;
              font-family: Alibaba PuHuiTi 3;
              font-size: 20px;
              font-weight: 600;
              color: #000;
            }
            .card-list-box {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: start;
              gap: 1px;
              width: 100%;
              overflow: hidden;
              .lis-data {
                display: flex;
                align-items: center;
                width: 100%;
                height: 56px;
                border-top: 1px solid #eae8eb;
                &:nth-child(1) {
                  display: flex;
                  flex-direction: column;
                  align-items: start;
                  gap: 12px;
                  height: auto;
                  padding-bottom: 16px;
                  border: none;
                  .hot-desc {
                    width: 100%;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #6b7280;
                    display: -webkit-box; /* 必须结合其他属性一起使用 */
                    -webkit-box-orient: vertical; /* 设置垂直排列盒子中的子元素 */
                    -webkit-line-clamp: 2; /* 设置最大行数为2 */
                    overflow: hidden; /* 隐藏溢出的内容 */
                    text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
                    white-space: normal; /* 允许文本换行 */
                    word-break: break-all; /* 强制断字以适应容器宽度 */
                  }
                  .hot-user-box {
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                    .user-avatar {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      overflow: hidden;
                    }
                    .user-name {
                      width: fit-content;
                      padding: 0 5px;
                      font-family: Alibaba PuHuiTi 3;
                      font-size: 14px;
                      font-weight: normal;
                      color: #afabb3;
                    }
                    .page-vies {
                      flex: 1;
                      justify-content: start;
                      margin-left: 10px;
                      padding: 0 5px;
                      font-family: Alibaba PuHuiTi 3;
                      font-size: 14px;
                      font-weight: normal;
                      color: #afabb3;
                    }
                    .answer {
                      font-family: Alibaba PuHuiTi 3;
                      font-size: 14px;
                      font-weight: normal;
                      color: #afabb3;
                    }
                  }
                }
                .main-content-top {
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  gap: 8px;
                  width: 100%;
                  height: 24px;
                  .icon {
                    width: 15px;
                    height: 14px;
                    font-size: 14px;
                  }
                  .system {
                    height: 100%;
                    border-radius: 4px;
                    padding: 0px 6px;
                    background: #dbeafe;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 12px;
                    color: #2563eb;
                  }
                  .hot-title {
                    flex: 1;
                    height: 24px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-wrap: nowrap;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 16px;
                    font-weight: normal;
                    color: #171717;
                  }
                  .answer {
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 14px;
                    font-weight: normal;
                    color: #afabb3;
                  }
                }
              }
            }
          }
        }
      }
      // 知识分享
      .knowledge-share {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 24px;
        width: 100%;
        padding: 20px 0;
        .knowledge-card-box {
          width: 100%;
          height: 628px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          .knowledge-card,
          .knowledge-card-now {
            height: 100%;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            padding: 24px;
            gap: 24px;
            background: linear-gradient(180deg, #fef2f2 0%, #ffffff 46%);
            .header-title-card {
              height: 28px;
              font-family: Alibaba PuHuiTi 3;
              line-height: 28px;
              font-size: 20px;
              font-weight: 600;
            }
            .know-content {
              display: flex;
              flex-direction: column;
              gap: 1px;
              width: 100%;
              flex: 1;
              .lis-hot-know {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 10px;
                width: 100%;
                height: 124px;
                // padding: 10px 0;
                // box-sizing: border-box;
                border-top: 1px solid #eae8eb;
                &:nth-child(1) {
                  border: none;
                }
                .lis-top {
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  gap: 8px;
                  width: 100%;
                  height: 24px;
                  .icon {
                    width: 15px;
                    height: 14px;
                    font-size: 14px;
                  }
                  .system {
                    height: 100%;
                    border-radius: 4px;
                    padding: 0px 6px;
                    background: #dbeafe;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 12px;
                    color: #2563eb;
                  }
                  .hot-title {
                    flex: 1;
                    height: 24px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-wrap: nowrap;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 16px;
                    font-weight: normal;
                    color: #171717;
                  }
                }
                .lis-desc {
                  width: 100%;
                  font-family: Alibaba PuHuiTi 3;
                  font-size: 12px;
                  font-weight: normal;
                  line-height: 20px;
                  letter-spacing: 0px;
                  color: #6b7280;
                  display: -webkit-box; /* 必须结合其他属性一起使用 */
                  -webkit-box-orient: vertical; /* 设置垂直排列盒子中的子元素 */
                  -webkit-line-clamp: 2; /* 设置最大行数为2 */
                  overflow: hidden; /* 隐藏溢出的内容 */
                  text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
                  white-space: normal; /* 允许文本换行 */
                  word-break: break-all; /* 强制断字以适应容器宽度 */
                }
                .hot-user-box {
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  width: 100%;
                  height: 20px;
                  .user-avatar {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    overflow: hidden;
                  }
                  .user-name {
                    width: fit-content;
                    padding: 0 5px;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 14px;
                    font-weight: normal;
                    color: #afabb3;
                  }
                  .page-vies {
                    flex: 1;
                    justify-content: start;
                    margin-left: 10px;
                    padding: 0 5px;
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 14px;
                    font-weight: normal;
                    color: #afabb3;
                  }
                  .answer {
                    font-family: Alibaba PuHuiTi 3;
                    font-size: 14px;
                    font-weight: normal;
                    color: #afabb3;
                  }
                }
              }
            }
          }
          .knowledge-card-now {
            background: linear-gradient(180deg, #f0fdfa 0%, #ffffff 46%), #ffffff;
          }
        }
      }
    }
    .footer {
      position: relative;
      width: 100%;
      height: 426px;
      .footer-content {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 426px;
      }
    }
  }
}
</style>
