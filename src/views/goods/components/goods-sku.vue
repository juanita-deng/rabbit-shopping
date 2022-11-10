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
export default {
  name: 'GoodsSku',
  props: {
    goods: { type: Object, default: () => {} }
  },
  setup() {
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
    return { chooseSku }
  }
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
