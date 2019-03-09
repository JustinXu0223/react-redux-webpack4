/**
 * @component router.js
 * @description 顶层路由配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import routers from 'constants/routers';

import LoadingComponent from './components/Loading';

const AsyncApp = Loadable({
  loader: () => import('./pages/index'),
  loading: LoadingComponent,
});
const AsyncNotFound = Loadable({
  loader: () => import('./pages/NotFound/index'),
  loading: LoadingComponent,
});

const Router = ({ history = {} }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routers.notFound} component={AsyncNotFound} />
      <Route path={routers.app} component={AsyncApp} />
    </Switch>
  </ConnectedRouter>
);

Router.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.any,
    }),
  }).isRequired,
};

export default Router;
