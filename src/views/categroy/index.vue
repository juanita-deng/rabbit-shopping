<!-- !!!注意:render动态渲染的组件,template不要加注释,否则也会当成元素渲染 -->
<template>
  <RabbitBread separatorClass="icon-angle-right">
    <RabbitBreadItem to="/">首页</RabbitBreadItem>
    <RabbitBreadItem :to="`/category/${category?.id}`">
      {{ category?.name }}
    </RabbitBreadItem>
  </RabbitBread>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'category',
  setup() {
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      return store.state.category.list.find((v) => v.id === route.params.id)
    })
    return { category }
  }
}
</script>
<style lang="less" scoped></style>
