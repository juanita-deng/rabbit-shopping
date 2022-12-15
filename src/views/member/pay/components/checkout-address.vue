<template>
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!defaultadress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i/>货<i/>人：</span>{{defaultadress.receiver}}</li>
                <li><span>联系方式：</span>{{defaultadress.contact}}</li>
                <li><span>收货地址：</span>{{defaultadress.fullLocation?.replace(/ /g,'')+defaultadress.address}}</li>
              </ul>
              <a href="javascript:;">修改地址</a>
            </div>
            <div class="action">
              <RabbitButton class="btn">切换地址</RabbitButton>
              <RabbitButton class="btn">添加地址</RabbitButton>
            </div>
          </div>
        </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    /**
     * 确认默认的收获地址
     *    1.从list中查找isDefault为0的默认地址
     *    2.如果没有,把数组的第一项作为默认的收货地址
     */
    const defaultadress = ref({})
    const isDefault = props.list.find((v) => v.isDefault === 0)
    watch(() => props.list, () => {
      if (isDefault?.id) {
        defaultadress.value = isDefault
      } else {
        defaultadress.value = { ...props.list[0] }
      }
    }, { immediate: true, deep: true })
    return { defaultadress }
  }
}
</script>

<style lang="less" scoped>
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
