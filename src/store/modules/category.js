import { findAllCategory } from '@/api/category'
import { defaultCategory } from '@/api/constant'
export default {
  namespaced: true,
  state: () => {
    return {
      list: defaultCategory.map((v) => ({ name: v }))
    }
  },
  mutations: {
    setList(state, data) {
      state.list = data
    },
    show(state, id) {
      const item = state.list.find((v) => v.id === id)
      item.open = true
    },
    hide(state, id) {
      const item = state.list.find((v) => v.id === id)
      item.open = false
    }
  },
  actions: {
    async getList({ commit }) {
      const { result } = await findAllCategory()
      // 给list添加open属性,用于动态控制二级分类弹窗的展示和隐藏
      result.forEach((v) => (v.open = false))
      commit('setList', result)
    }
  }
}
