import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式处理文件,类似reset.css,相对更加平和
import 'normalize.css'
createApp(App).use(store).use(router).mount('#app')
