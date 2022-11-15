<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <GoodsItem v-for="item in hotList" :key="item.id" :goods="item" />
  </div>
</template>
<script>
import GoodsItem from '@/views/categroy/components/goods-item.vue'
import { findHotGoods } from '@/api/product'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsAside',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: '24小时热榜'
    }
  },
  setup(props) {
    const route = useRoute()
    const hotList = ref([])
    watch(
      () => route.params.id,
      (val) => {
        findHotGoods(val, props.type).then(({ result }) => {
          hotList.value = result
        })
      },
      {
        immediate: true
      }
    )
    return { hotList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep .goods-item {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
