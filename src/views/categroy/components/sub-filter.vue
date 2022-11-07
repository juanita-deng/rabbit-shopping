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
          @click="changeBrand(i.id)"
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
          @click="changeProperties(i,propertie.id)"
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
  setup(props, { emit }) {
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
      }, {
        immediate: true
      }
    )
    /**
     * 返回给后端的格式:
     * {
     *   brandId:null | id
     *   arttrs:[    // 属性条件数组
     *     {groupName:'尺寸',propertyName:'73cm'},
     *     {groupName:'颜色',propertyName:'焕蓝条纹'},
     *   ]
     * }
     */
    const changeBrand = (id) => {
      subFilterList.value.brands.selected = id
      emit('changeFilter', handleParm())
    }
    const changeProperties = (item, id) => {
      item.properties.selected = id
      emit('changeFilter', handleParm())
    }
    const handleParm = () => {
      const obj = {
        brandId: '',
        arttrs: []
      }
      const brandsId = subFilterList.value.brands.selected
      if (brandsId)obj.brandId = brandsId
      subFilterList.value.saleProperties.forEach((item) => {
        const propertiesId = item.properties.selected
        if (propertiesId) {
          obj.arttrs.push({
            groupName: item.name,
            propertyName: item.properties.find((v) => v.id === propertiesId).name
          })
        }
      })
      return obj
    }
    return {
      subFilterList,
      changeBrand,
      changeProperties
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
