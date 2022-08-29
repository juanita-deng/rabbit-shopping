import { createRouter, createWebHashHistory } from 'vue-router'

import layOut from '@/views/layOut/index'
const routes = [
  { path: '/', component: layOut },
  { path: '/login', component: () => import('@/views/login/index') } // 路由懒加载
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
