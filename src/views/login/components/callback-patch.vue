<template>
  <div class="xtx-form">
    <Form
      ref="target"
      :validation-schema="rules"
      autocomplete="off"
      v-slot="{ errors }"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field
            name="account"
            v-model="form.account"
            class="input"
            type="text"
            placeholder="请输入用户名"
          />
        </div>
        <div class="error" v-if="errors.account">{{ errors.account }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            name="mobile"
            v-model="form.mobile"
            class="input"
            type="text"
            placeholder="请输入手机号"
          />
        </div>
        <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field
            name="code"
            v-model="form.code"
            class="input"
            type="text"
            placeholder="请输入验证码"
          />
          <span class="code" @click="sendCode">
            {{ count === 0 ? '发送验证码' : `${count}s后重试` }}
          </span>
        </div>
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            name="password"
            v-model="form.password"
            class="input"
            type="password"
            placeholder="请输入密码"
          />
        </div>
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            name="rePassword"
            v-model="form.rePassword"
            class="input"
            type="password"
            placeholder="请确认密码"
          />
        </div>
        <div class="error" v-if="errors.rePassword">
          {{ errors.rePassword }}
        </div>
      </div>
    </Form>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import { mobile, account, password, rePassword, code } from '@/utils/validate'
import { useCountDown } from '@/hooks'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { Message } from '@/components'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackPatch',
  components: {
    Form,
    Field
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const form = reactive({
      account: '',
      mobile: '',
      password: '',
      rePassword: '',
      code: ''
    })
    const rules = { mobile, account, password, rePassword, code }
    const { count, start } = useCountDown()
    const target = ref(null)
    const store = useStore()
    const router = useRouter()
    const sendCode = () => {
      const validateStatus = rules.mobile(form.mobile)
      if (validateStatus !== true) {
        target.value.setFieldError('mobile', validateStatus)
        return
      }
      if (count.value > 0) return
      userQQPatchCode(form.mobile)
        .then(() => {
          start()
        })
        .catch((response) => {
          Message({ type: 'error', text: response.data.message })
        })
    }
    const submit = () => {
      target.value.validate().then((res) => {
        if (!res) {
          return Message({ type: 'error', text: '校验失败', duration: 3000 })
        }
        userQQPatchLogin({ unionId: props.unionId, data: form })
          .then(({ result }) => {
            // 1.存储用户信息
            store.commit('user/setUserInfo', result)
            // 2.合并购物车
            store.dispatch('cart/mergeLocalCart').then(() => {
            // 3.提示消息
              Message({ text: 'QQ完善信息成功' })
              // 4.跳转到首页
              router.push('/')
            })
            // 登录后改成上面的
            // store.commit('user/setUserInfo', result)
            // Message({ text: 'QQ完善信息成功' })
            // router.push('/')
          })
          .catch(({ response }) => {
            Message({ type: 'error', text: response.data.message })
          })
      })
    }
    return { form, rules, count, sendCode, target, submit }
  }
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
