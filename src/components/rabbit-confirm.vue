<template>
  <div class="rabbit-confirm" v-if="show">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="JavaScript:;"
          class="iconfont icon-close-new"
          @click="cancelCallback"
        />
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <RabbitButton size="mini" type="gray" @click="cancelCallback">
          取消
        </RabbitButton>
        <RabbitButton size="mini" type="primary" @click="confirmCallback">
          确认
        </RabbitButton>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'RabbitConfirm',
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      required: true
    },
    confirmCallback: {
      type: Function
    },
    cancelCallback: {
      type: Function
    }
  },
  setup() {
    const show = ref(false)
    onMounted(() => {
      show.value = true
    })
    // 改为调用时触发
    // const confirm = () => {
    //   console.log('点击确定')
    //   show.value = false
    // }
    // const cancel = () => {
    //   console.log('点击取消')
    //   show.value = false
    // }
    return { show }
  }
}
</script>
<style scoped lang="less">
.rabbit-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .rabbit-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
