/* eslint import/no-extraneous-dependencies: 0 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const port = 8080;

module.exports = merge(base, {
  mode: 'development',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'BABEL_ENV': JSON.stringify('development'),
        'REACT_APP_BASE_API': JSON.stringify(process.env.REACT_APP_BASE_API),
      },
    }),
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './dist',
    clientLogLevel: 'error',
    hot: true,
    historyApiFallback: true,
    inline: true, // 实时刷新
    // https: true,
    host: '0.0.0.0',
    port,
  },
  devtool: 'inline-source-map',
});
