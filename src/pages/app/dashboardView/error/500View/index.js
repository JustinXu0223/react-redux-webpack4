/**
 * @component index.js
 * @description 500路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "500" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.serverError,
  name: '500',
  icon: 'pie-chart',
  exact: true,
};
