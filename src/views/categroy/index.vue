<!-- !!!注意:render动态渲染的组件,template不要加注释,否则也会当成元素渲染 -->
<template>
  <RabbitBread separatorClass="icon-angle-right">
    <RabbitBreadItem to="/">首页</RabbitBreadItem>
    <RabbitBreadItem to="/category/10000">电器</RabbitBreadItem>
    <RabbitBreadItem>冰箱</RabbitBreadItem>
  </RabbitBread>
</template>
<script>
export default {
  name: 'category'
}
</script>
<style lang="less" scoped></style>
