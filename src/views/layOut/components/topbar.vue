<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userInfo?.token">
          <li>
            <RouterLink to="/member">
              <i class="iconfont icon-user"></i>{{ userInfo.account }}
            </RouterLink>
          </li>
          <li><a href="javascript:;" @click="logOut">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><RouterLink to="/member/order">我的订单</RouterLink></li>
        <li><RouterLink to="/member">会员中心</RouterLink></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Message } from '@/components'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup() {
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => store.state.user.userInfo)
    const logOut = () => {
      store.commit('user/setUserInfo', {})
      // 退出登录后清空本地购物车信息
      store.commit('cart/setCartList', [])
      router.push('/login')
      Message({ type: 'success', text: '退出成功' })
    }
    return { userInfo, logOut }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ul后面除第一个li外的所有的li
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
