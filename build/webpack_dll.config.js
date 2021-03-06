/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const utils = require('./webpack.util');
const { reactDll } = require('./webpack.config');

module.exports = {
  entry: {
    [reactDll.name]: [
      'react',
      'react-dom',
      'react-helmet',
      // 'react-loadable',
      // 'react-router-dom',
      // 'history',
      // 'react-redux',
      // 'connected-react-router',
      // 'redux',
      // 'redux-saga',
      // 'reselect',
      // 'immutable',
    ],
  },
  output: {
    filename: '[name].dll.js', // 动态链接库输出的文件名称
    path: utils.resolvePath(reactDll.output), // 动态链接库输出路径
    libraryTarget: 'var', // 链接库(react.dll.js)输出方式 默认'var'形式赋给变量 b
    library: '_dll_[name]_[hash]', // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
  },
  plugins: [
    new CleanWebpackPlugin([reactDll.output], {
      root: utils.resolvePath('/'),
      verbose: true,
    }),
    new webpack.DllPlugin({
      // path 指定manifest文件的输出路径
      path: utils.resolvePath(reactDll.output, `[name]${reactDll.suffix}`),
      name: '_dll_[name]_[hash]', // 和library 一致，输出的manifest.json中的name值
    }),
  ],
};
