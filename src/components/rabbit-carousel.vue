<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li
        :class="['carousel-item', { fade: active === index }]"
        v-for="(item, index) in swiperList"
        :key="item.id"
      >
        <!-- 首页图片轮播 -->
        <RouterLink :to="item.hrefUrl" v-if="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <!-- 商品详情-商品轮播 -->
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a
      href="javascript:;"
      class="carousel-btn prev"
      :class="{ disabled: active === 0 }"
      @click="prev"
    >
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a
      href="javascript:;"
      class="carousel-btn next"
      :class="{ disabled: active === 1 }"
      @click="next"
    >
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span
        :class="{ active: active === index }"
        v-for="(item, index) in swiperList"
        @mouseenter="active = index"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  props: {
    swiperList: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  name: 'RabbitCarousel',
  setup(props, context) {
    const active = ref(0)
    const prev = () => {
      if (active.value === 0) {
        active.value = props.swiperList.length - 1
      } else {
        active.value--
      }
    }
    const next = () => {
      if (active.value === props.swiperList.length - 1) {
        active.value = 0
      } else {
        active.value++
      }
    }
    let timer = null
    const play = () => {
      if (!props.autoPlay) return
      clearInterval(timer) // 防止开启多个定时器
      timer = setInterval(() => {
        next()
      }, props.duration)
    }
    const stop = () => {
      clearInterval(timer)
    }
    // 页面开始时开启自动播放
    onMounted(() => play())
    // 组件销毁时关闭自动播放
    onUnmounted(() => stop())
    return { active, prev, next, play, stop }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
  // 轮播商品
  .slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a {
      width: 240px;
      text-align: center;
      img {
        padding: 20px;
        width: 230px !important;
        height: 230px !important;
      }
      .name {
        font-size: 16px;
        color: #666;
        padding: 0 40px;
      }
      .price {
        font-size: 16px;
        color: @priceColor;
        margin-top: 15px;
      }
    }
  }
}
</style>
