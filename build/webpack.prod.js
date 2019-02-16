/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base.js');
const packjson = require('../package');
const utils = require('./webpack.util.js');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'cheap-source-map',
  plugins: [
    new CleanWebpackPlugin([process.env.OUTPUT_DIR], {
      root: utils.resolvePath('/'),
      verbose: true,
    }),
    new webpack.BannerPlugin(`${packjson.name}: version(${packjson.version})`),
  ],
});
