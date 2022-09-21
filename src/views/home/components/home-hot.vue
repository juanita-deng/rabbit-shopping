<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <Transition name="fade">
      <ul ref="pannel" class="goods-list" v-if="hotGoods.length">
        <li v-for="item in hotGoods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else bg="#fff" />
    </Transition>
  </HomePanel>
</template>
<script>
// import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { getHotGoods } from '@/api/home'
import { useLazyLoad } from '@/hooks/index'
export default {
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    // const hotGoods = ref([])
    /** 封装前写法
     * useIntersectionObserver 用来监听进入可视区行为 官方文档:https://vueuse.org/core/useintersectionobserver/#demo
     * @return 返回值:stop 停止观察是否进入/移出可视区
     * @param 参数1:target,观察的目标dom容器(必须是dom)
     * @param 参数2:回调函数 isIntersecting 是否进入可视区(true是 / false否)
     *             observerElement 被观察的dom
     */
    // const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    //   //此处判断进入可视区后开始发请求拿数据
    //   console.log('isIntersecting', isIntersecting)
    //   if (isIntersecting) {
    //     stop()
    //     getHotGoods().then(({ result }) => {
    //       hotGoods.value = result
    //     })
    //   }
    // })

    // 封装后写法
    const { target, list: hotGoods } = useLazyLoad(getHotGoods)
    return { hotGoods, target }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
