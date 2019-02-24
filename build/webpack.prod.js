const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const base = require('./webpack.base.js');
const utils = require('./webpack.util.js');

const {
  npm_package_name,
  npm_package_version = '',
} = process.env;

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin([process.env.OUTPUT_DIR], {
      root: utils.resolvePath('/'),
      verbose: true,
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false, // 保留注释
        },
        compress: { // 压缩
          warnings: false, // 删除无用代码时不输出警告
          drop_console: true, // 删除console语句
          collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
      },
    }),
    new webpack.BannerPlugin(`${npm_package_name}: version(${npm_package_version})`),
  ],
});
