<template>
  <div class="goods-sku" v-for="spu in goods.specs" :key="spu.id">
    <dl>
      <dt>{{ spu.name }}</dt>
      <dd>
        <template v-for="val in spu.values" :key="val.name">
          <img
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            alt=""
            :class="{ selected: val.selected }"
            @click="chooseSku(val, spu)"
          />
          <span
            v-else
            @click="chooseSku(val, spu)"
            :class="{ selected: val.selected }"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: { type: Object, default: () => {} }
  },
  setup(props, { emit }) {
    // sku:选择商品的具体某一个规格的其中一个属性  spu:商品的规格
    const chooseSku = (sku, spu) => {
      if (sku.selected) {
        // 若选中则再点击为取消选中(增加一个selected属性)
        sku.selected = false
      } else {
        // 若没选中,则点击选中,并让其他同规格spu的属性不选中
        spu.values.forEach((sku) => (sku.selected = false))
        sku.selected = true
      }
    }
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    return { chooseSku }
  }
}
/**
 * 根据后台skus得到一个可选路径字典对象
 *    1.过滤掉库存为0的sku
 *    2.根据商品的specs属性,得到sku属性值的所有子集(幂集合库)
 *    3.根据这些子集组合成路径字典
 */
const getPathMap = (specs) => {
  const pathMap = {}
  // 1.过滤掉库存为0的sku
  const skus = specs.filter((v) => v.inventory > 0)
  skus.forEach((sku) => {
    // 2.根据商品的specs属性,得到sku属性值的所有子集(幂集合库)
    const name = sku.specs.map((v) => v.valueName)
    const result = powerSet(name)
    result.forEach((v) => {
      const key = v.join('⭐️')
      if (!pathMap[key]) {
        // 如果没有key属性,就为其添加一个key属性,值为对应的skuId
        pathMap[key] = [sku.id]
      } else {
        // 如果没key属性,就往数组里添加一个值
        pathMap[key].push([sku.id])
      }
    })
  })
  return pathMap
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
