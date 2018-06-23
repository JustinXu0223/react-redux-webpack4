/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.base.js');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve('/'),
      verbose: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production'),
        'REACT_APP_BASE_API': JSON.stringify(process.env.REACT_APP_BASE_API),
      },
    }),
  ],
});
