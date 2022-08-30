import { createRouter, createWebHashHistory } from 'vue-router'

import layOut from '@/views/layOut/index'
import home from '@/views/home'
const routes = [
  {
    path: '/',
    component: layOut,
    children: [
      { path: '', component: home },
      { path: '/category/:id', component: () => import('@/views/categroy') },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/categroy/subCategory')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index') } // 路由懒加载
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
