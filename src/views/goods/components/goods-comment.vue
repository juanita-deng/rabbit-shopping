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
    <div class="list">
      <div class="item">
        <div class="user">
          <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png" alt="">
          <span>兔****m</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx02"></i>
            <span class="attr">颜色：黑色 尺码：M</span>
          </div>
          <div class="text">网易云app上这款耳机非常不错 新人下载网易云购买这款耳机优惠大 而且耳机🎧确实正品 音质特别好 戴上这款耳机 听音乐看电影效果声音真是太棒了 无线方便 小盒自动充电 最主要是质量好音质棒 想要买耳机的放心拍 音效巴巴滴 老棒了</div>
          <div class="time">
            <span>2020-10-10 10:11:22</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { findCommentInfoByGoods } from '@/api/product'
export default {
  name: 'GoodsComment',
  setup() {
    const route = useRoute()
    const commentInfo = ref({})
    const currentIndex = ref(0)
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
    return { commentInfo, currentIndex, changeTag, reqParm }
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
