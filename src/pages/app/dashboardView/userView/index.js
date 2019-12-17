/**
 * @component index.js
 * @description 用户信息路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'pages/app/constants/routerId';

// components
import Loading from 'components/loading';

// import { navigation as userInfoRouter } from './infoView';
// import { navigation as bankCardRouter } from './bankCardView';

export const view = loadable(() => import(/* webpackChunkName: "userRouter" */ './userRouter'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.user,
  name: '用户信息',
  icon: 'home',
  exact: false,
  // children: [userInfoRouter, bankCardRouter],
};
