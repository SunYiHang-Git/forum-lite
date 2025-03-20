<script setup lang="ts">
const { historyData } = defineProps<{
  historyData: any
}>()

const goBack = () => {
  historyData.goBack()
}
</script>

<template>
  <div class="history-version">
    <div class="top-title">
      <div class="back" @click="goBack"><IconLeft /></div>
      <div class="title">版本历史记录</div>
    </div>
    <div class="hr"></div>
    <div class="history-main">
      <div v-for="item in historyData.list" :key="item.ID" class="version-box">
        <div class="left">
          <div class="version">{{ item.Version }}</div>
          <div class="desc-box">
            <!-- "个金拓客维客"是工商银行推出的一款综合金融服务应用。这款应用旨在提供一站式的金融解决方案，满足用户的多元化需求。
            首先，它提供了全面的在线银行业务，包括查询余额、转账、支付账单等功能，使得用户可以随时随地进行金融交易，无需前往实体银行，大大提高了银行业务的便捷性。
            其次，"个金拓客维客"还提供了投资和理财服务。用户可以在应用中购买和管理各种投资产品，如基金、股票和债券等，这使得用户可以更加轻松地进行资金管理和增值。
            此外，"个金拓客维客"还提供了在线客户服务，包括答疑解惑、投诉处理等，以确保用户在使用过程中遇到任何问题都能得到及时解决。
            总的来说，"个金拓客维客"是一款全方位的金融服务应用，它将银行业务、投资理财和客户服务等功能集于一身，为用户提供了一种方便、高效的金融服务方式。然而，具体的功能和服务可能会有所不同，建议用户直接查阅工商银行的官方资源以安装最准确的信息。 -->
            {{ item.Desc }}
          </div>
        </div>
        <div class="time">{{ item.PublishTime }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history-version {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 600px;
  min-height: 300px;
  .top-title {
    display: flex;
    align-items: center;
    height: 30px;
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      font-size: 25px;
      cursor: pointer;
    }
    .title {
      font-family: Alibaba PuHuiTi 3;
      font-size: 24px;
      font-weight: bold;
      color: #0f0b1c;
    }
  }
  .hr {
    margin-top: 18px;
    margin-left: 30px;
    height: 2px;
    background-color: var(--k-border-color);
  }
  .history-main {
    flex: 1;
    min-height: 100px;
    box-sizing: border-box;
    padding-left: 30px;
    overflow: auto;
    .version-box {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 20px;
      margin-top: 30px;
      min-height: 50px;
      .time {
        width: 100px;
        text-align: right;
        font-family: Alibaba PuHuiTi 2;
        font-size: 14px;
        color: #a3a3a3;
        font-weight: normal;
      }
      .left {
        flex: 1;
        min-width: 200px;
        min-height: 10px;
        .version {
          margin-bottom: 16px;
          font-family: Alibaba PuHuiTi 3;
          font-size: 16px;
          font-weight: bold;
          color: #171717;
        }
        .desc-box {
          min-height: 1px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--k-border-color);
        }
      }
    }
  }
}
</style>
