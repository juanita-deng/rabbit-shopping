<template>
  <div class="rabbit-pay-checkout-page">
    <div class="container">
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem to="/cart">购物车</RabbitBreadItem>
        <RabbitBreadItem >填写订单</RabbitBreadItem>
      </RabbitBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <Checkout-Address :list="preorderInfo?.userAddresses" @changeAddress="changeAddress"/>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody v-if="preorderInfo?.goods">
              <tr v-for="i in preorderInfo.goods" :key="i.id">
                <td>
                  <RouterLink :to="`/product/${i.id}`" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{i.name}}</p>
                      <p>{{i.attrsText}}</p>
                    </div>
                  </RouterLink>
                </td>
                <td>&yen;{{i.payPrice}}</td>
                <td>{{i.count}}</td>
                <td>&yen;{{i.totalPrice}}</td>
                <td>&yen;{{i.totalPayPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
         <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total" v-if="preorderInfo?.summary">
            <dl><dt>商品件数：</dt><dd>{{preorderInfo.summary.goodsCount}}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{preorderInfo.summary.totalPrice}}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{preorderInfo.summary.postFee}}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{preorderInfo.summary.totalPayPrice}}</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <RabbitButton type="primary" @click="submit">提交订单</RabbitButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findCheckoutInfo, createOrder } from '@/api/order'
import CheckoutAddress from './components/checkout-address'
import { provide, ref, reactive } from 'vue'
import { Message } from '@/components'
import { useRouter } from 'vue-router'
export default {
  name: 'RabbitPayCheckoutPage',
  components: { CheckoutAddress },
  setup() {
    const preorderInfo = ref(null)
    const getPreorderInfo = () => {
      findCheckoutInfo().then(({ result }) => {
        preorderInfo.value = result
        requestParams.goods = result.goods.map((item) => {
          return { skuId: item.skuId, count: item.count }
        })
      })
    }
    getPreorderInfo()
    provide('getPreorderInfo', getPreorderInfo)
    const changeAddress = (addressId) => {
      requestParams.addressId = addressId
    }
    // 需要提交的字段
    const requestParams = reactive({
      addressId: null,
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: '',
      goods: []
    })
    const router = useRouter()
    const submit = () => {
      createOrder(requestParams).then(({ result }) => {
        router.push(`/member/pay?id=${result.id}`)
      }).catch(({ response }) => {
        Message({ type: 'warning', text: response.data.message })
      })
    }
    return { preorderInfo, changeAddress, submit }
  }
}
</script>
<style scoped lang="less">
.rabbit-pay-checkout-page {
  /deep/.wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
