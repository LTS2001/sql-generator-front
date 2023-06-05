import React from 'react'
import { history } from '@umijs/max'
import { useModel } from '@umijs/max'
import { stringify } from 'querystring'
// import classNames from 'classnames'

import { Link } from '@@/exports'
import { LoginOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, message } from 'antd'

import { userLogout } from '@/services/userService'

import styles from './index.less'
/**
 * 头像下拉菜单
 * @constructor
 */
const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const loginUser = initialState?.loginUser;

  const onMenuClick = async (event: {
    key: React.Key
    keyPath: React.Key[]
  }) => {
    const { key } = event

    if (key === 'logout') {
      try {
        await userLogout()
        message.success('已退出登录')
      } catch (error) {
        message.error('退出失败')
      }
      await setInitialState({ ...initialState, loginUser: undefined })
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href
        })
      })
      return
    }
  };

  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = loginUser ? (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key='current' disabled>
        {loginUser.userName ?? '无名'}
      </Menu.Item>
      <Menu.Item key='logout'>
        <span style={{ color: 'red' }}>
          <LoginOutlined />
        </span>
      </Menu.Item>
    </Menu>
  ) : (<></>)

  return loginUser ? (
    <Dropdown
      // overlayClassName={classNames(styles.container)}
      overlay={menuHeaderDropdown}
    >
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar>{loginUser.userName?.[0] ?? '无'}</Avatar>
      </div>
    </Dropdown>
  ) : (
    <>
      <Link to='/user/login'>
        <Button type='primary' ghost style={{ marginRight: 16 }}>
          登录
        </Button>
      </Link></>
  )
};

export default AvatarDropdown
