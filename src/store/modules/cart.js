import {
  getNewCartGoods,
  mergeLocalCart,
  findCartList,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart
} from '@/api/cart'
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
      // 优化成:根据传入的属性有值则更新
      for (const k in payload) {
        if (
          payload[k] !== null &&
          payload[k] !== undefined &&
          payload[k] !== ''
        ) {
          sku[k] = payload[k]
        }
      }
      // sku.isEffective = payload.isEffective
      // sku.nowPrice = payload.nowPrice
      // sku.stock = payload.stock
    },
    // 删除购物车对应商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车列表
    setCartList(state, list) {
      state.list = list
    }
  },
  actions: {
    // 判断用户是否登录,如登录则发送请求获取购物车信息,若没登录则提交一个mutations(insertCart)
    insertCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.userInfo.token) {
          // 已登录发送请求获取购物车信息
          insertCart({ skuId: payload.skuId, count: payload.count }).then((res) => {
            context.dispatch('updateCart')
            resolve()
          })
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
          findCartList().then(({ result }) => {
            context.commit('setCartList', result)
            resolve()
          })
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
          deleteCart([skuId]).then((res) => {
            context.dispatch('updateCart')
            resolve()
          })
        } else {
          context.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 更新购物车中单选或者修改数量操作
    updateChange(context, payload) {
      return new Promise((resolve, reject) => {
        // 若已登录发送请求获取购物车信息
        if (context.rootState.user.userInfo.token) {
          updateCart(payload).then(() => {
            context.dispatch('updateCart')
            resolve()
          })
        } else {
          context.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 有效商品的全选&反选
    updateChangeAll(context, selected) {
      return new Promise((resolve, reject) => {
        // 若已登录发送请求获取购物车信息
        if (context.rootState.user.userInfo.token) {
          const ids = context.getters.validCartList.map((item) => item.skuId)
          checkAllCart({ selected, ids }).then(() => {
            context.dispatch('updateCart')
            resolve()
          })
        } else {
          // 获取有效的商品列表,便利调用修改mutation
          context.getters.validCartList.forEach((goods) => {
            context.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除操作或者清除失效商品(isClear)
    batchDeleteCart(context, isClear) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.userInfo.token) {
          const skuIds = context.getters[isClear ? 'invalidCartList' : 'validCartList'].map((item) => {
            return isClear ? item.skuId : item.selected && item.skuId
          })
          deleteCart(skuIds).then((res) => {
            context.dispatch('updateCart')
            resolve()
          })
          console.log('skuids', skuIds)
        } else {
          // 便利有效商品或者失效商品列表,批量提交mutation进行删除
          context.getters[
            isClear ? 'invalidCartList' : 'validCartList'
          ].forEach((cartGoods) => {
            cartGoods.selected && context.commit('deleteCart', cartGoods.skuId)
            isClear && context.commit('deleteCart', cartGoods.skuId)
          })
          resolve()
        }
      })
    },
    // 更新购物车规格
    updateCartSku(context, { newSku, oldSkuId }) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.userInfo.token) {
          // 1.发送请求删除旧的sku
          deleteCart([oldSkuId]).then(() => {
            // 2.发送请求新增新的sku,注意:count是旧的sku数量
            context.dispatch('insertCart', {
              skuId: newSku.id,
              count: context.state.list.find((v) => v.skuId === oldSkuId).count
            })
            // 3.重新发送请求渲染(在insertCart中已处理)
            resolve()
          })
        } else {
          // 1.先根据oldSkuId找到旧的那个商品信息
          const oldSku = context.state.list.find((item) => item.skuId === oldSkuId)
          // console.log('oldSku', oldSku)
          //  2.删除旧的商品信息
          context.commit('deleteCart', oldSkuId)
          // 3.合并新的sku信息和老的sku信息
          // console.log('new', newSku)
          const mergeSku = {
            ...oldSku,
            skuId: newSku.id,
            nowPrice: newSku.price,
            price: newSku.price,
            stock: newSku.inventory,
            attrsText: newSku.specs.reduce((cur, pre) => `${cur} ${pre.name}: ${pre.valueName}`, '')
          }
          // 4.插入新的sku
          context.commit('insertCart', mergeSku)
          // 5.成功
          resolve()
        }
      })
    },
    // 登录成功后合并本地购物车
    mergeLocalCart(context) {
      const mergeList = context.getters.validCartList.map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      })
      // 1.请求接口合并本地购物车
      mergeLocalCart(mergeList).then(() => {
        // 2.清空本地购物车
        context.commit('setCartList', [])
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
    },
    // 选中的商品列表
    selectedCartList(state) {
      return state.list.filter((item) => item.selected)
    },
    // 选中的商品总件数
    selectedTotal(state, getters) {
      return getters.selectedCartList.reduce((pre, cur) => pre + cur.count, 0)
    },
    // 选中的商品总金额
    selectedAmount(state, getters) {
      return getters.selectedCartList
        .reduce((pre, cur) => pre + cur.nowPrice * cur.count, 0)
        .toFixed(2)
    },
    // 是否全选
    isCheckedAll(state, getters) {
      return !!(
        getters.validCartList.length === getters.selectedCartList.length &&
        getters.selectedCartList.length !== 0
      )
    }
  }
}
