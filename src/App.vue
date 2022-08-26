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
.test {
  width: 100px;
  height: 100px;
  background-color: @xtxColor;
  .hoverShadow ();
}
</style>
