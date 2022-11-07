<template>
  <div class="sub-category container">
    <!-- 面包屑 -->
    <SubBread></SubBread>
    <!-- 筛选区域 -->
    <SubFilter></SubFilter>
    <!-- 排序组件 -->
    <div class="goods-list">
      <SubSort></SubSort>
    </div>
    <!-- 商品列表 -->
    <ul>
      <li v-for="i in 20" :key="i">
        <GoodsItem :goods="{}" />
      </li>
    </ul>
    <!-- 无限加载组件 -->
    <RabbitInfiniteLoad
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
    />
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref } from 'vue'
export default {
  name: 'subCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const onLoad = () => {
      setTimeout(() => {
        console.log('加载更多数据')
        finished.value = true
        loading.value = false
      }, 1000)
    }
    return {
      loading,
      finished,
      onLoad
    }
  }
}
</script>
<style lang="less" scoped>
.sub-category {
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
