<template>
   <div class="detail-logistics">
    <p>
      <span>{{logistics?.list[0].time}}</span>
      <span>{{ logistics?.list[0].text}} 已收入</span>
    </p>
    <a href="javascript:;" @click="show">查看物流</a>
  </div>
  <Teleport to="body">
      <OrderLogistics ref="logisticsDom" />
    </Teleport>
</template>

<script>
import { logisticsOrder } from '@/api/order'
import { ref } from 'vue'
import OrderLogistics from './order-logistics.vue'
export default {
  name: 'detail-logistics',
  components: { OrderLogistics },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  // setup默认不允许添加async,如果要添加,就必须搭配suspense组件实用
  async setup(props, context) {
    console.log('props', props.order)
    const logistics = ref(null)
    const logisticsDom = ref(null)
    const res = props.order?.id && await logisticsOrder(props.order.id)
    logistics.value = res?.result
    // console.log('res', res)
    const show = () => {
      logisticsDom.value.open(props.order)
    }
    return { logistics, show, logisticsDom }
  }

}
</script>

<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
