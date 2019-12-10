/**
 * @component routerId.js
 * @description 路由配置
 * @time 2018/7/24
 * @author JUSTIN XU
 */

export default {
  // auth stack
  signIn: '/signIn',
  // app layout
  dashboard: '/dashboard',
  home: '/dashboard/home',
  // app layout -> demo stack
  demo: '/dashboard/demo',
  counter: '/dashboard/counter',
  sticky: '/dashboard/sticky',
  // app layout -> error stack
  error: '/dashboard/error',
  notFound: '/dashboard/404',
  serverError: '/dashboard/500',
};
