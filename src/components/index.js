/**
 * 这就是插件
 * 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
 *   vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
 *   vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
 * @author juanit-deng
 * @time 2022-08-31
 * */
// import RabbitSkeleton from '@/components/rabbit-skeleton.vue'
// import RabbitCarousel from '@/components/rabbit-carousel.vue'
// import RabbitMore from '@/components/rabbit-more.vue'
import { h, render } from 'vue'
import rabbitMessage from './rabbit-message.vue'
import rabbitConfirm from './rabbit-confirm.vue'

export default {
  install(app) {
    /*
        在app上进行扩展，app提供 component directive 函数
        如果要挂载原型 app.config.globalProperties 方式
    */
    // app.component(RabbitSkeleton.name, RabbitSkeleton)
    // app.component(RabbitCarousel.name, RabbitCarousel)
    // app.component(RabbitMore.name, RabbitMore)

    /**
     * require.context()是webpack提供的一个自动化导入的API
     * @parm1 加载的文件目录
     * @pram2 是否加载子目录
     * @pram3 正则,匹配文件
     * @return 返回导入的函数fn
     * @method .keys()获取读取到的所有文件列表
     */
    // 1.加载components下所有的vue文件
    const ctx = require.context('./', false, /\.vue$/)
    ctx.keys().forEach((path) => {
      // path 组件的地址
      const component = ctx(path).default
      app.component(component.name, component)
    })

    // 2.自定义指令 聚焦
    app.directive('focus', {
      mounted(el) {
        el.focus()
      }
    })
    // 3.自定义指令 图片懒加载
    /**
     * IntersectionObserver构造器
     * 参考文档:https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
     * @param 参数1:回调函数, 返回值:1.entries:被监听对应的数组 2.observer:被调用的实例
     * @param 参数2:配置  1.root基于的滚动容器，默认是document 2.rootMargin容器有没有外边距  3.threshold 交叉界的阈值
     * @returns 一个可以使用规定阈值监听目标元素可见部分与root交叉状况的新的IntersectionObserver 实例。
     *        提供两个方法:observe(dom) 观察哪个dom
     *                   unobserve(dom) 停止观察那个dom
     */
    app.directive('lazy', {
      mounted(el, { value }) {
        // 图片的懒加载逻辑
        const observer = new IntersectionObserver(
          ([{ isIntersecting }], observer) => {
            if (isIntersecting) {
              // 停止监听
              observer.unobserve(el)
              // 图片加载失败给的默认图
              el.onerror = () => {
                el.src = require('@/assets/images/200.png')
              }
              // 给el元素添加src属性
              el.src = value
            }
          },
          { threshold: 0.1 }
        )
        // 调用自身的observe() 方法开始使用规定的阈值监听指定目标。
        observer.observe(el)
      }
    })
    // 4.增加全局方法
    /** https://www.javascriptc.com/vue3js/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
     * 在vue2中写法:Vue.prototype.$message = Message()
     */
    app.config.globalProperties.$message = Message
  }
}
/**
 * @param {String} type success error warning
 * @param {String} text 校验的具体文本提示
 * @param {Number} duration 延时的具体时间
 * @example1 Message({type:'success',text:'校验成功',duration:2000})
 * @example2 this.$message({type:'success',text:'校验成功',duration:2000})
 */
const div = document.createElement('div')
div.setAttribute('class', 'rabbit-message-container')
document.body.appendChild(div)
const timer = null
export function Message({ type, text, duration = 2000 }) {
  const vnode = h(rabbitMessage, { type, text })
  render(vnode, div)
  clearInterval(timer)
  setInterval(() => {
    // 删除虚拟dom
    render(null, div)
  }, duration)
}
/**
 * @param {*} title 提示的标题
 * @param {*} text 提示的文本信息(必传项)
 * @returns promise
 * @example Confirm({title:'',text:''}).then(() => {}).catch(() => {})
 * @example this.$confirm({title:'',text:''}).then(() => {}).catch(() => {})
 */
const confirm = document.createElement('div')
confirm.setAttribute('class', 'rabbit-confirm-container')
document.body.appendChild(confirm)
export function Confirm({ title, text }) {
  return new Promise((resolve, reject) => {
    // 2.点击确认按钮,触发resolve并销毁组件
    const confirmCallback = () => {
      // 销毁虚拟dom
      render(null, confirm)
      resolve()
    }
    // 3.点击确认按钮,触发reject并销毁组件
    const cancelCallback = () => {
      render(null, confirm)
      reject(new Error('点击取消'))
    }
    // 1.创建虚拟节点
    // 将渲染成 <RabbitConfirm :title='title' :text='text' :confirmCallback='confirmCallback' :cancelCallback='cancelCallback></RabbitConfirm>
    const vnode = h(rabbitConfirm, {
      title,
      text,
      confirmCallback,
      cancelCallback
    })
    render(vnode, confirm)
  })
}
