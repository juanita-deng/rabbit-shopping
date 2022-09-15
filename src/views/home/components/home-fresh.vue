<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <template #right><RabbitMore /></template>
    <!-- 面板内容 -->
    <ul class="goods-list">
      <li v-for="item in freshGoodsList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import { getFreshGoods } from '@/api/home'
export default {
  components: { HomePanel },
  setup() {
    const freshGoodsList = ref([])
    getFreshGoods().then(({ result }) => {
      freshGoodsList.value = result
    })
    return { freshGoodsList }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
