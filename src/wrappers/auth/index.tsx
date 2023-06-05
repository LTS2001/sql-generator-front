import { Navigate, Outlet } from "@/.umi/exports"
import { useAccess } from "@/.umi/plugin-access"
import { message } from "antd"

/**
 * 权限校验拦截器
 */
export default () => {
  const { canUser } = useAccess()
  if (canUser) return <Outlet />
  else {
    message.warning('请先登录')
    return <Navigate to='/user/login' replace />
  }
}