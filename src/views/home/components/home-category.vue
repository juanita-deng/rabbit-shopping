<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="i in categoryList" :key="i.id">
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
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    const categoryList = computed(() => {
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
    return { categoryList }
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
      &:hover {
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
}
</style>
