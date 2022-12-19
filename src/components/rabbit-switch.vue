<template>
    <span
        :class="['el-switch__core',currentVal ? 'active':'inactive']"
        @click="change"
    />
</template>

<script>
import { watch, ref } from 'vue'
export default {
  name: 'RabbitSwitch',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: true
    },
    active: {
      type: [Boolean, String, Number],
      default: false
    },
    inactive: {
      type: [Boolean, String, Number],
      default: true
    }
  },
  setup(props, { emit }) {
    const currentVal = ref(false)
    watch(() => props, () => {
      if (props.modelValue === props.active) {
        currentVal.value = true
      }
      if (props.modelValue === props.inactive) {
        currentVal.value = false
      }
    }, {
      immediate: true,
      deep: true
    })
    const change = () => {
      emit('update:modelValue', currentVal.value ? props.inactive : props.active)
    }
    return { currentVal, change }
  }
}
</script>

<style lang="less" scoped>
.el-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
  &.active {
    background-color: rgb(19, 206, 102);
    &::after {
      left: 100%;
      margin-left: -17px;
    }
  }
   &.inactive {
    background-color: rgb(221,225,223);
  }
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    transition: all 0.3s;
    width: 16px;
    height: 16px;
    background-color: #fff;
  }
}
</style>
