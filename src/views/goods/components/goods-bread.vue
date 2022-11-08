<template>
  <RabbitBread v-if="goods?.categories">
    <RabbitBreadItem to="/">首页</RabbitBreadItem>
    <RabbitBreadItem :to="`/category/${goods.categories[1].id}`">
      {{ goods.categories[1].name }}
    </RabbitBreadItem>
    <RabbitBreadItem :to="`/category/sub/${goods.categories[0].id}`">
      {{ goods.categories[0].name }}
    </RabbitBreadItem>
    <Transition name="fade-right" mode="out-in">
      <RabbitBreadItem v-if="goods">{{ goods.name }}</RabbitBreadItem>
    </Transition>
  </RabbitBread>
</template>
<script>
export default {
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
