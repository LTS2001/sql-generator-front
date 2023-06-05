/**
 * 表信息类型定义
 * declare namespace: 表示声明一个作用域
 */
declare namespace TableInfoType {
  /**
   * 实体
   */
  interface TableInfo {
    id: number
    name: string
    content: string
    reviewStatus: number
    reviewMessage?: string
    userId: number
    createTime: Date
    updateTime: Date
  }

  /**
   * 创建请求
   */
  interface TableInfoAddRequest {
    name: string
    content: string
  }

  /**
   * 更新请求
   */
  interface TableInfoUpdateRequest {
    id: number
    name?: string
    content?: string
    reviewStatus?: number
    reviewMessage?: string
  }

  /**
   * 查询请求
   */
  interface TableInfoQueryRequest extends PageRequest {
    name?: string
    content?: string
    userId?: number
    reviewStatus?: number
  }
}