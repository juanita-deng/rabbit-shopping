<template>
  <div :class="['app-header-sticky', { show: y > 78 }]">
    <!-- v-show="y > 78" 修复bug，为了吸顶头部的内容不遮住不吸顶的头部。 -->
    <div class="container" v-show="y > 78">
      <RouterLink class="logo" to="/" />
      <FirstCategory />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
// import { useWindowScroll } from '@/hooks'
/**
 *  @vueuse/core使用方法:https://www.npmjs.com/package/@vueuse/core
 */
import { useWindowScroll } from '@vueuse/core'
import FirstCategory from './first-category.vue'
export default {
  name: 'category-sticky',
  components: { FirstCategory },
  setup() {
    const { y } = useWindowScroll()
    return {
      y
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  transition: all 0.3s linear;
  &.show {
    transform: translateY(0%);
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url('~@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
