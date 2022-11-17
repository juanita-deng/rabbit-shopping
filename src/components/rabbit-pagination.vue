<template>
  <div class="xtx-pagination">
    <a
      href="javascript:;"
      :class="{ disabled: myCurrrentPage === 1 }"
      @click="myCurrrentPage = 1"
    >
      首页
    </a>
    <a
      href="javascript:;"
      :class="{ disabled: pager.start === 1 }"
      @click="changePage(-1)"
    >
      上一页
    </a>
    <span v-if="pager.start !== 1">...</span>
    <a
      href="javascript:;"
      :class="{ active: myCurrrentPage === num }"
      v-for="num in pager.btnArr"
      :key="num"
      @click="myCurrrentPage = num"
    >
      {{ num }}
    </a>
    <span v-if="pager.end !== pager.pages">...</span>
    <a
      href="javascript:;"
      :class="{ disabled: pager.end === pager.pages }"
      @click="changePage(+1)"
    >
      下一页
    </a>
    <a
      href="javascript:;"
      :class="{ disabled: myCurrrentPage === pager.pages }"
      @click="myCurrrentPage = pager.pages"
    >
      尾页
    </a>
  </div>
</template>
<script>
import { computed, watch, ref } from 'vue'

export default {
  name: 'RabbitPagination',
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页显示的条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总的条数
    total: {
      type: Number,
      default: 100
    },
    // 展示的按钮个数
    pageNum: {
      type: Number,
      default: 5
    }
  },
  setup(props, { emit }) {
    // 将父组件传递的currentPage数据私有化
    const myCurrrentPage = ref(null)
    watch(
      () => props.currentPage,
      (val) => {
        myCurrrentPage.value = val
      },
      { immediate: true }
    )
    // 页面渲染需要的参数
    const pager = computed(() => {
      // 总页数
      const pages = Math.ceil(props.total / props.pageSize)
      // 1.理想情况
      let start = myCurrrentPage.value - parseInt(props.pageNum / 2) // 开始的按钮
      let end = start + props.pageNum - 1 // 最后一个按钮
      // 2.start 为小于1的情况(currentPage:2  total:100  pageNum:5 ----> start = 0)
      if (start < 1) {
        start = 1
        end =
          start + props.pageNum - 1 > pages ? pages : start + props.pageNum - 1
      }
      // 3.end 超出总页数的情况(currentPage:9 total:100 pageNum:5 ----> start = 7,end = 11,pages = 10)
      if (end > pages) {
        end = pages
        start = end - props.pageNum + 1 < 1 ? 1 : end - props.pageNum + 1
      }
      // 中间那几个需要展示按钮的数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return { pages, start, end, btnArr }
    })
    const changePage = (val) => {
      if (val === -1 && pager.value.start === 1) return // 首页禁用后不可点击
      if (val === +1 && pager.value.end === pager.value.pages) return // 尾页禁用后不可点击
      myCurrrentPage.value = myCurrrentPage.value + val
    }
    // 监听当前页的变化并传递给父组件
    watch(myCurrrentPage, (val) => {
      emit('changePage', val)
    })
    return { pager, changePage, myCurrrentPage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
