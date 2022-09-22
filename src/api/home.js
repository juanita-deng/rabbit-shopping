import request from '@/utils/request'
/**
 * 获取品牌列表
 * @param limit
 * @returns promise
 */
export const getBrandList = (limit = 6) => {
  return request({
    method: 'get',
    url: '/home/brand',
    params: { limit }
  })
}

/**
 * 获取首页轮播图banner数据
 * @param
 * @returns promise
 */
export const getBannerList = () => {
  return request({
    method: 'get',
    url: '/home/banner'
  })
}

/**
 * 获取首页新鲜好物数据
 * @param
 * @returns promise
 */
export const getFreshGoods = () => {
  return request({
    method: 'get',
    url: '/home/new'
  })
}

/**
 * 获取首页人气推荐数据
 * @param
 * @returns promise
 */
export const getHotGoods = () => {
  return request({
    method: 'get',
    url: '/home/hot'
  })
}

/**
 * 获取商品数据
 * @param
 * @returns promise
 */
export const getProduct = () => {
  return request({
    method: 'get',
    url: '/home/goods'
  })
}

/**
 * 获取专题数据
 * @returns Promise
 */
export function getSpecial() {
  return request({
    method: 'get',
    url: 'home/special'
  })
}
