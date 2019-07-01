/* eslint camelcase: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const base = require('./webpack.base.js');
const utils = require('./webpack.util.js');
const {
  port,
  output,
} = require('./webpack.config.js');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
];

const {
  BUNDLE,
} = process.env;

if (BUNDLE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
            },
          },
        ],
      },
    ],
  },
  plugins,
  devServer: {
    contentBase: utils.resolvePath(output.entryPath),
    publicPath: '/',
    clientLogLevel: 'error',
    hot: true,
    historyApiFallback: true,
    inline: true, // 实时刷新
    // https: true,
    host: '0.0.0.0',
    port,
    proxy: {
      '/api/**': {
        target: 'https://xxx.com/api/',
        changeOrigin: true,
        secure: false,
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'X-Custom-Header': 'yes',
      'Access-Control-Allow-Origin': '*',
    },
    overlay: {
      warnings: false,
      errors: true,
    },
    // 取消框架域名检测
    disableHostCheck: true,
  },
});
