import { createStore } from 'vuex'
import category from './modules/category'
import user from './modules/user'
export default createStore({
  usestrict: process.env.NODE_ENV === 'development',
  modules: {
    category,
    user
  }
})
