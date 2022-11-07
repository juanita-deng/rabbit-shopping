<template>
  <div class="sub-category container">
    <!-- 面包屑 -->
    <SubBread></SubBread>
    <!-- 筛选区域 -->
    <SubFilter></SubFilter>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'subCategory',
  components: {
    SubBread,
    SubFilter
  }
}
</script>
<style lang="less" scoped></style>
