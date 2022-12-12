<template>
  <div class="xtx-cart-page">
    <div class="container">
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem>购物车</RabbitBreadItem>
      </RabbitBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <RabbitCheckbox
                  :modelValue="$store.getters['cart/isCheckedAll']"
                  @change="changeAll"
                >
                  全选
                </RabbitCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody v-if="$store.getters['cart/validCartList'].length > 0">
            <tr
              v-for="item in $store.getters['cart/validCartList']"
              :key="item.skuId"
            >
              <td>
                <RabbitCheckbox
                  :modelValue="item.selected"
                  @change="changeChecked(item.skuId, $event)"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <!-- 选择规格组件 -->
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ (+item.nowPrice).toFixed(2) }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价
                  <span class="red">
                    &yen;{{ (item.price - item.nowPrice).toFixed(2) }}
                  </span>
                </p>
              </td>
              <td class="tc">
                <RabbitNumbox label="" :modelValue="item.count" @change="changeCount(item.skuId,$event)"/>
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * item.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(item.skuId)"
                  >
                    删除
                  </a>
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidCartList'].length > 0">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="item in $store.getters['cart/invalidCartList']"
              :key="item.skuId"
            >
              <td><RabbitCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ (item.nowPrice * item.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(item.skuId)"
                  >
                    删除
                  </a>
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <RabbitCheckbox
            :modelValue="$store.getters['cart/isCheckedAll']"
            @change="changeAll"
          >
            全选
          </RabbitCheckbox>
          <a href="javascript:;" @click="batchDeleteCart()">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品， 已选择
          {{ $store.getters['cart/selectedTotal'] }}件， 商品合计：
          <span class="red">¥{{ $store.getters['cart/selectedAmount'] }}</span>
          <RabbitButton type="primary">下单结算</RabbitButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRecommend />
    </div>
  </div>
</template>
<script>
import GoodsRecommend from '@/views/goods/components/goods-recommend.vue'
import CartNone from './components/cart-none.vue'
import { Confirm } from '@/components'
import { useStore } from 'vuex'
export default {
  name: 'RabbitCartPage',
  components: { GoodsRecommend, CartNone },
  setup() {
    const store = useStore()
    const changeChecked = (skuId, val) => {
      store.dispatch('cart/updateChange', { skuId, selected: val })
    }
    const changeCount = (skuId, count) => {
      store.dispatch('cart/updateChange', { skuId, count: count })
    }
    const changeAll = (selected) => {
      store.dispatch('cart/updateChangeAll', selected)
    }
    const deleteCart = (skuId) => {
      Confirm({ text: '您确认从购物车删除该商品吗？' })
        .then(() => {
          store.dispatch('cart/deleteCart', skuId)
        })
        .catch(() => {
          // console.log('取消')
        })
    }
    const batchDeleteCart = (isClear) => {
      Confirm({ text: `您确定要${isClear ? '清空失效' : '删除选中'}的商品嘛` })
        .then(() => {
          store.dispatch('cart/batchDeleteCart', isClear)
        })
        .catch(() => {
          // console.log('取消')
        })
    }
    return { changeChecked, changeAll, deleteCart, batchDeleteCart, changeCount }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
