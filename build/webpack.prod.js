/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.base.js');


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production'),
        'REACT_APP_BASE_API': JSON.stringify(process.env.REACT_APP_BASE_API),
      },
    }),
  ],
});
