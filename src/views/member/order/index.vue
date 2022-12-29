<template>
  <RabbitTabs v-model="active" @tabClick="tabClick">
    <RabbitTabsPanel
      v-for="i in orderStatus"
      :key="i.name"
      :label="i.label"
      :name="i.name"
    />
  </RabbitTabs>
  <!-- 订单列表 -->
  <div class="order-list">
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.items.length === 0">
      暂无数据
    </div>
    <OrderPanel
      v-for="order in orderList.items"
      :key="order.id"
      :order="order"
      @cancelOrder="cancelOrder"
    />
    <OrderCancel ref="target"/>
  </div>
  <RabbitPagination
    :pageSize="reqParm.pageSize"
    :currentPage="reqParm.page"
    :total="orderList.counts"
    @changePage="changePage"
  />
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constant'
import { findOrderList } from '@/api/order'
import OrderPanel from './components/order-panel.vue'
import OrderCancel from './components/order-cancel.vue'
export default {
  name: 'RabbitOrder',
  components: {
    OrderPanel,
    OrderCancel
  },
  setup() {
    const active = ref('all')
    const tabClick = ({ index }) => {
      reqParm.orderState = index
      reqParm.page = 1
    }
    const reqParm = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    const orderList = ref({})
    const loading = ref(false)
    const changePage = (val) => {
      reqParm.page = val
    }
    const target = ref(null)
    const cancelOrder = (order) => {
      target.value.open(order)
    }
    watch(
      () => reqParm,
      () => {
        loading.value = true
        findOrderList(reqParm).then(({ result }) => {
          loading.value = false
          orderList.value = result
        })
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      active,
      tabClick,
      orderStatus,
      orderList,
      reqParm,
      loading,
      changePage,
      cancelOrder,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(~@/assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
