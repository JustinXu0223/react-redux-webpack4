/**
 * @component index.js
 * @description 加载路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// utils

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "loading" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.loading,
  name: '加载页',
  icon: 'home',
  exact: true,
  sort: 1,
};
