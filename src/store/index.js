import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import category from './modules/category'
import user from './modules/user'
import cart from './modules/cart'
export default createStore({
  usestrict: process.env.NODE_ENV === 'development',
  modules: {
    category,
    user,
    cart
  },
  // 用于配制插件
  plugins: [
    createPersistedState({
      /**
       * 官方文档:https://github.com/robinvdvleuten/vuex-persistedstate
       * 默认是将整个store里所有模块都储存在localstorage中,且名字为vuex
       */
      key: 'rabbit-shopping', // 配制存储的名字
      paths: ['user', 'cart'], // 指定需要数据持久化的模块
      storage: localStorage // 指定数据存储的位置,默认localStorage,还可配置sessionStorage,cookie(cookie需要额外配置)
    })
  ]
})
