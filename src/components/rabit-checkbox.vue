<template>
  <div class="rabbit-checkbox" @click="change">
    <!-- 方式一和方式三 -->
    <i :class="['iconfont', { 'icon-checked': checked }]"></i>
    <i :class="['iconfont', { 'icon-unchecked': !checked }]"></i>

    <!-- 方式二 -->
    <!-- <i :class="['iconfont', { 'icon-checked': modelValue }]"></i>
    <i :class="['iconfont', { 'icon-unchecked': !modelValue }]"></i> -->
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'RabbitCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    /**
     * 支持双向数据绑定---》父组件动态控制自组件的checkbox
     * 方式一:使用watch监听父组件传过来的控制绑定的值,然后赋值给子组件控制checkout的变量
     * 方式二:在组件中直接绑定父组件传过来的值
     * 方式三:使用插件useuseVModel  https://vueuse.org/core/usevmodel/#usevmodel
     */
    // 方式一
    // const checked = ref(true)
    // watch(
    //   () => props.modelValue,
    //   (value) => {
    //     checked.value = value
    //   },
    //   { immediate: true }
    // )

    // 方式三
    const checked = useVModel(props, 'modelValue', emit)
    const change = () => {
      // 方式一和方式三
      checked.value = !checked.value
      // 方式二
      //   emit('update:modelValue', !props.modelValue)

      // 支持change事件
      // 方式一
      //   emit('change', checked.value) // 注意:此处的checked用的是方式一中的checked
      // 方式二
      //   emit('change', !props.modelValue)
      // 方式三
      emit('change', !checked.value)
    }
    return { checked, change }
  }
}
</script>
<style scoped lang="less">
.rabbit-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
