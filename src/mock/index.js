/**
 * mockjs 模拟接口数据
 *   使用步骤:
 *      1.下载mockjs  npm i mockjs
 *      2.main.js 中引入(等接口调试完成后可删除)
 *
 */
import Mock from 'mockjs'
import { category } from './category'
// mock的配置
Mock.setup({
  // 增加延时,模拟数据请求交互效果
  timeout: '500-1000'
})

// 参数1:url 需要用正则进行匹配,注意转义字符
// 参数2:请求方式
// 参数3:用于返回模拟的数据函数
Mock.mock(/\/home\/category\/head/, 'get', category)
