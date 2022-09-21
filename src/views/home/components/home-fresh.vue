<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="target">
    <template #right><RabbitMore /></template>
    <!-- 面板内容 -->
    <Transition name="fade">
      <ul class="goods-list" v-if="freshGoodsList.length">
        <li v-for="item in freshGoodsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </Transition>
  </HomePanel>
</template>
<script>
// import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { getFreshGoods } from '@/api/home'
import { useLazyLoad } from '@/hooks/index'
export default {
  components: { HomePanel, HomeSkeleton },
  setup() {
    // 未使用懒加载写法
    // const freshGoodsList = ref([])
    // getFreshGoods().then(({ result }) => {
    //   freshGoodsList.value = result
    // })

    // 使用懒加载封装后的写法
    const { target, list: freshGoodsList } = useLazyLoad(getFreshGoods)
    return { freshGoodsList, target }
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
