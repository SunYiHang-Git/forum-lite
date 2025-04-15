import { useUser } from '@/store/modules/user'

/** 校验是否有管理权限,跳转相关页面 */
export const isAdminRolePermission = () => {
  const { userInfo } = useUser()
  // 管理员和云开发可以进去管理页面
  if (userInfo.role === 1 || userInfo.role === 2) return true
  return false
}
