<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的Rabbit-carousel.vue -->
    <RabbitCarousel :swiperList="swiperList" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { findRelGoods } from '@/api/product'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String
    }
  },
  setup(props) {
    const swiperList = ref([])
    findRelGoods(props.goodsId).then(({ result }) => {
      const num = 4
      const total = Math.ceil(result.length / num)
      for (let i = 0; i < total; i++) {
        // swiperList.value = result 需改造数据,格式为:[[1,2,3,4],[5,6,7,8],[9,..]]
        swiperList.value.push(result.slice(i * num, (i + 1) * num)) // 第一次:1~4(0,4),第二次:5~8(4,8)...,每次截取num个
      }
    })
    return { swiperList }
  }
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
// 商品详情-商品推荐中商品轮播样式覆盖
:deep(.xtx-carousel) {
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
