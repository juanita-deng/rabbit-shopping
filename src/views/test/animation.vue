<template>
  <button @click="handleClick">显隐</button>
  <transition name="bounce">
    <div class="test" v-show="show">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
      asperiores necessitatibus eaque quia nam, recusandae temporibus itaque
      accusamus quibusdam! Excepturi laboriosam recusandae impedit fugit
      accusantium labore magni rem numquam veritatis?
    </div>
  </transition>
  <hr />
  <button @click="shake = !shake">摇晃</button>
  <Transition name="shake">
    <div class="shake" v-if="shake">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil tenetur
      libero deserunt nemo voluptatum adipisci, vero omnis maxime. Illo
      voluptatum velit, nobis blanditiis quaerat minima tenetur similique! Harum
      aliquam in sapiente iure eos quos eligendi architecto magnam quas quae ab
      ipsa, cum, facilis voluptas iste! Mollitia ipsam rem deleniti sed.
    </div>
  </Transition>
</template>
<script>
import { ref } from 'vue'
export default {
  /** 若是动画的话只有两个类名
   * - 进入（显示，创建）
   *   v-enter-active 进入中
   * - 离开（隐藏，移除）
   *   v-leave-active 进入中
   */
  setup() {
    const show = ref(true)
    const shake = ref(true)
    const handleClick = () => {
      show.value = !show.value
    }
    return { show, handleClick, shake }
  }
}
</script>
<style scoped lang="less">
.test,
.shake {
  width: 400px;
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.bounce-leave-active {
  animation: bounce 1s reverse ease-in;
}
.bounce-enter-active {
  animation: bounce 1s ease-out both;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
