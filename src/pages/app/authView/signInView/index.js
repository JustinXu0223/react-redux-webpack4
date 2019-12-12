/**
 * @component index.js
 * @description signIn路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "signIn" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.signIn,
  name: '登录',
  icon: '',
  exact: true,
  sort: 0,
};

export default [
  <Route
    exact
    path={routerId.auth}
    key={routerId.auth}
    component={() => <Redirect to={navigation.path} />}
  />,
  <Route exact path={navigation.path} key={navigation.path} component={view} />,
];
