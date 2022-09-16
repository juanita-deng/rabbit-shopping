<template>
  <button @click="handleClick">显隐</button>
  <transition>
    <div class="test" v-show="show"></div>
  </transition>
  <hr />
  <button @click="show1 = !show1">有名称的动画</button>
  <!-- 多个transition使用不同动画，可以添加name属性，name属性的值替换v即可。 -->
  <transition name="fade">
    <div class="test1" v-if="show1"></div>
  </transition>
</template>
<script>
import { ref } from 'vue'
export default {
  /**
   * - 进入（显示，创建）
   *   v-enter-from 进入前 （vue2.0 v-enter）
   *   v-enter-active 进入中
   *   v-enter-to 进入后
   * - 离开（隐藏，移除）
   *   v-leave-from 进入前 （vue2.0 v-leave）
   *   v-leave-active 进入中
   *   v-leave-to 进入后
   */
  setup() {
    const show = ref(true)
    const show1 = ref(true)
    const handleClick = () => {
      show.value = !show.value
    }
    return { show, handleClick, show1 }
  }
}
</script>
<style scoped lang="less">
.test,
.test1 {
  width: 100px;
  height: 100px;
  background-color: pink;
}
.v-leave-to,
.v-enter-from {
  opacity: 0;
}
.v-leave-active,
.v-enter-active {
  transition: all 2s;
}
.v-leave-from,
.v-enter-to {
  opacity: 1;
}
.fade-leave-to,
.fade-enter-from {
  transform: translateX(-100px);
}
.fade-leave-from,
.fade-enter-to {
  transform: translateX(0);
}

.fade-leave-active,
.fade-enter-active {
  transition: all 2s;
}
</style>
