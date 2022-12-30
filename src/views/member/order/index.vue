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
      @deleteOrder="deleteOrder"
      @confirmOrder="confirmOrder"
      @checkLogistics="checkLogistics"
    />
    <!-- 取消订单 -->
    <OrderCancel ref="target" />
    <!-- 查看物流 -->
    <OrderLogistics ref="logisticsDom" />
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
import { findOrderList, delteOrder } from '@/api/order'
import OrderPanel from './components/order-panel.vue'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
import { Confirm, Message } from '@/components'
export default {
  name: 'RabbitOrder',
  components: {
    OrderPanel,
    OrderCancel,
    OrderLogistics
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
    // 取消订单
    const cancelOrder = (order) => {
      target.value.open(order)
    }
    // 删除订单
    const deleteOrder = (order) => {
      Confirm({ text: '确定要删除该笔订单吗?' })
        .then(() => {
          delteOrder([order.id]).then(() => {
            Message({ text: '删除成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    // 确认收货
    /**
     * 温馨提示：
     * 接口服务器地址 + member/order/consignment/ + 订单ID
     * https://apipc-xiaotuxian-front.itheima.net/member/order/consignment/1423804938656878594
     * 改成已发货状态，后面订单号改成，自己的订单编号。
     */
    const confirmOrder = (order) => {
      Confirm({ text: '确定要收货吗?' })
        .then(() => {
          delteOrder(order.id).then(() => {
            Message({ text: '确认收货成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    // 查看物流
    const logisticsDom = ref(null)
    const checkLogistics = (order) => {
      logisticsDom.value.open(order)
    }
    const getOrderList = () => {
      loading.value = true
      findOrderList(reqParm).then(({ result }) => {
        loading.value = false
        orderList.value = result
      })
    }
    watch(
      () => reqParm,
      () => {
        getOrderList()
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
      target,
      deleteOrder,
      confirmOrder,
      checkLogistics,
      logisticsDom
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
