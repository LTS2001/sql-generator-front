import React from 'react'
import { history } from '@umijs/max'
import { useModel } from '@umijs/max'
import { stringify } from 'querystring'

import { Link } from '@@/exports'
import { LoginOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, message } from 'antd'

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
      window.localStorage.removeItem('SQLGenerator');
      message.success('退出成功')
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
          <LoginOutlined />退出登录
        </span>
      </Menu.Item>
    </Menu>
  ) : (<></>)

  return loginUser ? (
    <Dropdown
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
