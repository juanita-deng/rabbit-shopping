<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <GoodsBread :goods="goods" />
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" v-if="goods.mainPictures" />
        </div>
        <div class="spec"></div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRecommend />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRecommend from './components/goods-recommend.vue'
import GoodsBread from './components/goods-bread.vue'
import GoodsImage from './components/goods-image.vue'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'RabbitGoods',
  components: { GoodsRecommend, GoodsBread, GoodsImage },
  setup() {
    const goods = useGoods()
    return { goods }
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
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
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
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
