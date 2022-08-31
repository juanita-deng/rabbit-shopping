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
