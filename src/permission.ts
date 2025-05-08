import { getToken, setToken } from '@ksware/micro-lib-web-temp'
import router from './utils/router'
import { getUrlParamByName, removeTokenFromUrl } from '@/utils/auth'
import { useRouterInfo, type IBreadcrumbs } from '@/store/modules/useRouterInfo'
import { useUser } from './store/modules/user'

const toRouterList = ['/home', '/login']
const permNameList = ['/application']
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
  /** 校验进入页面的权限 */
  // if (permNameList.includes(to.path)) {
  //   if (!isAdminRolePermission()) {
  //     KMessage.error('没有权限进入该页面!')
  //     next('/store')
  //     return
  //   }
  // }
  if (to.meta?.breadcrumb) {
    const { setBreadcrumbList, clearBreadcrumbList } = useRouterInfo()
    if (toRouterList.includes(to.path)) {
      clearBreadcrumbList()
    } else {
      const obj: IBreadcrumbs = {
        path: to.path,
        name: to.name as string,
        label: (to.meta?.breadcrumb as string) ?? '',
      }
      setBreadcrumbList(obj)
    }
  }
  const title = to.meta && to.meta.title ? to.meta.title : 'RPA Lite 论坛'
  document.title = title as string
  next()
})
