<template>
  <div class="goods-comment">
    <!-- 评论标签 -->
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, index) in commentInfo.tags"
            :key="index"
            :class="{active:index === currentIndex}"
            @click="changeTag(index,item.title)"
          >
            {{ item.title }}（{{ item.tagCount }}）
          </a>
        </div>
      </div>
    </div>
    <!-- 排序筛选 -->
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" :class="{active:reqParm.sortField === null}" @click="reqParm.sortField = null">默认</a>
      <a href="javascript:;" :class="{active:reqParm.sortField === 'createTime'}" @click="reqParm.sortField = 'createTime'">最新</a>
      <a href="javascript:;" :class="{active:reqParm.sortField === 'praiseCount'}" @click="reqParm.sortField = 'praiseCount'">最热</a>
    </div>
     <!-- 列表 -->
    <div class="list" v-for="item in commentList" :key="item.id">
      <div class="item">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="star in item.score" :key="star + item.id"></i>
            <i class="iconfont icon-wjx02" v-for="emptyStar in (5 - item.score)" :key="emptyStar + item.id"></i>
            <span class="attr">{{formatSpec(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论图片 -->
          <GoodsImagePreview v-if="item.pictures.length" :pictures = "item.pictures"/>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <RabbitPagination @changePage="changePage" :total="total"/>
  </div>
</template>
<script>
import { watch, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { findCommentInfoByGoods, findCommentListByGoods } from '@/api/product'
import GoodsImagePreview from './goods-image-preview.vue'
export default {
  name: 'GoodsComment',
  components: {
    GoodsImagePreview
  },
  setup() {
    const route = useRoute()
    const commentInfo = ref({})
    const currentIndex = ref(0)
    const commentList = ref([])
    const total = ref(0)
    // 筛选参数
    const reqParm = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: false,
      tag: null,
      sortField: null, // 'praiseCount'最热  'createTime'最新
      sortMethod: 'desc'
    })
    watch(
      () => route.params.id,
      (val) => {
        findCommentInfoByGoods(val).then(({ result }) => {
          result.tags.unshift({ title: '有图', tagCount: result.hasPictureCount })
          result.tags.unshift({ title: '全部评价', tagCount: result.evaluateCount })
          commentInfo.value = result
        })
      },
      { immediate: true }
    )
    const changeTag = (index, name) => {
      currentIndex.value = index
      if (index === 0) {
        // 点击的是全部评价
        reqParm.hasPicture = false
        reqParm.tag = null
      } else if (index === 1) {
        // 点击的是有图
        reqParm.hasPicture = true
        reqParm.tag = null
      } else {
        // 点击的是其他tag
        reqParm.hasPicture = false
        reqParm.tag = name
      }
    }
    watch([() => route.params.id, reqParm], (val) => {
      findCommentListByGoods(val[0], reqParm).then(({ result }) => {
        commentList.value = result.items
        total.value = result.counts
      })
    }, {
      immediate: true
    })
    const formatNickname = (nickname) => {
      return nickname.slice(0, 1) + '*****' + nickname.slice(-1)
    }
    const formatSpec = (specs) => {
      return specs.reduce((pre, cur) => `${pre}  ${cur.name}:${cur.nameValue}`, '')
    }
    const changePage = (page) => {
      reqParm.page = page
    }
    return { commentInfo, currentIndex, changeTag, reqParm, commentList, formatNickname, formatSpec, changePage, total }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
