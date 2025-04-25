import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface IBreadcrumbs {
  path: string
  name: string
  label: string
  [key: string]: any
}

const USER_ROUTER_INFO_KEY = 'routerInfo'
/** 面包屑路由 */
export const useRouterInfo = defineStore(
  'routerInfo',
  () => {
    /** 路由信息 */
    const breadcrumbList = ref<IBreadcrumbs[]>([
      {
        path: '/home',
        name: 'home',
        label: '社区首页',
      },
    ])
    /** 设置路由信息 */
    function setBreadcrumbList(data: IBreadcrumbs) {
      const findIndex = breadcrumbList.value.findIndex((item) => item.path === data.path)
      if (findIndex !== -1) {
        breadcrumbList.value.splice(findIndex + 1)
        return
      }
      breadcrumbList.value.push(data)
    }
    /** 清空路由信息 */
    function clearBreadcrumbList() {
      breadcrumbList.value = [
        {
          path: '/home',
          name: 'home',
          label: '社区首页',
        },
      ]
    }
    return { breadcrumbList, setBreadcrumbList, clearBreadcrumbList }
  },
  {
    persist: {
      storage: sessionStorage,
      key: USER_ROUTER_INFO_KEY + '_my_router',
    },
  },
)
