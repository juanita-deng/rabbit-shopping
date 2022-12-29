<template>
  <RabbitDialog title="取消订单" v-model:visible="visibleDialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a v-for="item in cancelReason" :key="item" @click="curText = item" :class="{active: item === curText}"> {{ item }} </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <RabbitButton type="gray" style="margin-right: 20px" @click="visibleDialog = false">取消</RabbitButton>
      <RabbitButton type="primary" @click="submit">确认</RabbitButton>
    </template>
  </RabbitDialog>
</template>
<script>
import { ref } from 'vue'
import { cancelReason } from '@/api/constant'
import { cancelOrder } from '@/api/order'
import { Message } from '@/components'
export default {
  name: 'OrderCancel',
  setup() {
    const visibleDialog = ref(false)
    const cancelOrders = ref(null)
    // 打开对话框，提供给其他组件调用
    const open = (order) => {
      visibleDialog.value = true
      // 记录订单ID
      cancelOrders.value = order
      // 清除之前选中原因
      curText.value = ''
      // 更新订单状态
      order.value.orderState = 6
    }
    // 选中的取消原因
    const curText = ref('')
    const submit = () => {
      if (!curText.value) return Message({ type: 'warning', text: '请选择取消订单的原因' })
      cancelOrder({ orderId: cancelOrders.value.id, cancelReason: curText.value }).then((res) => {
        Message({ text: '取消成功' })
      }).catch(({ response }) => {
        Message({ type: 'error', text: response.data.message })
      })
    }

    return { visibleDialog, cancelReason, curText, open, submit }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
