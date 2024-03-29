<template>
  <div class="account-box">
    <div class="toggle">
      <a
        href="javascript:;"
        v-if="!isAccountLogin"
        @click="isAccountLogin = true"
      >
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-else @click="isAccountLogin = false">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- v-slot:为作用域插槽的返回值 -->
    <Form
      ref="target"
      :validation-schema="validateRules"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <div class="form">
        <template v-if="isAccountLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                v-model="form.account"
                autocomplete="off"
                name="account"
                type="text"
                :class="{ error: errors.account }"
                placeholder="请输入用户名或手机号"
              />
            </div>
            <div class="error" v-if="errors.account">
              <i class="iconfont icon-warning" />{{ errors.account }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field
                type="password"
                placeholder="请输入密码"
                name="password"
                :class="{ error: errors.password }"
                v-model="form.password"
              />
            </div>
            <div class="error" v-if="errors.password">
              <i class="iconfont icon-warning" />{{ errors.password }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                type="text"
                placeholder="请输入手机号"
                name="mobile"
                :class="{ error: errors.mobile }"
                v-model="form.mobile"
              />
            </div>
            <div class="error" v-if="errors.mobile">
              <i class="iconfont icon-warning" />{{ errors.mobile }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field
                type="password"
                placeholder="请输入验证码"
                name="code"
                :class="{ error: errors.code }"
                v-model="form.code"
              />
              <span class="code" @click="sendCode">
                {{ count === 0 ? '发送验证码' : `${count}s后重试` }}
              </span>
            </div>
            <div class="error" v-if="errors.code">
              <i class="iconfont icon-warning" />{{ errors.code }}
            </div>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <!-- as: 指定渲染的元素,可以为组件或者div/span等标签 -->
            <Field as="RabbitCheckbox" name="isAgree" v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <div class="error" v-if="errors.isAgree">
            <i class="iconfont icon-warning" />{{ errors.isAgree }}
          </div>
        </div>
        <a href="javascript:;" class="btn" @click="login">登录</a>
      </div>
    </Form>
    <div class="action">
      <!-- 此处QQ互联,需要根据appid动态生成 -->
      <!-- 为了防止QQ互联打开新的页面,此处拷贝了生成的链接 -->
      <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <!-- <span id="qqLoginBtn"></span> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { Form, Field, configure } from 'vee-validate'
import { mobile, account, isAgree, password, code } from '@/utils/validate'
import { Message } from '@/components'
import {
  userAccountLogin,
  userMobileLoginMsg,
  userMobileLogin
} from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// import { useIntervalFn } from '@vueuse/core'
import { useCountDown } from '@/hooks/index'
// import QC from 'qc'
// 校验时机的配置
configure({
  validateOnInput: true // 修改触发的时机,默认失焦时触发
})
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup() {
    const isAccountLogin = ref(true)
    /**
     * vee-validate的使用----> https://vee-validate.logaretm.com/v4
     * 注意:npm i vee-validate 下载的默认是vue2的版本,4.x对应的是vue3
     *      yarn add vee-validate@4.0.3
     */
    const form = reactive({
      mobile: '',
      account: '',
      password: '',
      code: '',
      isAgree: false
    })

    const validateRules = {
      // 校验的时候，如果返回true，校验通过
      // 如果返回的不是true，而是其他值，校验失败，而且返回值就是校验的提示信息
      mobile,
      account,
      isAgree,
      password,
      code
    }
    // 对整个表单进行校验
    const target = ref(null)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 切换时清除历史数据
    watch(isAccountLogin, (val) => {
      form.mobile = null
      form.account = null
      form.password = null
      form.code = null
    })
    const login = () => {
      target.value.validate().then((res) => {
        if (!res) {
          return Message({ type: 'error', text: '校验失败', duration: 3000 })
        }
        const getApi = () => {
          return isAccountLogin.value ? userAccountLogin(form.account, form.password) : userMobileLogin(form.mobile, form.code)
        }
        // 测试账号:zhousg  123456   账号2:demo  hm#qd@23!
        getApi().then(({ result }) => {
          // 登录成功后:
          // 1.存储用户信息
          store.commit('user/setUserInfo', result)
          // 2.合并购物车
          store.dispatch('cart/mergeLocalCart').then(() => {
            // 3.提示消息
            Message({ text: '登录成功' })
            // 4.跳转到首页
            router.push(route.query.redirectUrl || '/')
          })
        })
          .catch(({ response }) => {
            Message({ type: 'error', text: response.data.message })
          })
      })
    }
    // 方式一:使用自己写的定时器
    // const count = ref(0)
    // let timer = ref(null)

    // 方式二:使用useIntervalFn
    // const { pause, resume } = useIntervalFn(
    //   () => {
    //     count.value--
    //     if (count.value === 0) pause()
    //   },
    //   1000,
    //   { immediate: false }
    // )

    // 方式三:使用二次封装的hooks
    const { count, start } = useCountDown()
    const sendCode = () => {
      // 1.对手机号进行校验
      const validateRes = validateRules.mobile(form.mobile)
      if (validateRes !== true) {
        target.value.setFieldError('mobile', validateRes)
      }
      // 2.校验通过后发送请求
      if (count.value > 0) return // 禁止重复发送请求
      userMobileLoginMsg(form.mobile)
        .then((res) => {
          // console.log('res', res)
          // 3.倒计时,禁止期间再发请求
          // 方式一:自己写
          // count.value = 10
          // clearInterval(timer)
          // timer = setInterval(() => {
          //   if (count.value === 0) return
          //   count.value--
          // }, 1000)

          // 方式二:使用插件useIntervalFn
          // count.value = 60
          // resume()

          // 方式三:使用二次封装的hooks
          start()
        })
        .catch(({ response }) => {
          Message({ type: 'error', text: response.data.message })
        })
    }
    // 动态生成QQ互联的按钮
    // onMounted(() => {
    //   // window.QC.Login({ // 写法一
    //   QC.Login({ // 通过vue.config.js配置external
    //     btnId: 'qqLoginBtn' // 插入按钮的节点id
    //   })
    // })
    return {
      isAccountLogin,
      validateRules,
      form,
      target,
      login,
      sendCode,
      count
    }
  }
  // created() {
  //   this.$message({ type: 'success', text: '测试函数调用方法二' })
  // }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
