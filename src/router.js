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
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import routerId from 'constants/routerId';

// action
import {
  INIT_LANGUAGE,
  CHANGE_LANGUAGE_NAME,
  CHANGE_THEME_NAME,
} from 'reduxs/actions/global';

// utils
import { delay } from 'utils/base';

// components
import LoadingComponent from './components/Loading';

const AsyncApp = Loadable({
  loader: () => import('./pages'),
  loading: LoadingComponent,
});
const AsyncNotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: LoadingComponent,
});

@connect(
  state => ({
    language: state.language,
    styles: state.styles,
  }),
  (dispatch) => ({
    initLanguageReq: () => dispatch({ type: INIT_LANGUAGE }),
    changeLanguageReq: (payload) => dispatch({ type: CHANGE_LANGUAGE_NAME, payload }),
    changeThemeReq: (payload) => dispatch({ type: CHANGE_THEME_NAME, payload }),
  }),
)
class Router extends React.Component {
  async componentDidMount() {
    await delay(2000);
    this.props.changeLanguageReq('zh');
    this.props.changeThemeReq('dark');
  }
  render() {
    const {
      props: {
        history,
        styles,
      },
    } = this;
    return (
      <ConnectedRouter history={history}>
        <ThemeProvider theme={styles.theme}>
          <Switch>
            <Route exact path={routerId.notFound} component={AsyncNotFound} />
            <Route path={routerId.app} component={AsyncApp} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    );
  }
}

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
  styles: PropTypes.shape({
    name: PropTypes.string,
    theme: PropTypes.object,
  }).isRequired,
  changeThemeReq: PropTypes.func.isRequired,
  changeLanguageReq: PropTypes.func.isRequired,
};

export default Router;
