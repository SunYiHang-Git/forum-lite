<script setup lang="ts">
import bg1 from '@/assets/svg/login-bg-1.svg'
import bg2 from '@/assets/svg/login-bg-2.svg'
import bg3 from '@/assets/svg/login-bg-3.svg'
</script>

<template>
  <div class="left-RPA">
    <div class="img-box">
      <k-carousel autoplay indicator-position="outside" arrow="never" :pause-on-hover="false" :interval="500000">
        <k-carousel-item>
          <img :src="bg1" draggable="false" />
          <div class="desc">
            <div class="blob-name">全面自动化</div>
            <div class="inner-name">ERP系统、浏览器、CRM、微信、钉钉， 以及您日常使用的其他任何应用程序。</div>
          </div>
        </k-carousel-item>
        <k-carousel-item style="height: 100%">
          <img :src="bg2" draggable="false" />
          <div class="desc">
            <div class="blob-name">可视化流程设计</div>
            <div class="inner-name">通过直观的拖拽式流程设计器， 轻松快捷地搭建自动化流程。</div>
          </div>
        </k-carousel-item>
        <k-carousel-item style="height: 100%">
          <img :src="bg3" draggable="false" />
          <div class="desc">
            <div class="blob-name">流程录制</div>
            <div class="inner-name">自动记录用户的操作，生成相应的自动化流程，简化流程搭建，提升效率。</div>
          </div>
        </k-carousel-item>
      </k-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left-RPA {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  width: 380px;
  height: 540px;
  .img-box {
    height: 100%;
    width: 100%;
    .el-carousel {
      height: 100%;
      :deep(.el-carousel__container) {
        height: 90%;
        .el-carousel__item {
          display: flex;
          flex-direction: column;
          justify-content: start;
          width: 100%;
          min-height: 460px;
          gap: 20px;
          align-items: center;
          img {
            width: 320px;
            aspect-ratio: 38/38;
            user-select: none; /* 防止选中 */
            -webkit-user-drag: none; /* Safari 和 Chrome */
            -khtml-user-drag: none; /* Konqueror HTML (KDE) */
          }
        }
      }
      :deep(.el-carousel__indicators) {
        .el-carousel__indicator {
          .el-carousel__button {
            background-color: #dfdcdf;
          }
        }
        .el-carousel__indicator.is-active {
          .el-carousel__button {
            background-color: #3477f5;
          }
        }
      }
    }

    .desc {
      height: 100px;
      overflow: hidden;
      .blob-name {
        width: 100%;
        text-align: center;
        opacity: 1;
        font-family: Alibaba PuHuiTi 3;
        font-size: 32px;
        font-weight: 600;
        line-height: normal;
        color: #111827;
      }
      .inner-name {
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        text-align: center;
        color: #6b7280;
      }
    }
  }
}
</style>
