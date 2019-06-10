/**
 * @component index.js
 * @description 默认配置导出
 * @time 2019/6/11
 * @author JUSTIN XU
 */
export const {
  NODE_ENV,
  BABEL_ENV,
  APP_VERSION,
} = process.env;

export const isDev = NODE_ENV !== 'production';
