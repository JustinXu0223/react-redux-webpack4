/**
 * @component index.js
 * @description 用户信息路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "userInfo" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.userInfo,
  name: '用户信息',
  icon: 'home',
  exact: true,
  sort: 0, // 排序位置
};

export default [
  <Route
    exact
    path={routerId.user}
    key={routerId.user}
    component={() => <Redirect to={navigation.path} />}
  />,
  <Route exact path={navigation.path} key={navigation.path} component={view} />,
];
