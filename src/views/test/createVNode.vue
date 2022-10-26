<template>
  <div class="box">
    <!-- 动态生成下列标签 -->
    <!-- <h1 title="嘻嘻嘻" id="aa"><span>哈哈哈</span></h1> -->
  </div>
</template>
<script>
import { createVNode, onMounted, render } from 'vue'
export default {
  setup() {
    onMounted(() => {
      /**
       * 渲染函数:https://www.javascriptc.com/vue3js/guide/render-function.html#h-%E5%8F%82%E6%95%B0
       * h() 和 createVnode一样的,都是渲染函数
       * 参数1:生成的虚拟dom的标签名,或者函数组件或者异步组件
       * 参数2:是一个对象,用于指定虚拟dom的属性
       * 参数3:子元素的内容,可以是字符串,也可以是虚拟dom
       */
      // 使用js动态的给box盒子添加一段结构
      const vnode = createVNode('h1', { id: 'aa', title: '嘻嘻嘻' }, [
        createVNode('span', {}, '哈哈哈')
      ])
      console.log('123', vnode)
      render(vnode, document.querySelector('.box')) // 参数1:vnode   参数2:挂载的dom
    })
  }
}
</script>
