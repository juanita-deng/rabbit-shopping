import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
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
  {
    path: '/member/checkout',
    component: () => import('@/views/member/pay/checkout')
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
// 配置路由导航守卫,拦截带 /member的所有地址
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (store.state.user.userInfo?.token) {
    next()
  } else {
    if (to.path.includes('/member')) {
      // qq登录从本地取重定向url(解决:QQ登录的重定向参数丢失)
      localStorage.setItem('redirectUrl', to.fullPath)
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

export default router
