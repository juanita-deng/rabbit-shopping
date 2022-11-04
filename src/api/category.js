import request from '@/utils/request'
// 查询所有的分类,返回一个promise
export const findAllCategory = () => {
  return request({
    method: 'get',
    url: '/home/category/head'
  })
}
/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export function findTopCategory(id) {
  return request({
    method: 'get',
    url: '/category',
    params: {
      id
    }
  })
}
