// umi非运行时配置文件（运行时配置一般定义于app.ts）
import { defineConfig } from '@umijs/max'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
import routes from './src/configs/routes'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
  // https://v3.umijs.org/zh-CN/guide/boost-compile-speed#monaco-editor-%E7%BC%96%E8%BE%91%E5%99%A8%E6%89%93%E5%8C%85
  chainWebpack: (memo) => {
    // 更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      // 按需配置
      { languages: ['sql', 'json', 'java', 'typescript'] }
    ]);
    return memo;
  }
});
