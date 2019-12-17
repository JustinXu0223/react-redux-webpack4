/**
 * @component index.js
 * @description 用户权限路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'pages/app/constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "authRouter" */ './authRouter'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.auth,
  name: '权限信息',
  icon: 'home',
  exact: false,
  sort: 9,
};
