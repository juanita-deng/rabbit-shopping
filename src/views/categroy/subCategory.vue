<template>
  <div class="sub-category container">
    <!-- 面包屑 -->
    <SubBread></SubBread>
    <!-- 筛选区域 -->
    <SubFilter @changeFilter="changeFilter"></SubFilter>
    <!-- 排序组件 -->
    <div class="goods-list">
      <SubSort @changeSort="changeSort"></SubSort>
    </div>
    <!-- 商品列表 -->
    <ul>
      <li v-for="goods in goodsList" :key="goods">
        <GoodsItem :goods="goods" />
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
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
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
    const route = useRoute()
    const goodsList = ref([])
    let reqParam = {
      categoryId: route.params.id,
      page: 1,
      pageSize: 10
    }
    const onLoad = () => {
      findSubCategoryGoods(reqParam).then(({ result }) => {
        if (result.items.length < reqParam.pageSize) {
          finished.value = true // 加载完毕
        }
        goodsList.value = [...goodsList.value, ...result.items]
        reqParam.page++
        loading.value = false
      })
    }
    const changeSort = (req) => {
      reset(req)
    }
    const changeFilter = (req) => {
      reset(req)
    }
    const reset = (req) => {
      reqParam = { ...reqParam, ...req }
      reqParam.page = 1
      goodsList.value = []
      finished.value = false
    }
    return {
      loading,
      finished,
      onLoad,
      goodsList,
      changeSort,
      changeFilter
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
