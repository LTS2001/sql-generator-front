import React from 'react'
import { useLocation } from '@umijs/max'
import { DefaultFooter } from '@ant-design/pro-components'
import {
  BugOutlined,
  GithubOutlined,
  SketchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './index.less'

/**
 * 全局 Footer
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const { pathname } = useLocation()

  return (
    <DefaultFooter
      style={pathname === '/user/login' || pathname === '/user/register'
        ? { position: 'absolute' }
        : { position: 'relative' }}
      className='default-footer'
      copyright={`${currentYear} 屑老板`}
      links={[
        {
          key: 'master',
          title: (
            <>
              <UserOutlined /> 站长：程序员鱼皮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          ),
          href: 'https://space.bilibili.com/12890453',
          blankTarget: true,
        },
        {
          key: 'learn',
          title: (
            <>
              <SketchOutlined /> 编程学习圈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          ),
          href: 'https://yupi.icu',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码已开源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          ),
          href: 'https://github.com/liyupi/sql-father-frontend-public',
          blankTarget: true,
        },
        {
          key: 'feedback',
          title: (
            <>
              <BugOutlined /> 建议反馈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          ),
          href: 'https://support.qq.com/product/440825',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default GlobalFooter