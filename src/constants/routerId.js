/**
 * @component routerId.js
 * @description 路由配置
 * @time 2018/7/24
 * @author JUSTIN
 */

export const layoutType = {
  root: '', // 一层路由
  dashboard: '/dashboard', // 二层路由，
  user: '/user', // 三层路由，
};

export default {
  // auth stack
  signIn: '/signIn',
  signUp: '/signUp',
  // dashboard layout
  dashboard: layoutType.dashboard,
  home: `${layoutType.dashboard}/home`,
  // dashboard layout -> demo stack
  demo: `${layoutType.dashboard}/demo`,
  counter: `${layoutType.dashboard}/counter`,
  sticky: `${layoutType.dashboard}/sticky`,
  // dashboard layout -> user stack
  user: `${layoutType.dashboard}${layoutType.user}`,
  userInfo: `${layoutType.dashboard}${layoutType.user}/info`,
  userBankCard: `${layoutType.dashboard}${layoutType.user}/bankCard`,
  // dashboard layout -> error stack
  error: `${layoutType.dashboard}/error`,
  notFound: `${layoutType.dashboard}/404`,
  serverError: `${layoutType.dashboard}/500`,
};
