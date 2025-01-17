// 全局运行时配置
import { getLoginUser } from "@/services/userService"
// @ts-ignore
import { RunTimeLayoutConfig } from '@@/plugin-layout/types'
import type { RequestConfig, AxiosRequestConfig } from '@umijs/max'

import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from "@/components/GlobalFooter"

import './global.less'
import logo from './favicon.ico'

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialState> {
  const defaultState: InitialState = {
    loginUser: undefined
  }
  // 获取当前登录用户
  try {
    const res = await getLoginUser()
    defaultState.loginUser = res.data
  } catch (error) { }
  return defaultState
}

/**
 * 全局布局配置
 */
export const layout: RunTimeLayoutConfig = () => {
  return {
    title: 'SQL生成器',
    logo,
    menu: {
      locale: true,
    },
    fixedHeader: false,
    layout: 'top',
    rightContentRender: () => <RightContent />,
    footerRender: () => <GlobalFooter />,
  }
}

const isDev = process.env.NODE_ENV === 'development'

/**
 * 全局请求配置
 * https://umijs.org/docs/max/request
 */
export const request: RequestConfig = {
  baseURL: isDev ? 'http://127.0.0.1:7001' : '你的线上地址',
  timeout: 5000,
  withCredentials: true,
  // axios 的其他配置选项
  errorConfig: {
    errorHandler() { },
    errorThrower() { }
  },
  // axios 的 请求/响应 拦截器
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      if (config && config.headers) {
        config.headers.authorization = window.localStorage.getItem('SQLGenerator') ?? '';
      }
      return config
    }
  ],
  responseInterceptors: [
    (response) => {
      // 不再需要异步处理读取返回体内容，可直接在 data 中读出，部分字段可在 config 中找到
      const data: any = response.data
      const path = response.request.responseURL
      if (!data) {
        throw new Error('服务器异常')
      }
      // 下载接口没有 code
      if (/\/download\/data\/excel/.test(path)) {
        return response
      }
      const code = data.code ?? 50000
      
      // // 未登录，且不为获取用户登录信息接口
      // if (
      //   code === 40100 &&
      //   !/user\/get\/login/.test(path) &&
      //   !location.pathname.includes('/user/login')
      // ) {
      //   // 跳转至登录页
      //   window.location.href = `/user/login?redirect=${window.location.href}`
      //   throw new Error('请先登录')
      // }

      if (code !== 0) {
        console.error(`request error, path = ${path}`, data)
        throw new Error(data.message ?? '服务器错误')
      }

      // 设置 token 到 localStorage
      if (/\/user\/login/.test(path)) {
        console.log('我设置了token');
        window.localStorage.setItem('SQLGenerator', response.headers.token)
      }
      return response
    }
  ]
}
