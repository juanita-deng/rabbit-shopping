<template>
  <!-- tabs装载的内容 -->
  <div class="rabbit-tabs-panel" v-show="activeName === name">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue-demi'
export default {
  name: 'RabbitTabsPanel',
  props: {
    // 标题
    label: {
      type: String,
      default: ''
    },
    // 唯一标识
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 当前高亮的tab名称
    const activeName = inject('activeName')
    return { activeName }
  }
}
</script>

<style></style>
