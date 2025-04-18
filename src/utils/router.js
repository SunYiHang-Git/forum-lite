import {
  getSessionValue,
  getToken,
  initGlobalVariable,
  isInset,
  setSessionValue,
  setToken,
} from '@ksware/micro-lib-web-temp'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { getWindowUrlObj } from './postMessage'
import Layout from '@/Layout/index.vue'

export const routeList = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/empty__Page',
    // 修复手动缓存切换问题，勿删
    component: import('@/component/EmptyPage.vue'),
  },
  {
    // 路由地址，同主框架里面增加菜单的路由地址
    path: '/login',
    name: '登录页面',
    // 单个路由组件，即，要显示的网页内容
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '金智维rpa论坛', icon: 'el-icon-s-home' },
      },
      {
        path: '/class',
        name: 'Class',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类', icon: 'el-icon-s-home' },
      },
      {
        path: '/post-article',
        name: 'post-article',
        component: () => import('@/views/Article/PostArticle.vue'),
        meta: { title: '论坛分类', icon: 'el-icon-s-home', reuseKey: (to) => to.fullPath },
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/Article/ArticleDetail.vue'),
        meta: { title: '帖子详情', icon: 'el-icon-s-home' },
      },
    ],
  },
  // 模版页面,用户管理页面
  // {
  //   path: '/userMgrJson',
  //   name: '用户管理',
  //   component: () => import('@/views/demo/userMgr_table.vue'),
  // },
]

routeList.forEach((item) => {
  !item.meta && (item.meta = {})
  // item.meta.keepAlive === undefined && (item.meta.keepAlive = true)
})

const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes: routeList,
})

initGlobalVariable('routerInstance', router)
let isFirst = false
const permNameList = ['/application']
// 路由执行前加载缓存数据
router.beforeEach((to, from, next) => {
  // if (!getToken() && isInset) {
  //   const { token } = getWindowUrlObj()
  //   if (token) {
  //     setToken(token)
  //     next('/')
  //     return
  //   }
  // }
  if (!getToken() && to.path !== '/login') {
    next('/login' + `?toFullPath=${to.path}`)
    return
  }

  // if (permNameList.includes(to.path)) {
  //   if (!isAdminRolePermission()) {
  //     KMessage.error('没有权限进入该页面!')
  //     next('/store')
  //     return
  //   }
  // }

  // 开发模式生效，刷新浏览器 继续打开之前打开的路由，方便调试
  if (import.meta.env.DEV && !isInset) {
    if (to.fullPath === '/') {
      const lastRoutePath = getSessionValue('last_route_path')
      if (lastRoutePath && lastRoutePath !== '/login') {
        next(lastRoutePath)
        return
      }
    } else {
      setSessionValue('last_route_path', to.fullPath)
    }
  }
  next()
})
export default router
