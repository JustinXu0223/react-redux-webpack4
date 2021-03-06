/**
 * @component index.js
 * @description signIn路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'pages/app/constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "signUp" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.signUp,
  name: '注册',
  icon: '',
  exact: true,
};
