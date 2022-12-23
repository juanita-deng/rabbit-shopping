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
    <OrderPanel
      v-for="order in orderList.items"
      :key="order.id"
      :order="order"
    />
  </div>
  <RabbitPagination />
</template>

<script>
import { reactive, ref } from 'vue'
import { orderStatus } from '@/api/constant'
import { findOrderList } from '@/api/order'
import OrderPanel from './components/order-panel.vue'
export default {
  name: 'RabbitOrder',
  components: {
    OrderPanel
  },
  setup() {
    const active = ref('all')
    const tabClick = ({ name, label }) => {
      console.log('name', name, label)
    }
    const reqParm = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0
    })
    const orderList = ref({})
    findOrderList(reqParm).then(({ result }) => {
      console.log('res', result)
      orderList.value = result
    })
    return { active, tabClick, orderStatus, orderList }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
