<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <GoodsSku :skuId="skuId" :goods="goods" @changeSku="changeSku"/>
      <RabbitButton type="primary" size="mini" style="margin-left:60px" @click="sumbit">
        确认
      </RabbitButton>
    </div>
  </div>
</template>
<script>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { getSpecsAndSkus } from '@/api/cart'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { useStore } from 'vuex'
import { Message } from '@/components'
export default {
  name: 'CartSku',
  props: {
    attrsText: String,
    skuId: String
  },
  components: { GoodsSku },
  setup(props) {
    const visible = ref(false)
    const target = ref(null)
    const goods = ref({})
    const newSku = ref(null)
    const store = useStore()
    const toggle = () => {
      visible.value = !visible.value
    }
    onClickOutside(target, () => {
      visible.value = false
    })
    getSpecsAndSkus(props.skuId).then(({ result }) => {
      goods.value = result
    })
    const changeSku = (sku) => {
      newSku.value = sku
    }
    // 提交:传递给父组件的条件:1.选择的规格完整 2.渲染的规格发生了改变
    const sumbit = () => {
      if (newSku.value.id && newSku.value.id !== props.skuId) {
        store.dispatch('cart/updateCartSku', { newSku: newSku.value, oldSkuId: props.skuId })
      } else {
        Message({ type: 'warning', text: '请选择或修改商品规格' })
      }
    }
    return { visible, toggle, target, goods, changeSku, sumbit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
  }
}
</style>
