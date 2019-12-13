const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // https://babeljs.io/docs/en/babel-polyfill#docsNav
        // babel v7弃用babel-polyfill 推荐使用core-js
        // https://stackoverflow.com/questions/52625979/confused-about-usebuiltins-option-of-babel-preset-env-using-browserslist-integ
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false, // 不启用将ES6模块语法转换为其他模块类型
        // 使用.browserslistrc配置
        // targets: {
        //   browsers: ['last 2 versions', 'safari >= 7'],
        // },
        // debug: true,
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    development: {},
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            ignoreFilenames: ['node_modules'],
          },
        ],
      ],
    },
  },
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }], // https://juejin.im/post/5bfe541bf265da6179748834#heading-5
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ['babel-plugin-styled-components', { displayName: isDev, fileName: isDev }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    // legacy 使用遗留(阶段1) 装饰器语法和行为 兼容 https://babeljs.io/docs/en/babel-plugin-proposal-decorators
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // 对象属性编译不使用Object.defineProperty https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
  ],
};
