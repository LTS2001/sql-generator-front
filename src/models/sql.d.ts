/**
 * 表 Schema 类型
 */
interface TableSchema {
  dbName?: string
  tableName: string
  tableComment?: string
  mockNum: number
  fieldList: Field[]
}

/**
 * 列类型
 */
interface Field {
  fieldName: string
  fieldType: string
  defaultValue?: string
  notNull?: boolean
  comment?: string
  primaryKey?: boolean
  autoIncrement?: boolean
  mockType: string
  mockParams?: string
  onUpdate?: string
}

/**
 * 生成返回封装类型
 */
interface GenerateVO {
  tableSchema: TableSchema
  createSql: string
  insertSql: string
  dataJson: string
  // Record后面的泛型就是对象键和值的类型，其作用就是定义一个键为string值为any的对象
  dataList: Record<string, any>[]
  javaEntityCode: string
  javaObjectCode: string
  typescriptTypeCode: string
}

/**
 * 只能生成请求
 */
interface GenerateByAutoRequest {
  content: string
}

/**
 * 根据 SQL 生成请求
 */
interface GenerateBySqlRequest {
  sql: string
}