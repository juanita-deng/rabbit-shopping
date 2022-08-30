import { defaultCategory } from '@/api/constant'
import Mock from 'mockjs'
const images = [
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(1).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(2).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(3).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(5).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(6).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(7).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(8).png'
]
const categoryList = defaultCategory.map((v) => {
  const children = []
  // 模拟10条二级分类
  for (let i = 0; i < 10; i++) {
    children.push(
      Mock.mock({
        id: '@id', // 生成随机的ID
        name: '@ctitle(2,4)', // 生成随机的中文2~4个字
        picture: images[Mock.mock('@integer(0,7)')] // 生成整数0-7之间
      })
    )
  }
  return Mock.mock({
    id: '@id',
    name: v,
    open: false,
    children
  })
})
export const category = () => {
  return {
    msg: '操作成功',
    result: categoryList
  }
}
