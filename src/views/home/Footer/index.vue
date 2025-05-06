<script setup lang="ts">
import LogoSvg from '@/assets/svg/logo-white.png'
interface ISectionType {
  title: string
  links: { text: string; href?: string }[]
}
const sections: ISectionType[] = [
  {
    title: '产品',
    links: [
      { text: 'PRA', href: 'https://www.kingsware.cn/tech-rpa' },
      { text: 'AI', href: 'https://www.kingsware.cn/a-iF4z' },
      { text: '运维', href: 'https://www.kingsware.cn/kuniops' },
      { text: '低代码', href: 'https://www.kingsware.cn/tech-code' },
    ],
  },
  {
    title: '支持',
    links: [
      {
        text: '文档中心',
        href: 'http://doc.kingsware.cn:8099/web/docCenter/index.html#/dashboard',
      },
      {
        text: '用户社区',
        href: 'http://www.rpa-china.cn:12580/forum/index.html#/home',
      },
    ],
  },
  {
    title: '公司',
    links: [
      { text: '关于我们', href: 'https://www.kingsware.cn/about' },
      { text: '联系我们', href: 'https://www.kingsware.cn/contact' },
    ],
  },
  {
    title: '联系我们',
    links: [
      { text: '0756-333-7989' }, // 没有href的项
      { text: 'kingsware@kingsware.cn' },
    ],
  },
]

const goPageByUrl = (url: string | undefined) => {
  if (!url) return
  window.open(url)
}
</script>

<template>
  <div class="footer-box">
    <div class="footer">
      <div class="main">
        <div class="logo">
          <div class="icon">
            <img :src="LogoSvg" style="color: red" />
          </div>
          <div class="name">K-RPA Lite</div>
        </div>
        <div class="link">
          <div v-for="(item, index) in sections" :key="index" class="link-col">
            <div class="link-title">{{ item.title }}</div>
            <div v-for="(link, num) in item.links" :key="num" class="link-src">
              <k-button text color="#96979B" @click="goPageByUrl(link.href)">{{ link.text }}</k-button>
            </div>
          </div>
        </div>
      </div>
      <div class="company-name">Copyright ©2025 金智维</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #11131e;
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    max-width: 1240px;
    height: 100%;
    .company-name {
      font-size: 14px;
      font-weight: normal;
      line-height: 28px;
      text-align: center;
      letter-spacing: 0em;
      color: #6b7280;
    }
    .main {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .logo {
        flex: 1;
        display: flex;
        justify-content: start;
        align-items: start;
        gap: 16px;
        .icon {
          width: 37px;
          height: 32px;
        }
        .name {
          font-size: 24px;
          font-weight: bold;
          line-height: normal;
          color: #ffffff;
        }
      }
      .link {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 900px;
        height: 100%;
        .link-col {
          display: flex;
          flex-direction: column;
          justify-content: start;
          gap: 24px;
          .link-title {
            font-size: 16px;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0em;
            color: #ffffff;
          }
          .link-src {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            letter-spacing: 0em;
            color: #ffffff;
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>
