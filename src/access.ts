/**
 * 1. 我们约定了 src/access.ts 为我们的权限定义文件，该文件需要默认导出一个方法，导出的方法会在项目初始化时被执行。该方法需要返回一个对象，对象的每一个值就对应定义了一条权限
 * 2. 按照初始化数据定义项目中的权限，统一管理
 * 3. 参考文档 https://next.umijs.org/docs/max/access
 * @param initialState
 */
export default (initialState: InitialState) => {
  const canUser = !!initialState.loginUser
  const canAdmin =
    initialState.loginUser && initialState.loginUser.userRole === 'admin'
  return {
    canUser,
    canAdmin
  }
}
