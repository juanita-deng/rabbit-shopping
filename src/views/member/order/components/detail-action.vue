<template>
  <div class="detail-action">
    <div class="state">
      <span
        :class="[`iconfont icon-order-${orderStatus[order.orderState]?.name}`]"
      />
      <p>{{ orderStatus[order.orderState]?.label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!--
        1. 待付款：立即付款，取消订单
        2. 待发货：再次购买
        3. 待收货：确认收货，再次购买
        4. 待评价：评价商品，再次购买，申请售后
        5. 已完成：查看评价，再次购买，申请售后
        6. 已取消：
        -->
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <RabbitButton
          @click="$router.push('/member/pay?id=' + order.id)"
          type="primary"
          size="small"
          style="margin-right: 10px"
        >
          立即付款
        </RabbitButton>
        <RabbitButton type="gray" size="small">取消订单</RabbitButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <RabbitButton type="primary" size="small">再次购买</RabbitButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <RabbitButton type="primary" size="small" style="margin-right: 10px">
          确认收货
        </RabbitButton>
        <RabbitButton type="plain" size="small">再次购买</RabbitButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <RabbitButton type="primary" size="small" style="margin-right: 10px">
          再次购买
        </RabbitButton>
        <RabbitButton type="plain" size="small" style="margin-right: 10px">
          评价商品
        </RabbitButton>
        <RabbitButton type="gray" size="small">申请售后</RabbitButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <RabbitButton type="primary" size="small" style="margin-right: 10px">
          再次购买
        </RabbitButton>
        <RabbitButton type="plain" size="small" style="margin-right: 10px">
          查看评价
        </RabbitButton>
        <RabbitButton type="gray" size="small">申请售后</RabbitButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constant'
export default {
  name: 'OrderDetailAction',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    return { orderStatus }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
