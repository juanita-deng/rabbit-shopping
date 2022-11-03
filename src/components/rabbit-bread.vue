<!-- 二次封装,具体由父组件传进来,动态生成 -->
<!-- <template>
  <div class="xtx-bread">
    <RabbitBreadItem to="/">首页</RabbitBreadItem>
    <i class="iconfont icon-angle-right"></i>
    <RabbitBreadItem to="/category/10000">电器</RabbitBreadItem>
    <i class="iconfont icon-angle-right"></i>
    <RabbitBreadItem>冰箱</RabbitBreadItem>
  </div>
</template> -->

<script>
import { h } from 'vue'
export default {
  name: 'RabbitBread',
  props: {
    separatorClass: {
      type: String,
      default: 'icon-angle-right'
    }
  },
  // !!!注意:使用了render函数之后，就不需要提供template属性了
  render() {
    const slots = this.$slots.default()
    const arr = []
    slots.forEach((v, i) => {
      arr.push(v)
      // 不是最后一个需要添加传进来的分隔符图标
      if (i !== slots.length - 1) {
        arr.push(h('i', { className: `iconfont ${this.separatorClass}` }))
      }
    })
    return h('div', { className: 'rabbit-bread' }, arr)
  }
}
</script>

<style scoped lang="less">
.rabbit-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
