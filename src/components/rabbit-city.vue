<template>
  <div class="rabbit-city" ref="target">
    <div :class="['select', { active }]" @click="active = !active">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span
        class="ellipsis"
        v-for="i in cityList"
        :key="i.code"
        @click="changeName(i)"
      >
        {{ i.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { ref, reactive, watch } from 'vue'
export default {
  name: 'RabbitCity',
  setup() {
    const active = ref(false)
    const target = ref(null)
    onClickOutside(target, () => {
      active.value = false
    })
    const { cityList, cacheList } = getCityList()
    // 选择城市需要返回给父组件的值
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: ''
    })
    const changeName = (i) => {
      cityList.value = i.areaList
      if (i.level === 0) {
        // 收集省信息
        changeResult.provinceCode = i.code
        changeResult.provinceName = i.name
      } else if (i.level === 1) {
        // 收集市信息
        changeResult.cityCode = i.code
        changeResult.cityName = i.name
      } else if (i.level === 2) {
        // 收集县信息
        changeResult.countyCode = i.code
        changeResult.countyName = i.name
        // 关闭弹窗
        active.value = false
      }
      // 监听关闭弹窗的处理,关闭后恢复数据(即可解决:每次重新选择为最新的全量数据)
      watch(active, (val) => {
        if (!val) {
          cityList.value = cacheList.value
        }
      })
    }
    return { active, target, cityList, changeName }
  }
}
// 注意:城市信息数据是从阿里云上获取的,所以不用封装的request
const getCityList = () => {
  const cityList = ref([]) // 用于渲染
  const cacheList = ref([]) // 用于恢复数据
  axios({
    method: 'get',
    url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
  }).then(({ data }) => {
    cityList.value = data
    cacheList.value = data
  })
  return { cityList, cacheList }
}
</script>

<style scoped lang="less">
.rabbit-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
