/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy
const utils = require('./webpack.util.js');

const {
  NODE_ENV,
  BABEL_ENV,
  OUTPUT_DIR = '',
} = process.env;

const isProd = NODE_ENV === 'production';

const themeVariables = lessToJs(fs.readFileSync(utils.resolvePath('./config/ant-theme-vars.less'), 'utf8'));

module.exports = {
  entry: ['@babel/polyfill', utils.resolvePath('./src/index.jsx')],
  output: {
    path: utils.resolvePath(OUTPUT_DIR),
    publicPath: '/',
    filename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
  },
  resolve: {
    modules: [utils.resolvePath('node_modules')],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      assets: utils.resolvePath('src/assets'),
      components: utils.resolvePath('src/components'),
      config: utils.resolvePath('src/config'),
      constants: utils.resolvePath('src/constants'),
      i18n: utils.resolvePath('src/i18n'),
      mock: utils.resolvePath('src/mock'),
      pages: utils.resolvePath('src/pages'),
      reduxs: utils.resolvePath('src/reduxs'),
      services: utils.resolvePath('src/services'),
      styles: utils.resolvePath('src/styles'),
      utils: utils.resolvePath('src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory',
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'img/[name].[hash:8].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'media/[name].[hash:8].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'fonts/[name].[hash:8].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
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
    new CopyWebpackPlugin([{
      from: utils.resolvePath('./public'),
      to: '',
      force: true,
      ignore: ['*.html'],
    }]),
    new HtmlWebpackPlugin({
      template: utils.resolvePath('public/index.html'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        BABEL_ENV: JSON.stringify(BABEL_ENV),
      },
    }),
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
