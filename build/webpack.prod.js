/* eslint camelcase: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const base = require('./webpack.base.js');
const utils = require('./webpack.util.js');
const { output } = require('./webpack.config.js');

const { npm_package_name, npm_package_version } = process.env;

module.exports = merge(base, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin([output.path], {
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
        warnings: false, // 删除无用代码时不输出警告
        compress: {
          // 压缩
          drop_console: true, // 删除console语句
          collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
      },
    }),
    new webpack.BannerPlugin(`${npm_package_name}: version(${npm_package_version})`),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100', // 图片质量
      },
    }),
    new CompressionPlugin({
      // gzip 压缩
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css|html|svg)$'), // 压缩
      compressionOptions: { level: 9 },
      threshold: 8192,
      minRatio: 0.8,
    }),
    new FileManagerPlugin({
      onEnd: {
        archive: [
          {
            source: utils.resolvePath(output.entryPath),
            destination: utils.resolvePath(`${output.entryPath}.zip`),
          },
        ],
      },
    }),
  ],
});
