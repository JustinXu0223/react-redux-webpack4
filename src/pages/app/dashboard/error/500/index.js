/**
 * @component index.js
 * @description 500路由导航
 * @time 2019/3/9
 * @author JUSTIN
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
  path: routerId.serverError,
  name: '500',
  icon: 'pie-chart',
};

export default <Route exact path={navigation.path} key={navigation.path} component={View} />;
