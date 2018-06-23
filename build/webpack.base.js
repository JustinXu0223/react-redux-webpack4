/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

function isProd() {
  return process.env.NODE_ENV === 'production';
}

const themeVariables = lessToJs(fs.readFileSync(resolve('./config/ant-theme-vars.less'), 'utf8'));

module.exports = {
  entry: ['babel-polyfill', resolve('./src/index.jsx')],
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: isProd ? '[name].[hash:8].js' : '[name].js',
    chunkFilename: isProd ? 'chunks/[name].[hash:8].chunk.js' : 'chunks/[name].chunk.js',
  },
  resolve: {
    modules: [resolve('node_modules')],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|jpeg|gif|svg|mp4|webm|ico)$/,
        include: /src\/assets/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: isProd ? '[name].[hash:8].[ext]' : '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|jpeg|gif|svg|mp4|webm|ico)$/,
        exclude: /src\/assets/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'BTCC Mining Pool',
      template: path.resolve(resolve('public'), 'index.html'),
      filename: 'index.html',
      // 要把script插入到标签里
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
