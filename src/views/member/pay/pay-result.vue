<template>
  <div class="xtx-pay-page">
    <div class="container">
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem to="/cart">购物车</RabbitBreadItem>
        <RabbitBreadItem>支付结果</RabbitBreadItem>
      </RabbitBread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <!-- <span class="iconfont icon-shanchu red" ></span> -->
        <p class="tit">订单支付成功</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>微信支付</span></p>
        <p>支付金额：<span>{{ order.totalMoney }}</span></p>
        <div class="btn">
          <RabbitButton type="primary" style="margin-right:20px">查看订单</RabbitButton>
          <RabbitButton type="gray">进入首页</RabbitButton>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'RabbitPayResultPage',
  setup() {
    const route = useRoute()
    const order = ref({})
    findOrder(route.query.orderId).then(({ result }) => {
      order.value = result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
