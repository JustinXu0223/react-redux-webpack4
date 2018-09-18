/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base.js');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

const init_mode = 'production';

module.exports = merge(base, {
  mode: init_mode,
  devtool: 'cheap-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve('/'),
      verbose: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || init_mode),
        'BABEL_ENV': JSON.stringify(process.env.BABEL_ENV || init_mode),
        'REACT_APP_BASE_API': JSON.stringify(process.env.REACT_APP_BASE_API),
      },
    }),
  ],
});
