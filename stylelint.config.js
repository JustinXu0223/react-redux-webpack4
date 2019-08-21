module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [],
  rules: {
    'string-quotes': 'single', // 指定字串，单引号
    'max-nesting-depth': 3, // 允许嵌套的深度为3
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  ignoreFiles: ['**/*.js'],
};
