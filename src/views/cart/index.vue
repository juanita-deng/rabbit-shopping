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
                <RabbitNumbox label="" :modelValue="item.count" />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * item.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
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
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <RabbitCheckbox>全选</RabbitCheckbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
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
import { useStore } from 'vuex'
export default {
  name: 'RabbitCartPage',
  components: { GoodsRecommend },
  setup() {
    const store = useStore()
    const changeChecked = (skuId, val) => {
      store.dispatch('cart/updateChecked', { skuId, selected: val })
    }
    const changeAll = (selected) => {
      store.dispatch('cart/updateChangeAll', selected)
    }
    return { changeChecked, changeAll }
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
