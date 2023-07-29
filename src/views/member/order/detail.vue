<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 -->
    <RabbitSteps :active="order.orderState === 6 ? 1 : order.orderState">
      <RabbitStep title="提交订单" :desc="order.createTime" />
      <RabbitStep title="付款成功" :desc="order.payTime" />
      <RabbitStep title="商品发货" :desc="order.consignTime" />
      <RabbitStep title="确认收货" :desc="order.evaluationTime" />
      <RabbitStep title="订单完成" :desc="order.endTime" />
    </RabbitSteps>
    <!-- 物流栏 -->
    <Suspense>
       <template #default>
         <DetailLogistics :order="order"/>
       </template>
       <template #fallback>loading...</template>
    </Suspense>
    <!-- 订单商品信息 -->
    <DetailGoods :order="order"></DetailGoods>
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import DetailLogistics from './components/detail-logistics.vue'
import DetailGoods from './components/detail-goods.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { findOrder } from '@/api/order'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailLogistics, DetailGoods },
  setup() {
    const order = ref({})
    const route = useRoute()
    findOrder(route.params.id).then((data) => {
      order.value = data.result
    })
    return {
      order
    }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
