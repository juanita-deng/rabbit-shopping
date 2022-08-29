import { createStore } from 'vuex'
import category from './modules/category'
export default createStore({
  usestrict: process.env.NODE_ENV === 'development',
  modules: {
    category
  }
})
