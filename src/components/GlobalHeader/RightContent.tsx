import React from 'react'
// @ts-ignore
import type { Settings as ProSettings } from '@ant-design/pro-layout'
import AvatarDropdown from './AvatarDropdown'

import styles from './index.less'

// Partial将类型中所有选项变为可选
type GlobalHeaderRightProps = Partial<ProSettings>

/**
 * 全局菜单右侧
 * @constructor
 */
const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = () => {
  return (
    <div className={styles.right}>
      <AvatarDropdown />
    </div>
  )
}

export default GlobalHeaderRight