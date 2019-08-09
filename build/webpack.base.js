/* eslint camelcase: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-dynamic-require: 0 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy
const HappyPack = require('happypack');
const os = require('os'); // node 提供的系统操作模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const utils = require('./webpack.util.js');
const { staticDir, output, reactDll } = require('./webpack.config');

// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { NODE_ENV, BABEL_ENV, npm_package_version } = process.env;

const isProd = NODE_ENV === 'production';

const themeVariables = lessToJs(
  fs.readFileSync(utils.resolvePath('./src/config/ant-theme-vars.less'), 'utf8'),
);

const entryList = utils.getEntryMap(utils.getAllFileList('./src/pages'));

// svg config file
const svgoConfig = require('../svgo-config');
const svgoColorfulConfig = require('../svgo-colorful-config');

// ==============entry================
const entry = entryList.reduce((accumulator, { name, currPath }) => {
  accumulator[name] = ['@babel/polyfill', utils.resolvePath(currPath)];
  return accumulator;
}, {});

// ==============plugin================
const htmlPluginList = entryList.reduce((accumulator, { name }) => {
  accumulator.push(
    new HtmlWebpackPlugin({
      template: utils.resolvePath(`${staticDir}/${name}.html`),
      filename: `${name}.html`,
      inject: 'body',
      chunks: ['commons', 'vendor', name],
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
  );
  return accumulator;
}, []);

const plugins = [
  new HappyPack({
    // 基础参数设置
    id: 'babel', // 上面loader?后面指定的id
    loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new webpack.DllReferencePlugin({
    manifest: require(`../${reactDll.output}/${reactDll.name}${reactDll.suffix}`),
  }),
  new CopyWebpackPlugin([
    {
      from: utils.resolvePath(staticDir),
      to: '',
      force: true,
      ignore: ['*.html'],
    },
    {
      from: utils.resolvePath(reactDll.output),
      to: '',
      force: true,
    },
  ]),
  ...htmlPluginList,
  new HtmlIncludeAssetsPlugin({
    assets: ['react.dll.js'], //  添加的资源相对html的路径
    append: false, // false 在其他资源的之前添加 true 在其他资源之后添加
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      BABEL_ENV: JSON.stringify(BABEL_ENV),
      APP_VERSION: JSON.stringify(npm_package_version),
    },
  }),
];

// ==============modules================
const modules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: utils.resolvePath('src'),
      use: 'happypack/loader?id=babel',
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
            plugins: [autoprefixer],
          },
        },
      ],
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.svg$/,
      include: [utils.resolvePath('src/assets/svg/colorful')],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        },
        {
          loader: 'svgo-loader',
          options: svgoColorfulConfig,
        },
      ],
    },
    {
      test: /\.svg$/,
      include: [utils.resolvePath('src/assets/svg/single')],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        },
        {
          loader: 'svgo-loader',
          options: svgoConfig,
        },
      ],
    },
    {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer],
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
};

module.exports = {
  entry,
  output: {
    path: utils.resolvePath(output.entryPath),
    publicPath: output.publicPath,
    filename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash:8].js' : '[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
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
      library: utils.resolvePath('src/library'),
      mock: utils.resolvePath('src/mock'),
      pages: utils.resolvePath('src/pages'),
      reduxs: utils.resolvePath('src/reduxs'),
      services: utils.resolvePath('src/services'),
      theme: utils.resolvePath('src/theme'),
      utils: utils.resolvePath('src/utils'),
    },
  },
  plugins,
  module: modules,
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
