<!-- !!!注意:render动态渲染的组件RabbitBread内不要加注释,否则也会当成元素渲染 -->
<template>
  <!-- 面包屑 -->
  <RabbitBread separatorClass="icon-angle-right">
    <RabbitBreadItem to="/">首页</RabbitBreadItem>
    <RabbitBreadItem :to="`/category/${category?.id}`">
      {{ category?.name }}
    </RabbitBreadItem>
  </RabbitBread>
  <!-- 轮播图 -->
  <RabbitCarousel :swiperList="swiperList" style="height: 500px" />
</template>
<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getBannerList } from '@/api/home'
export default {
  name: 'category',
  setup() {
    const store = useStore()
    const route = useRoute()
    const swiperList = ref([])
    const category = computed(() => {
      return store.state.category.list.find((v) => v.id === route.params.id)
    })
    getBannerList().then(({ result }) => {
      swiperList.value = result
    })
    return { category, swiperList }
  }
}
</script>
<style lang="less" scoped></style>
