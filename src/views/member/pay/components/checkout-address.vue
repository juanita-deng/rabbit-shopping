<template>
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!defaultAddress?.id">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i/>货<i/>人：</span>{{defaultAddress.receiver}}</li>
                <li><span>联系方式：</span>{{defaultAddress.contact}}</li>
                <li><span>收货地址：</span>{{defaultAddress.fullLocation?.replace(/ /g,'')+defaultAddress.address}}</li>
              </ul>
              <a href="javascript:;" @click="target.open(defaultAddress)">修改地址</a>
            </div>
            <div class="action">
              <RabbitButton class="btn" @click="showDialog=true">切换地址</RabbitButton>
              <RabbitButton class="btn" @click="target.open()">添加地址</RabbitButton>
            </div>
            <RabbitDialog title="切换收货地址" v-model:visible="showDialog">
              <div v-if="list.length === 0">暂无更多地址</div>
              <div :class="['text item',{active:item.id === selectAdrress?.id} ]" v-for="item in list" :key="item.id" @click="selectAdrress = item">
                <ul>
                  <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
                  <li><span>联系方式：</span>{{item.contact}}</li>
                  <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
                </ul>
              </div>
              <template #footer >
                <div v-if="list.length">
                  <RabbitButton type="gray" style="margin-right:20px" @click="showDialog = false">取消</RabbitButton>
                  <RabbitButton type="primary" @click="confirm">确认</RabbitButton>
                </div>
              </template>
            </RabbitDialog>
            <checkout-edit ref="target"/>
          </div>
        </div>
</template>

<script>
import { ref, watch, provide } from 'vue'
import checkoutEdit from './checkout-edit.vue'
export default {
  components: { checkoutEdit },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['changeAddress'],
  setup(props, { emit }) {
    /**
     * 确认默认的收获地址
     *    1.从list中查找isDefault为0的默认地址
     *    2.如果没有,把数组的第一项作为默认的收货地址
     */
    const defaultAddress = ref({})
    const showDialog = ref(false)
    const isDefault = props.list.find((v) => v.isDefault === 0)
    watch(() => props.list, () => {
      if (isDefault?.id) {
        defaultAddress.value = isDefault
      } else {
        defaultAddress.value = { ...props.list[0] }
      }
    }, {
      immediate: true, deep: true
    })
    const selectAdrress = ref(null)
    const confirm = () => {
      showDialog.value = false
      defaultAddress.value = selectAdrress.value
      emit('changeAddress', defaultAddress.value.id)
    }
    const target = ref(null)
    const editShowAddress = (address) => {
      defaultAddress.value = address
      selectAdrress.value = address
    }
    editShowAddress()
    provide('editShowAddress', editShowAddress)
    return { defaultAddress, showDialog, confirm, selectAdrress, target }
  }
}
</script>

<style lang="less" scoped>
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
     border: 1px solid #f5f5f5;
     margin-bottom: 10px;
     cursor: pointer;
     &.active,&:hover {
       border-color: @xtxColor;
       background: lighten(@xtxColor,50%);
     }
     > ul {
       padding: 10px;
       font-size: 14px;
     }
   }
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
