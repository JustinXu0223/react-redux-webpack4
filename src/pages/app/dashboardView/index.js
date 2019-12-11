/**
 * @component index.js
 * @description home路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// utils
import { sortType } from 'utils/scanner';

// components
import Loading from 'components/loading';

export const view = loadable(
  () => import(/* webpackChunkName: "dashboardRouter" */ './dashboardRouter'),
  {
    fallback: <Loading />,
  },
);

export const navigation = {
  path: routerId.dashboard,
  name: '控制面板',
  icon: 'home',
  exact: false,
  sort: sortType.end, // 排序位置
};
