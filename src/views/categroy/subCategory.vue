<template>
  <div class="sub-category container">
    <!-- 面包屑 -->
    <SubBread></SubBread>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
export default {
  name: 'subCategory',
  components: {
    SubBread
  }
}
</script>
<style lang="less" scoped></style>
