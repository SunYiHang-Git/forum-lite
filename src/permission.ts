import { getToken, setToken } from '@ksware/micro-lib-web-temp'
import router from './utils/router'
import { getUrlParamByName } from '@/utils/auth'
import { useRouterInfo, type IBreadcrumbs } from '@/store/modules/useRouterInfo'

const toRouterList = ['/home', '/login']
const permNameList = ['/application']
/** 从那个页面来 */
// 路由执行前加载缓存数据
router.beforeEach((to, from, next) => {
  const urlToken = getUrlParamByName('Token')
  if (urlToken) {
    setToken(urlToken)
    const url = location.href.replace(/token=[a-z0-9]{32}/i, '')
    history.replaceState({}, '', url)
    next('/home')
    return
  }
  if (!getToken() && to.path !== '/login') {
    console.log('to--->', to)
    next('/login' + `?toRedirectPath=${to.fullPath}`)
    return
  }
  /** 校验进入页面的权限 */
  // if (permNameList.includes(to.path)) {
  //   if (!isAdminRolePermission()) {
  //     KMessage.error('没有权限进入该页面!')
  //     next('/store')
  //     return
  //   }
  // }
  if (from.meta?.breadcrumb !== '') {
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
  next()
})
