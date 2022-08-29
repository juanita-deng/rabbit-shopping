import request from '@/utils/request'
// 查询所有的分类,返回一个promise
export const findAllCategory = () => {
  return request({
    method: 'get',
    url: '/home/category/head'
  })
}
