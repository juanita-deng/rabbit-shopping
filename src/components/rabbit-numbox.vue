<template>
  <div class="rabbit-numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="change(-1)">-</a>
      <input type="text" readonly :value="num" />
      <a href="javascript:;" @click="change(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'

export default {
  name: 'RabbitNumbox',
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    label: {
      type: [String, Boolean],
      default: '数量'
    }
  },
  setup(props, { emit }) {
    const num = useVModel(props, 'modelValue', emit)
    const change = (count) => {
      const newValue = num.value + count
      if (newValue < props.min) return
      if (newValue > props.max) return
      num.value = newValue
      // 暴露一个change事件
      emit('change', newValue)// 因为num是响应式的,所以要传newValue
    }
    return { num, change }
  }
}
</script>
<style scoped lang="less">
.rabbit-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
