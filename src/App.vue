<template>
  <router-view />
  <div class="test"></div>
</template>

<script>
import instance from '@/utils/request'
export default {
  setup() {
    instance({
      method: 'get',
      url: '/home/index'
    }).then((res) => {
      console.log('res', res)
    })
  }
}
</script>
<style lang="less" scoped>
// @import '~@/assets/styles/theme.less';
@import '~@/assets/styles/mixins.less';
.test {
  width: 100px;
  height: 100px;
  background-color: red;
  .hoverShadow ();
}
</style>
