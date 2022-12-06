import { getNewCartGoods } from '@/api/cart'
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    // 加入购物车
    /*
    payload的参数
    id: 商品的id
    name: 商品的名字
    picture: 商品的图片
    price： 加入时的价格
    count: 加入购物车的商品的数量
    skuId： 选择的商品的sku
    attrsText: 商品的规格的字符串  颜色：蓝色 尺寸：30cm
    selected: 商品是否选中
    nowPrice： 商品最新的价格
    stock： 商品的库存
    isEffective： 商品是否有效

    1. 判断payload中的skuId在list中是否存在
    2. 如果有，就把数量加上，，，把这件商品放到最上面
    3. 如果没有，就把这个商品放到列表的最前面。
  */
    insertCart(state, payload) {
      const index = state.list.findIndex((item) => item.skuId === payload.skuId)
      if (index > -1) {
        // 如果该商品已经在购物车,则加上数量,并删掉之前的商品
        payload.count += state.list[index].count
        state.list.splice(index, 1)
      }
      // 把加入的商品放入到购物车列表最上面
      state.list.unshift(payload)
    },
    // 更新购物车商品最新信息(以防出现失效商品)
    updateCart(state, payload) {
      // 找到需要更新的商品
      const sku = state.list.find((goods) => goods.skuId === payload.skuId)
      // 更新接口返回的对应最新属性
      sku.isEffective = payload.isEffective
      sku.nowPrice = payload.nowPrice
      sku.stock = payload.stock
    },
    // 删除购物车对应商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 判断用户是否登录,如登录则发送请求获取购物车信息,若没登录则提交一个mutations(insertCart)
    insertCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.userInfo.token) {
          // 已登录发送请求获取购物车信息
        } else {
          context.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新购物车列表
    updateCart(context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.userInfo.token) {
          // 若已登录发送请求获取购物车信息
        } else {
          // 没有登录，需要发送请求进行商品信息更新(需要获取购物车所有商品的ID)
          const promiseArr = context.state.list.map((item) => {
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then((res) => {
            res.forEach((item, index) => {
              // 更新购物车列表
              context.commit('updateCart', {
                skuId: context.state.list[index].skuId,
                ...item.result
              })
            })
            resolve()
          })
        }
      })
    },
    // 删除购物车对应商品
    deleteCart(context, skuId) {
      return new Promise((resolve, reject) => {
        // 若已登录发送请求获取购物车信息
        if (context.rootState.user.userInfo.token) {
        } else {
          context.commit('deleteCart', skuId)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validCartList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      return getters.validCartList.reduce((pre, cur) => pre + cur.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return getters.validCartList
        .reduce((pre, cur) => pre + cur.nowPrice * cur.count, 0)
        .toFixed(2)
    },
    // 无效商品列表
    invalidCartList(state) {
      return state.list.filter((item) => !(item.stock > 0 && item.isEffective))
    }
  }
}
