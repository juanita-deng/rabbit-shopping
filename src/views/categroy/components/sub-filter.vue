<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="i in subFilterList?.brands"
          :key="i.id"
          :class="{ active: subFilterList?.brands.selected === i.id }"
          @click="subFilterList.brands.selected = i.id"
        >
          {{ i.name }}
        </a>
      </div>
    </div>
    <div class="item" v-for="i in subFilterList?.saleProperties" :key="i.id">
      <div class="head">{{ i.name }}：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="propertie in i.properties"
          :key="propertie.id"
          :class="{ active: i.properties.selected === propertie.id }"
          @click="i.properties.selected = propertie.id"
        >
          {{ propertie.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup() {
    const subFilterList = ref(null)
    const route = useRoute()
    watch(
      () => route.params.id,
      (value) => {
        // 二级分类切换到顶级分类时不发送请求,否则会报错
        if (!route.path.includes('/sub')) return
        findSubCategoryFilter(value).then(({ result }) => {
          result.brands.unshift({ id: null, name: '全部' })
          result.brands.selected = null
          result.saleProperties.forEach((sub) => {
            sub.properties.unshift({ id: null, name: '全部' })
            sub.properties.selected = null
          })
          subFilterList.value = result
        })
      }
    )
    return {
      subFilterList
    }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
