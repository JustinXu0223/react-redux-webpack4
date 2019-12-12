/**
 * @component routerId.js
 * @description 路由配置
 * @time 2018/7/24
 * @author JUSTIN
 */

export const layoutEnum = {
  root: '', // 一层路由
  auth: '/auth', // 一层路由
  dashboard: '/dashboard', // 二层路由，
  user: '/user', // 三层路由，
};

export const layoutTree = [
  {
    name: layoutEnum.root,
    children: [
      {
        name: layoutEnum.auth,
      },
      {
        name: layoutEnum.dashboard,
        children: [
          {
            name: layoutEnum.user,
          },
        ],
      },
    ],
  },
];

export const layoutList = Object.values(layoutEnum);

export default {
  // auth stack
  auth: `${layoutEnum.auth}`,
  signIn: `${layoutEnum.auth}/signIn`,
  signUp: `${layoutEnum.auth}/signUp`,
  // top stack
  maintain: '/maintain',
  loading: '/loading',
  notFound: '/404',
  // dashboard stack
  dashboard: layoutEnum.dashboard,
  home: `${layoutEnum.dashboard}/home`,
  // dashboard stack -> demo stack
  demo: `${layoutEnum.dashboard}/demo`,
  counter: `${layoutEnum.dashboard}/counter`,
  sticky: `${layoutEnum.dashboard}/sticky`,
  // dashboard stack -> user stack
  user: `${layoutEnum.dashboard}${layoutEnum.user}`,
  userInfo: `${layoutEnum.dashboard}${layoutEnum.user}/info`,
  userBankCard: `${layoutEnum.dashboard}${layoutEnum.user}/bankCard`,
  // dashboard stack -> error stack
  dashError: `${layoutEnum.dashboard}/error`,
  dashNotFound: `${layoutEnum.dashboard}/404`,
  dashServerError: `${layoutEnum.dashboard}/500`,
};
