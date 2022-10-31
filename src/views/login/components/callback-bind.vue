<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form
      ref="target"
      :validation-schema="rules"
      autocomplete="off"
      v-slot="{ errors }"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            name="mobile"
            v-model="form.mobile"
            class="input"
            type="text"
            placeholder="绑定的手机号"
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
            placeholder="短信验证码"
          />
          <span class="code" @click="sendCode">
            {{ count === 0 ? '发送验证码' : `${count}s后重试` }}
          </span>
        </div>
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>
    </Form>
    <a href="javascript:;" class="submit" @click="bindQQ">立即绑定</a>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { mobile, code } from '@/utils/validate'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { Message } from '@/components'
import { useCountDown } from '@/hooks'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
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
    const qqInfo = reactive({
      avatar: '',
      nickname: ''
    })
    const form = reactive({
      mobile: '',
      code: ''
    })
    const rules = { mobile, code }
    window.QC.api('get_user_info')
      .success(({ data }) => {
        qqInfo.avatar = data.figureurl_qq_2
        qqInfo.nickname = data.nickname
      })
      .error((err) => {
        console.log('err', err)
      })
    const target = ref(null)
    const { start, count } = useCountDown()
    const sendCode = () => {
      // 1.对手机号进行校验
      const validateStatus = rules.mobile(form.mobile)
      if (validateStatus !== true) {
        target.value.setFieldError('mobile', validateStatus)
      }
      if (count.value > 0) return // 禁止重复发送请求
      // 2.校验通过后发送请求
      userQQBindCode(form.mobile)
        .then(({ result }) => {
          console.log('res', result)
          // 3.发送成功后开启倒计时
          Message({ type: 'success', text: '发送成功' })
          start()
        })
        .catch(({ response }) => {
          Message({ type: 'error', text: response.data.message })
        })
    }
    const store = useStore()
    const router = useRouter()
    const bindQQ = () => {
      target.value.validate().then((res) => {
        if (!res) {
          return Message({ type: 'error', text: '校验失败', duration: 3000 })
        }
        props.unionId &&
          userQQBindLogin({
            unionId: props.unionId,
            ...form
          }).then(({ result }) => {
            store.commit('user/setUserInfo', result)
            Message({ text: '绑定成功' })
            router.push('/')
          })
      })
    }
    return { ...toRefs(qqInfo), form, rules, sendCode, count, target, bindQQ }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
