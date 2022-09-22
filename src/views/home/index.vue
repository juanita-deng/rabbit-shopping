<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 中间轮播图 -->
        <HomeBanner />
      </div>
      <!-- 新鲜好物 -->
      <HomeFresh />
      <!-- 人气推荐 -->
      <HomeHot />
      <!-- 热门品牌 -->
      <HomeBrand />
      <!-- 商品区域 -->
      <HomeProduct />
    </div>
  </div>
</template>
<script>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeFresh from './components/home-fresh.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
export default {
  name: 'home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeFresh,
    HomeHot,
    HomeBrand,
    HomeProduct
  }
}
</script>
<style lang="less" scoped></style>
