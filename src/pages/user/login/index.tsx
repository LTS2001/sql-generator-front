// @ts-ignore
import { Link, useModel, useSearchParams } from "@umijs/max"
import { message } from "antd"
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { userLogin } from '@/services/userService'

/**
 * 用户登录界面
 */
export default () => {
  const [searchParams] = useSearchParams()

  const { initialState, setInitialState } = useModel('@@initialState')

  const doUserLogin = async (fields: UserType.UserLoginRequest) => {
    const hide = message.loading('登陆中')
    try {
      const res = await userLogin({ ...fields })
      message.success('登陆成功')
      setInitialState({
        ...initialState,
        loginUser: res.data
      })
      // 重定向到之前的页面
      window.location.href = searchParams.get('redirect') ?? '/'
    } catch (error: any) {
      message.error(error.message)
    } finally {
      hide()
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
        backgroundSize: '100% 100%',
        padding: '2rem 0 1.5rem'
      }}
    >
      <LoginForm<UserType.UserLoginRequest>
        logo='https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'
        title='SQLGenerator'
        subTitle='快速生成代码和数据'
        onFinish={async (formData) => {
          await doUserLogin(formData)
        }}
      >
        <>
          <ProFormText
            name='userAccount'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />
            }}
            placeholder={'请输入账号'}
            rules={[{ required: true, message: '请输入账号！' }]}
          />
          <ProFormText.Password
            name='userPassword'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className='prefixIcon' />
            }}
            placeholder='请输入密码'
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </>
        <div
          style={{ marginBottom: 24 }}
        >
          <Link to='/user/register'>新用户注册</Link>
          <Link to='/' style={{ float: 'right' }}>返回主页</Link>
        </div>
      </LoginForm>
    </div>
  )

}