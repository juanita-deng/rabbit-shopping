<template>
    <div class="xtx-bread-item">
      <RouterLink :to="to" v-if="to">
        <slot/>
      </RouterLink>
      <span v-else>
        <slot/>
      </span>
    </div>
</template>
<script>
export default {
  name: 'RabbitBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
<style lang="less" scoped>
.xtx-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
</style>
