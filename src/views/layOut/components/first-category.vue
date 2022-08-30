<template>
  <ul class="navs">
    <!-- 注意:首页是写死的 -->
    <li class="home">
      <RouterLink to="/"> 首页</RouterLink>
    </li>
    <li
      class="home"
      v-for="category in categoryList"
      :key="category.id"
      @mouseenter="show(category.id)"
      @mouseleave="hide(category.id)"
    >
      <!-- <a href="#">{{ category.name }}</a> -->
      <RouterLink :to="`/category/${category.id}`" @click="hide(category.id)">
        {{ category.name }}
      </RouterLink>
      <div :class="['layer', { open: category.open }]">
        <ul>
          <li v-for="item in category.children" :key="item.id">
            <!-- <a href="#">
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </a> -->
            <!-- !!!注意:此处的点击事件传的是category,不是item -->
            <RouterLink
              :to="`/category/sub/${item.id}`"
              @click="hide(category.id)"
            >
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'first-category',
  setup() {
    // 获得store 类似this.$store
    const store = useStore()
    // 把store中的state映射为组件的计算属性,为了保持dom的及时更新
    const categoryList = computed(() => store.state.category.list)
    const show = (id) => {
      store.commit('category/show', id)
    }
    const hide = (id) => {
      store.commit('category/hide', id)
    }
    return {
      categoryList,
      show,
      hide
    }
  }
}
</script>
<style lang="less" scoped>
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
  .layer {
    &.open {
      height: 132px;
      opacity: 1;
    }
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
