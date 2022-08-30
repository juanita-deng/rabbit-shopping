import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式处理文件,类似reset.css,相对更加平和
import 'normalize.css'
import '@/assets/styles/common.less'
// 导入模拟mock数据(会优先走本地mock数据,接口调通后可删除)
// import './mock'
createApp(App).use(store).use(router).mount('#app')
