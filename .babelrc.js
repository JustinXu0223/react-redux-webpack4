const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  ["@babel/plugin-transform-runtime"],
  ["import", {libraryName: "antd", libraryDirectory: "es", style: true}],
  ["babel-plugin-styled-components", {"displayName": isDev, "fileName": isDev}],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  "@babel/plugin-proposal-json-strings",
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-proposal-numeric-separator",
  "@babel/plugin-proposal-throw-expressions"
];

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        modules: false,
        targets: {
          "browsers": [
            "last 2 versions",
            "safari >= 7"
          ]
        }
      }
    ],
    "@babel/preset-react"
  ],
  env: {
    production: {},
    development: {}
  },
  plugins,
};
