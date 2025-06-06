import { setToken } from '@ksware/micro-lib-web-temp'
import router from './router/router'
import { getUrlParamByName, removeTokenFromUrl } from '@/utils/auth'
import { isAdmin } from './utils/check'
import { KMessage } from '@ksware/ksw-ux'

const permNameList = ['/admin']
/** 从那个页面来 */
// 路由执行前加载缓存数据
router.beforeEach((to, from, next) => {
  const urlToken = getUrlParamByName('Token')
  /** url 携带 token */
  if (urlToken) {
    setToken(urlToken)
    const url = location.href.replace(/token=[a-z0-9]{32}/i, '')
    history.replaceState({}, '', url)
    const newPath = removeTokenFromUrl(to.fullPath)
    next(newPath)
    return
  }
  /** 没有 token */
  // if (!getToken() && to.path !== '/login') {
  //   const { userInfo, exitLogin } = useUser()
  //   /** 记住登录状态 */
  //   if (userInfo.token && userInfo.rememberInfo) {
  //     setToken(userInfo.token)
  //     next(to.path)
  //     return
  //   }
  //   /** 没有记住登录状态 */
  //   exitLogin() // 清空信息
  //   next('/login' + `?toRedirectPath=${to.fullPath}`)
  //   return
  // }
  const isProtectedByPrefix = permNameList.some((path) => to.path.startsWith(path))
  // 或者通过 meta 标记需要权限
  const isProtectedByMeta = to.meta.requiresAuth
  if (isProtectedByPrefix || isProtectedByMeta) {
    if (!isAdmin()) {
      KMessage.error('没有权限进入该页面!')
      next('/')
      return
    }
  }
  /** 校验进入页面的权限 */
  // if (permNameList.includes(to.path)) {
  //   if (!isAdminRolePermission()) {
  //     KMessage.error('没有权限进入该页面!')
  //     next('/store')
  //     return
  //   }
  // }
  const title = to.meta && to.meta.title ? to.meta.title : 'RPA Lite 论坛'
  document.title = title as string
  next()
})
