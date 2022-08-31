<template>
  <div class="home-category" @mouseleave="currentCategoryId = ''">
    <ul class="menu">
      <li
        v-for="i in categoryList"
        :key="i.id"
        :class="{ active: i.id === currentCategoryId }"
        @mouseenter="currentCategoryId = i.id"
      >
        <RouterLink :to="`/category/${i.id}`">{{ i.name }}</RouterLink>
        <RouterLink
          v-for="item in i.children"
          :key="item.id"
          :to="`/category/sub/${i.id}`"
        >
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
    <!-- 商品分类弹层 -->
    <div class="layer">
      <h4>
        {{ currentCategoryId === 'brand-id' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 其他分类 -->
      <ul>
        <li v-for="i in goodsList?.goods" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ i.name }}</p>
              <p class="desc ellipsis">{{ i.desc }}</p>
              <p class="price"><i>¥</i>{{ i.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌推荐 -->
      <ul>
        <li class="brand" v-for="i in goodsList?.brands" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ i.place }}
              </p>
              <p class="name ellipsis">{{ i.name }}</p>
              <p class="desc ellipsis-2">{{ i.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { getBrandList } from '@/api/home'
export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    const brand = reactive({
      id: 'brand-id',
      name: '品牌',
      children: [
        {
          id: 'children-id',
          name: '品牌推荐'
        }
      ]
    })
    // 获取品牌数据
    // !!!注意:在setup中使用async和await关键字,需要将模版template用<suspense></suspense>包裹,否则渲染有问题
    getBrandList().then(({ result }) => {
      brand.brands = result
    })
    const categoryList = computed(() => {
      const list = store.state.category.list.map((v) => {
        return {
          id: v.id,
          name: v.name,
          goods: v.goods,
          children: v.children?.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })

    // 记录鼠标经过时的分类ID,用于获取商品弹窗的商品列表
    const currentCategoryId = ref('')
    const goodsList = computed(() => {
      return categoryList.value.find((v) => v.id === currentCategoryId.value)
    })
    return { categoryList, currentCategoryId, goodsList }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
        &.brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
