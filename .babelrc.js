const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  presets: [
    [
      "env", {
      modules: false,
      targets: {
        "browsers": [
          "last 2 versions",
          "safari >= 7"
        ]
      }
    }],
    "react",
    "stage-2"
  ],
  env: {
    production: {},
    development: {
      "plugins": [
        ["react-transform", {
          transforms: [{
            transform: "react-transform-hmr",
            imports: ["react"],
            locals: ["module"]
          }]
        }]
      ]
    }
  },
  plugins: [
    ["transform-runtime"],
    ["import", {libraryName: "antd", style: true}],
    ["babel-plugin-styled-components", {"displayName": isDev, "fileName": isDev}],
  ]
};
