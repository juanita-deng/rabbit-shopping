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
    // 加载components下所有的vue文件
    const ctx = require.context('./', false, /\.vue$/)
    // console.log('ctx', ctx)
    ctx.keys().forEach((path) => {
      // path 组件的地址
      const component = ctx(path).default
      // console.log('component', component)
      app.component(component.name, component)
    })
  }
}
