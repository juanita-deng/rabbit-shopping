<template>
  <div class="goods-image">
    <!-- 放大镜展示的图片 -->
    <div
      class="large"
      v-show="isShow"
      :style="{
        backgroundImage: `url(${images[current]})`,
        backgroundPosition: `${-2 * layer.x}px ${-2 * layer.y}px`
      }"
    />
    <!-- 中间展示的图片 -->
    <div class="middle" ref="target">
      <img :src="images[current]" alt="" />
      <!-- 移动的遮罩 -->
      <div
        class="layer"
        v-show="isShow"
        :style="{ left: `${layer.x}px`, top: `${layer.y}px` }"
      />
    </div>
    <ul class="small">
      <li
        v-for="(item, index) in images"
        :key="index"
        :class="{ active: index === current }"
        @mouseenter="current = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, computed, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const current = ref(0)
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    const layer = reactive({
      x: 0,
      y: 0
    })
    // 控制放大镜遮罩和放大图片的显示和隐藏
    const isShow = computed(() => {
      return !isOutside.value // 注意:返回的elementX, elementY, isOutside是个响应式数据
    })
    watch([elementX, elementY], (val) => {
      let x = elementX.value - 100 // 减去遮罩盒子宽高的一半
      let y = elementY.value - 100
      if (x < 0) x = 0 // 限定左侧范围
      if (y < 0) y = 0 // 限定上侧范围
      if (x > 200) x = 200 // 限定右侧范围  200为遮罩盒子的高度
      if (y > 200) y = 200 // 限定下侧范围
      layer.x = x
      layer.y = y
    })
    return {
      current,
      target,
      isShow,
      layer
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
