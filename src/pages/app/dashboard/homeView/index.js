/**
 * @component index.js
 * @description home路由导航
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

const View = loadable(() => import('./view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.home,
  name: '首页',
  icon: 'home',
};

export default [
  <Route
    exact
    path={routerId.dashboard}
    key={`home: ${routerId.dashboard}`}
    component={() => <Redirect to={navigation.path} />}
  />,
  <Route exact path={navigation.path} key={navigation.path} component={View} />,
];
