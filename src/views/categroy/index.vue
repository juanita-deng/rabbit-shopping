<!-- !!!注意:render动态渲染的组件RabbitBread内不要加注释,否则也会当成元素渲染 -->
<template>
  <div class="top-category container">
    <!-- 面包屑 -->
    <!-- mode:指定动画的模式,out-in:先出后进 in-out:先进后出,加key是为了处理切换路由时组件不渲染问题 -->
    <RabbitBread separatorClass="icon-angle-right">
      <RabbitBreadItem to="/">首页</RabbitBreadItem>
      <Transition name="fade-right" mode="out-in">
        <RabbitBreadItem
          :to="`/category/${category?.id}`"
          v-if="category"
          :key="category.id"
        >
          {{ category?.name }}
        </RabbitBreadItem>
      </Transition>
    </RabbitBread>
    <!-- 轮播图 -->
    <RabbitCarousel :swiperList="swiperList" style="height: 500px" />
    <!-- 全部二级分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in category?.children" :key="i.id">
          <a href="javascript:;">
            <img :src="i.picture" />
            <p>{{ i.name }}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 分类关联商品 -->
    <div class="ref-goods" v-for="item in categoryList" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }} -</h3>
        <p class="tag">温暖柔软，品质之选</p>
        <RabbitMore />
      </div>
      <div class="body">
        <GoodsItem v-for="i in item.goods" :key="i" :goods="i" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getBannerList } from '@/api/home'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
export default {
  name: 'category',
  components: {
    GoodsItem
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const swiperList = ref([])
    const categoryList = ref([])
    const category = computed(() => {
      return store.state.category.list.find((v) => v.id === route.params.id)
    })
    getBannerList().then(({ result }) => {
      swiperList.value = result
    })
    watch(
      () => route.params.id,
      (value) => {
        // 如果切换到二级路由就不应该发送请求
        if (route.path.includes('/sub')) return
        findTopCategory(value).then(({ result }) => {
          categoryList.value = result.children
        })
      },
      { immediate: true }
    )
    return { category, swiperList, categoryList }
  }
}
</script>
<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
