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
              <span class="code">发送验证码</span>
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
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Form, Field, configure } from 'vee-validate'
import { mobile, account, isAgree, password, code } from '@/utils/validate'
import { Message } from '@/components'
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
    const login = () => {
      target.value.validate().then((res) => {
        console.log('res', res)
        if (res) {
          Message({ type: 'success', text: '校验成功' })
        } else {
          Message({ type: 'error', text: '校验失败' })
        }
      })
    }
    return {
      isAccountLogin,
      validateRules,
      form,
      target,
      login
    }
  }
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
