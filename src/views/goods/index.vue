<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <GoodsBread :goods="goods" />
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" v-if="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku
            v-if="goods.skus"
            :goods="goods"
            skuId="1369155864430120962"
            @changeSku="changeSku"
          />
          <!-- 数量选择组件 -->
          <RabbitNumbox v-model="num" :max="goods.inventory" />
          <RabbitButton type="primary" style="margin-top: 20px" @click="addCar">
            加入购物车
          </RabbitButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRecommend :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTab :commentCount="goods.commentCount" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsAside
            v-for="item in asideList"
            :key="item.id"
            :title="item.title"
            :type="item.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import { provide, ref, watch } from 'vue'
import GoodsRecommend from './components/goods-recommend.vue'
import GoodsBread from './components/goods-bread.vue'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTab from './components/goods-tab.vue'
import GoodsWarn from './components/goods-warn.vue'
import GoodsAside from './components/goods-aside.vue'
import { Message } from '@/components'
import { useStore } from 'vuex'
export default {
  name: 'RabbitGoods',
  components: {
    GoodsRecommend,
    GoodsBread,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTab,
    GoodsWarn,
    GoodsAside
  },
  setup() {
    const goods = useGoods()
    const currentSku = ref({})
    const changeSku = (selectedSku) => {
      goods.value.price = selectedSku.price
      goods.value.oldPrice = selectedSku.oldPrice
      goods.value.inventory = selectedSku.inventory
      currentSku.value = selectedSku
    }
    const num = ref(1)
    const store = useStore()
    const asideList = ref([
      { id: 1, title: '24小时热榜' },
      { id: 2, title: '周热榜' },
      { id: 3, title: '总热榜' }
    ])
    const addCar = () => {
      if (!currentSku.value.id) {
        Message({ type: 'warning', text: '请选择全部规格后加入购物车' })
        return
      }
      const selectedSku = {
        id: goods.value.id,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        price: goods.value.price,
        count: num.value,
        skuId: currentSku.value.id,
        attrsText: currentSku.value.specs.reduce((pre, cur) => `${pre} ${cur.name}:${cur.valueName}`, ''),
        selected: false,
        nowPrice: goods.value.price,
        stock: goods.value.inventory,
        isEffective: true
      }
      store.dispatch('cart/insertCart', selectedSku)
        .then(() => {
          Message({ text: '成功加入购物车' })
        }).catch(() => {
          Message({ text: '加入购物车失败', type: 'error' })
        })
    }
    return { goods, changeSku, num, asideList, addCar }
  }
}
// 获取商品详情数据
const useGoods = () => {
  const goods = ref({})
  const route = useRoute()
  watch(
    () => route.params.id,
    (value) => {
      if (!route.path.includes('/product')) return
      findGoods(value).then(({ result }) => {
        goods.value = result
      })
    },
    { immediate: true }
  )
  provide('goods', goods)
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
