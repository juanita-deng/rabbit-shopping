/**
 * 这就是插件
 * 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
 *   vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
 *   vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
 * @author juanit-deng
 * @time 2022-08-31
 * */
import RabbitSkeleton from '@/components/rabbit-skeleton.vue'
import RabbitCarousel from '@/components/rabbit-carousel.vue'
import RabbitMore from '@/components/rabbit-more.vue'
export default {
  install(app) {
    /*
        在app上进行扩展，app提供 component directive 函数
        如果要挂载原型 app.config.globalProperties 方式
    */
    app.component(RabbitSkeleton.name, RabbitSkeleton)
    app.component(RabbitCarousel.name, RabbitCarousel)
    app.component(RabbitMore.name, RabbitMore)
  }
}
