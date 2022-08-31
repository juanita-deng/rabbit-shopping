import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式处理文件,类似reset.css,相对更加平和
import 'normalize.css'
import '@/assets/styles/common.less'
// 导入模拟mock数据(会优先走本地mock数据,接口调通后可删除)
// import './mock'

import rabbitUI from '@/components/library/index'
// import XtxSkeleton from '@/components/library/rabbit-skeleton.vue'
createApp(App)
  .use(store)
  .use(router)
  // 注册插件
  .use(rabbitUI)
  // 注册全局组件
  //   .component(XtxSkeleton.name, XtxSkeleton)
  .mount('#app')
