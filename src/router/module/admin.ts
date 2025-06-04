import type { IRouteRawLite } from '../router'

export const adminRouter: IRouteRawLite = {
  path: '/admin',
  component: () => import('@/views/Admin/index.vue'),
  meta: { title: '论坛后台' },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/Admin/User/index.vue'),
      meta: { title: '用户管理', icon: 'el-icon-s-home' },
    },
    {
      path: 'license',
      name: 'license',
      component: () => import('@/views/Admin/License/index.vue'),
      meta: { title: '授权管理', icon: 'el-icon-s-home' },
    },
    {
      path: 'group',
      name: 'group',
      component: () => import('@/views/Admin/Group/index.vue'),
      meta: { title: '专栏管理', icon: 'el-icon-s-home' },
    },
    {
      path: 'reply',
      name: 'reply',
      component: () => import('@/views/Admin/Reply/index.vue'),
      meta: { title: '帖子管理', icon: 'el-icon-s-home' },
    },
    {
      path: 'comment',
      name: 'comment',
      component: () => import('@/views/Admin/Comment/index.vue'),
      meta: { title: '评论管理', icon: 'el-icon-s-home' },
    },
    //   {
    //     path: 'banner',
    //     component: () => import('@/views/admin/components/banner'),
    //     meta: { title: '轮播管理', icon: 'el-icon-s-home' }
    //   },
    //   {
    //     path: 'recycle',
    //     component: () => import('@/views/admin/components/recycle'),
    //     meta: { title: '回收站', icon: 'el-icon-s-home' }
    //   },
  ],
}
