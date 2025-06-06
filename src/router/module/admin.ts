import type { IRouteRawLite } from '../router'

export const adminRouter: IRouteRawLite = {
  path: '/admin',
  component: () => import('@/views/Admin/index.vue'),
  meta: { title: '论坛后台' },
  children: [
    {
      path: 'user',
      name: 'admin-user',
      component: () => import('@/views/Admin/User/index.vue'),
      meta: { title: '用户管理', icon: 'IconUser' },
    },
    {
      path: 'license',
      name: 'admin-license',
      component: () => import('@/views/Admin/License/index.vue'),
      meta: { title: '授权管理', icon: 'IconKey' },
    },
    {
      path: 'group',
      name: 'admin-group',
      component: () => import('@/views/Admin/Group/index.vue'),
      meta: { title: '专栏管理', icon: 'IconGfaomParameterConfiguration' },
    },
    {
      path: 'reply',
      name: 'admin-reply',
      component: () => import('@/views/Admin/Reply/index.vue'),
      meta: { title: '帖子管理', icon: 'IconFileDescription' },
    },
    {
      path: 'comment',
      name: 'admin-comment',
      component: () => import('@/views/Admin/Comment/index.vue'),
      meta: { title: '评论管理', icon: 'IconMessageOne' },
    },
    {
      path: 'banner',
      component: () => import('@/views/Admin/Banner/index.vue'),
      meta: { title: '轮播管理', icon: 'IconRPAAIKRPAImgVerifyColor' },
    },
    {
      path: 'recycle',
      component: () => import('@/views/Admin/Recycle/index.vue'),
      meta: { title: '回收站', icon: 'IconDelete' },
    },
  ],
}
