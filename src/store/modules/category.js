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
    }
  },
  actions: {
    async getList({ commit }) {
      const { result } = await findAllCategory()
      commit('setList', result)
    }
  }
}
