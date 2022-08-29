import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
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
