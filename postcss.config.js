module.exports = ctx => ({
  // parser: 'sugarss', //ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    // postcss-cssnext已经过时，官网建议切换至postcss-preset-env https://github.com/MoOx/postcss-cssnext
    // 关于browsers选项移动至.browserslistrc https://github.com/csstools/postcss-preset-env#browsers
    // autoprefixer已经包含在postcss-preset-env
    'postcss-preset-env': {},
  },
});
