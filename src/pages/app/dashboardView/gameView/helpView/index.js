/**
 * @component index.js
 * @description 游戏帮助路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// constants
import routerId from 'pages/app/constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "gameHelp" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.gameHelp,
  name: '游戏帮助',
  icon: 'home',
  exact: true,
  sort: 999, // 排序位置
};

export default [
  <Route exact path={navigation.path} key={navigation.path} component={view} />,
  <Route key='/notFound' path='*' component={() => <Redirect to={routerId.dashNotFound} />} />,
];
