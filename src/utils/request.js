import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})
/**
 * 请求/响应 拦截器http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
 */
instance.interceptors.request.use(
  // 在发送请求之前做些什么
  (config) => {
    return config
  },
  // 对请求错误做些什么
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  // 对响应数据做点什么
  (res) => {
    return res.data
  },
  // 对响应错误做些什么
  (err) => {
    return Promise.reject(err)
  }
)
export default instance
