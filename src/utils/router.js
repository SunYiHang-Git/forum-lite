import {
  getSessionValue,
  getToken,
  initGlobalVariable,
  isInset,
  setSessionValue,
  setToken,
} from '@ksware/micro-lib-web-temp'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getWindowUrlObj } from './postMessage'
import { KMessage } from '@ksware/ksw-ux'
import { isAdminRolePermission } from '@/views/login/permission'

export const routeList = [
  {
    path: '/',
    redirect: '/store',
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
    component: () => import('@/views/login/loginIndex.vue'),
  },
  {
    path: '/store',
    name: '金智维市场',
    // 单个路由组件，即，要显示的网页内容
    component: () => import('@/views/Goods/index.vue'),
    children: [
      {
        path: '',
        name: 'store',
        component: () => import('@/views/Goods/MainRight/index.vue'),
      },
    ],
  },
  {
    path: '/application',
    name: '应用管理',
    // 单个路由组件，即，要显示的网页内容
    component: () => import('@/views/ApplicationManage/index.vue'),
    children: [
      {
        path: '',
        name: 'app-manage',
        component: () => import('@/views/ApplicationManage/Application/index.vue'),
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
  item.meta.keepAlive === undefined && (item.meta.keepAlive = true)
})

const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes: routeList,
})

initGlobalVariable('routerInstance', router)
let isFirst = false
// 路由执行前加载缓存数据
router.beforeEach((to, from, next) => {
  // 解决第一次路由跳转问题
  // if (!isFirst && isInset) {
  //   isFirst = true
  //   return
  // }

  // 非微前端模式，检查token， 没有token则去登录页面
  // if (!isInset && !getToken() && to.path !== '/login') {
  //   next('/login')
  //   return
  // }
  if (!getToken() && isInset) {
    const { token } = getWindowUrlObj()
    if (token) {
      setToken(token)
      next('/')
      return
    }
  }
  if (!getToken() && to.path !== '/login') {
    next('/login')
    return
  }
  const permNameList = ['/application']
  if (permNameList.includes(to.path)) {
    if (!isAdminRolePermission()) {
      KMessage.error('没有权限进入该页面!')
      next('/store')
      return
    }
  }

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
