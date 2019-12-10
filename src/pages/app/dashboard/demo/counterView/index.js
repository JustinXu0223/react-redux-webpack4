/**
 * @component index.js
 * @description home路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

const View = loadable(() => import('./view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.counter,
  name: 'Counter',
  icon: 'area-chart',
};

export default <Route exact path={navigation.path} key={navigation.path} component={View} />;
