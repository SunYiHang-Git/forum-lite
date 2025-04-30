import { initGlobalVariable } from '@ksware/micro-lib-web-temp'
import { createRouter, createWebHashHistory } from 'vue-router'
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
    path: '/home',
    name: 'homeLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'RPA Lite 论坛', icon: 'el-icon-s-home', breadcrumb: '社区首页' },
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
        meta: { title: '论坛分类-知识分享', icon: 'el-icon-s-home', breadcrumb: '知识分享' },
      },
      {
        path: 'interaction',
        name: 'interaction',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类-互动解答', icon: 'el-icon-s-home', breadcrumb: '互动解答' },
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/classList/index.vue'),
        meta: { title: '论坛分类-官方公告', icon: 'el-icon-s-home', breadcrumb: '官方公告' },
      },
    ],
  },
  {
    path: '/article/',
    name: 'articleLayout',
    component: Layout,
    children: [
      {
        path: 'add/:id',
        name: 'addArticle',
        component: () => import('@/views/Article/PostArticle.vue'),
        meta: { title: '发布帖子', icon: 'el-icon-s-home' },
      },
      {
        path: 'edit/:id',
        name: 'editArticle',
        component: () => import('@/views/Article/PostArticle.vue'),
        meta: { title: '编辑帖子', icon: 'el-icon-s-home' },
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
      {
        path: '/message',
        name: 'message',
        component: () => import('@/views/Message/index.vue'),
        meta: { title: '我的消息', icon: 'el-icon-s-home', breadcrumb: '消息中心' },
      },
    ],
  },
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

export default router
