<template>
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{active:params.sortField === null}" @click="changeSort(null)">默认排序</a>
      <a href="javascript:;" :class="{active:params.sortField === 'publishTime'}" @click="changeSort('publishTime')">最新商品</a>
      <a href="javascript:;" :class="{active:params.sortField === 'orderNum'}" @click="changeSort('orderNum')">最高人气</a>
      <a href="javascript:;" :class="{active:params.sortField === 'evaluateNum'}" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i :class="['arrow up',{active:params.sortField === 'price' && params.sortMethod === 'asc'}]" />
        <i :class="['arrow down',{active:params.sortField === 'price' && params.sortMethod === 'desc'}]" />
      </a>
    </div>
    <div class="check">
      <RabbitCheckbox v-model="params.inventory">仅显示有货商品</RabbitCheckbox>
      <RabbitCheckbox v-model="params.onlyDiscount">仅显示特惠商品</RabbitCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup() {
    const params = reactive({
      inventory: false, // 是否有库存
      onlyDiscount: false, // 只显示特惠
      arttrs: [], // 属性条件数组
      sortField: null, // 排序字段，取值范围：[publishTime:最新商品,orderNum:最高人气,price:价格排序,evaluateNum:评论最多]
      sortMethod: null // 排序规则，asc为正序，desc为倒序，默认为desc
    })
    const changeSort = (type) => {
      params.sortField = type
      if (type === 'price') {
        params.sortMethod = params.sortMethod === 'desc' ? 'asc' : 'desc'
      } else {
        params.sortMethod = null
      }
    }
    return { params, changeSort }
  }
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
