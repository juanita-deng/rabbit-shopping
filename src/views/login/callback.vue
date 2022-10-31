<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        href="javascript:;"
        @click="isShowAccount = true"
        :class="{ active: isShowAccount }"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        @click="isShowAccount = false"
        :class="{ active: !isShowAccount }"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="isShowAccount">
      <CallbackBind></CallbackBind>
    </div>
    <div class="tab-content" v-else>
      <CallBackPatch></CallBackPatch>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind.vue'
import CallBackPatch from './components/callback-patch.vue'
import { ref } from 'vue'
import { userQQLogin } from '@/api/user'
import { Message } from '@/components'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallBackPatch
  },
  setup() {
    const isShowAccount = ref(true)
    /**
     * 判断QQ账号是否登录
     *   1.根根回跳组件初始化时提供的sdk获取openid
     *   2.根据opened去请求我们的数据接口,判断是否绑定过
     *   3.若成功,说明已绑定和注册,保存返回的登录信息,跳转到首页
     *   4.若失败,说明没有注册绑定,需要完善登录信息.
     */
    const store = useStore()
    const router = useRouter()
    if (window.QC.Login.check()) {
      window.QC.Login.getMe((openId) => {
        userQQLogin(openId)
          .then(({ result }) => {
            store.commit('user/setUserInfo', result)
            Message({ text: '登录成功' })
            router.push('/')
          })
          .catch(({ response }) => {
            Message({ type: 'error', text: response.data.message })
          })
      })
    }
    return { isShowAccount }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
