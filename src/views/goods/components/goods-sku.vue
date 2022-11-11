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
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="chooseSku(val, spu)"
          />
          <span
            v-else
            @click="chooseSku(val, spu)"
            :class="{ selected: val.selected, disabled: val.disabled }"
          >
            {{ val.name }}
          </span>
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
      // 如果禁用(没有库存),禁止后面操作
      if (sku.disabled) return
      if (sku.selected) {
        // 若选中则再点击为取消选中(增加一个selected属性)
        sku.selected = false
      } else {
        // 如果没选中,就将同一个规格属性的所有sku变为未选中,然后给当前sku添加一个选中的属性
        spu.values.forEach((sku) => (sku.selected = false))
        sku.selected = true
      }
      updateDisabledStatus(props.goods.specs, pathMap)
    }
    const pathMap = getPathMap(props.goods.skus)
    updateDisabledStatus(props.goods.specs, pathMap)
    return { chooseSku }
  }
}
/**
 * 1.根据后台skus得到一个可选路径字典对象
 *    1.过滤掉库存为0的sku
 *    2.根据商品的specs属性,得到sku属性值(所有规格名字)的所有子集(幂集合库)
 *    3.根据这些子集组合成路径字典
 *      遍历幂集合,判断pathMap是否有名称子集的属性,
 *      没有key就为其添加属性,值为当前sku的id
 *      有key,就往key对应的数组里追加一个值(为当前的sku的id)
 */
const getPathMap = (specs) => {
  const pathMap = {}
  // 1.过滤掉库存为0的sku
  const skus = specs.filter((v) => v.inventory > 0)
  skus.forEach((sku) => {
    // 获取规格名字的子集(幂集合)
    const nameList = sku.specs.map((v) => v.valueName)
    const result = powerSet(nameList)
    result.forEach((v) => {
      const key = v.join('⭐️')
      // 有key属性往数组追加一个sku.id的值
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        // 没有key属性,为其添加一个key属性,值为对应的sku.id的一个数组
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}
/**
 * 2.控制按钮禁用状态的函数
 *    1.遍历所有的规格specs,判断当前规格的value在pathMap中是否存在
 *    2.若存在,则说明该规格可选(disabled为false)
 *    3.若不存在,则说明该规格要禁用(disabled为true)
 * 4.控制选中时的禁用状态
 *    1.获取选中规格的当前项,值为对应的name
 *    2.过滤掉当前规格中undefined的sku,并以⭐️拼接起来
 *    3.给当前sku设置disabled的属性,值为可选择路径字典中查到的值的取反
 */
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, index) => {
    // 获取某一规格属性选中的值(sku)
    const selectedArr = getSelectedValue(specs)// 注意:次行一定要在specs的遍历里边执行
    spec.values.forEach((val) => {
      // 往选中的规格中添加值
      selectedArr[index] = val.name
      const key = selectedArr.filter((v) => v).join('⭐️')// 过滤掉undefined的项
      val.disabled = !pathMap[key]
    })
  })
}
/**
 * 3.获取选中规格的值
 *    原则:得到的结果[undefined,undefined,undefined]
 *        1.遍历所有的规格,判断当前这一规格属性里是否有选中的sku
 *        2.若选中,则将选中的name存入到selectedArr
 *        3.若没选中,则存一个undefined
 */
const getSelectedValue = (specs) => {
  const selectedArr = []
  specs.forEach((spec) => {
    const selected = spec.values.find((v) => v.selected)
    selectedArr.push(selected ? selected.name : undefined)
  })
  return selectedArr
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