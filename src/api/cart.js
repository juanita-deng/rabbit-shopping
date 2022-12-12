import request from '@/utils/request'
/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request({
    method: 'get',
    url: `/goods/stock/${skuId}`
  })
}
/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = skuId => {
  return request({
    method: 'get',
    url: `/goods/sku/${skuId}`
  })
}
