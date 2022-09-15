<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 中间轮播图 -->
        <HomeBanner />
      </div>
      <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <template #right><RabbitMore /></template>
        新鲜好物内容
      </HomePanel>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomePanel from './components/home-panel.vue'
export default {
  name: 'home',
  components: { HomeCategory, HomeBanner, HomePanel }
}
</script>
<style lang="less" scoped></style>
