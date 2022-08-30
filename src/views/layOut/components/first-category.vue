<template>
  <ul class="navs">
    <!-- 注意:首页是写死的 -->
    <li class="home">
      <RouterLink to="/"> 首页</RouterLink>
    </li>
    <li class="home" v-for="category in categoryList" :key="category.id">
      <a href="#">{{ category.name }}</a>
      <div class="layer">
        <ul>
          <li v-for="item in category.children" :key="item.id">
            <a href="#">
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </a>
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
    return {
      categoryList
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
  z-index: 999;
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
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
  .layer {
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
