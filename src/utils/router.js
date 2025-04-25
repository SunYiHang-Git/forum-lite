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
import { getUrlParamByName } from '@/utils/auth'

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
    path: '/home',
    name: 'homeLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '金智维rpa论坛', icon: 'el-icon-s-home', breadcrumb: '社区首页' },
      },
    ],
  },
  {
    path: '/class',
    name: 'classLayout',
    component: Layout,
    children: [
      {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类', icon: 'el-icon-s-home', breadcrumb: '知识分享' },
      },
      {
        path: 'interaction',
        name: 'interaction',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类', icon: 'el-icon-s-home', breadcrumb: '互动解答' },
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类', icon: 'el-icon-s-home', breadcrumb: '官方公告' },
      },
    ],
  },
  {
    path: '/article/:id',
    name: 'articleLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'article',
        component: () => import('@/views/Article/PostArticle.vue'),
        meta: { title: '发/编辑帖子', icon: 'el-icon-s-home', breadcrumb: '发表帖子' },
      },
    ],
  },
  {
    path: '/detail/:id',
    name: 'detailLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'detail',
        component: () => import('@/views/Article/ArticleDetail.vue'),
        meta: { title: '帖子详情', icon: 'el-icon-s-home', breadcrumb: '帖子详情' },
      },
    ],
  },
  {
    path: '/user',
    name: 'userLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/User/index.vue'),
        meta: { title: '我的', icon: 'el-icon-s-home', breadcrumb: '我的主页' },
      },
      {
        path: '/user-info',
        name: 'userInfo',
        component: () => import('@/views/User/InforMation.vue'),
        meta: { title: '编辑资料', icon: 'el-icon-s-home', breadcrumb: '用户资料' },
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
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 60, // 顶部栏高度补偿
        behavior: 'smooth',
      }
    }
    return savedPosition || { top: 0 }
  },
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

  const urlToken = getUrlParamByName('Token')
  if (urlToken) {
    setToken(urlToken)
    const url = location.href.replace(/token=[a-z0-9]{32}/i, '')
    history.replaceState({}, undefined, url)
    next('/home')
    return
  }
  // if (!getToken() && to.path !== '/login') {
  //   next('/login' + `?toRedirectPath=${to.fullPath}`)
  //   return
  // }
  /** 校验进入页面的权限 */
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
