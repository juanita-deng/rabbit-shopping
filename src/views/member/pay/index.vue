<template>
  <div class="xtx-pay-page">
    <div class="container">
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem to="/cart">购物车</RabbitBreadItem>
        <RabbitBreadItem>支付订单</RabbitBreadItem>
      </RabbitBread>
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span>{{formTime(showTime)}}</span>, 超时后将取消订单</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{payInfo.totalMoney}}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="alipayUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useCountDown } from '@/hooks'
import dayjs from 'dayjs'
import { baseURL } from '@/utils/request'
export default {
  name: 'RabbitPayPage',
  setup() {
    const route = useRoute()
    const payInfo = ref({})
    const showTime = ref(null)
    findOrder(route.query.id).then(({ result }) => {
      payInfo.value = result
      const { count, start } = useCountDown(result.countdown)
      start()
      watch(count, () => {
        showTime.value = count.value
      }, { immediate: true })
    })
    const formTime = (time) => {
      return dayjs.unix(time).format('mm分ss秒')
    }
    /**
     * 买家账号jfjbwb4477@sandbox.com
     *     登录密码111111
     *     支付密码111111
     */
    const alipayUrl = computed(() => {
      if (payInfo.value) {
        // 准备支付地址
        const payUrl = baseURL + 'pay/aliPay'
        // 回跳地址
        const redirectUrl = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
        return `${payUrl}?orderId=${payInfo.value.id}&redirect=${redirectUrl}`
      } else {
        return 'javascript:;'
      }
    })
    return { payInfo, showTime, formTime, alipayUrl }
  }
}
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
</style>
