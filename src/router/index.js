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
      },
      {
        path: '/product/:id',
        component: () => import('@/views/goods')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index') }, // 路由懒加载
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback.vue')
  },
  {
    path: '/cart',
    component: () => import('@/views/cart')
  },
  { path: '/test', component: () => import('@/views/test/createVNode.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      left: 0, // 注意:vue2中返回的是x,y
      top: 0
    }
  }
})

export default router
