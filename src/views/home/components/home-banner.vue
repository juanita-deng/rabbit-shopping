<template>
  <div class="home-banner">
    <!-- 轮播图
     autoPlay 控制是否自动播放
     duration 轮播图切换的市场
    -->
    <RabbitCarousel :swiperList="swiperList" autoPlay :duration="1000" />
  </div>
</template>
<script>
import { getBannerList } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'home-banner',
  setup() {
    const swiperList = ref([])
    getBannerList().then(({ result }) => {
      swiperList.value = result
    })
    return { swiperList }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  // background-color: pink;
  ::v-deep .xtx-carousel {
    .carousel-btn.prev {
      left: 270px;
    }
    .carousel-indicator {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
