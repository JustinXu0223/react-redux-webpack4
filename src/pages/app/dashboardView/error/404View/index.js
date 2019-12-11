/**
 * @component index.js
 * @description home路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// utils
import { sortType } from 'utils/scanner';

// components
import Loading from 'components/loading';

const View = loadable(() => import(/* webpackChunkName: "404" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.notFound,
  name: '404',
  icon: 'pie-chart',
  exact: true,
  sort: sortType.end, // 排序位置
};

export default [
  <Route exact path={navigation.path} key={navigation.path} component={View} />,
  <Route key='/notFound' path='*' component={() => <Redirect to={navigation.path} />} />,
];
