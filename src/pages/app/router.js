/**
 * @component router.js
 * @description 顶层路由配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Loadable from '@loadable/component';
import { ThemeProvider } from 'styled-components';

// constants
import routerId from 'constants/routerId';

// utils
import { delay } from 'utils/base';

// reduxs
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { INIT_LANGUAGE } from 'reduxs/actions/global';

// components
import Loading from 'components/loading';

const AsyncApp = Loadable(() => import('./index'), {
  fallback: <Loading />,
});
const AsyncNotFound = Loadable(() => import('./notFound'), {
  fallback: <Loading />,
});

@connect(
  state => ({
    language: state.language,
    styles: state.styles,
  }),
  dispatch => ({
    initLanguageReq: () => dispatch({ type: INIT_LANGUAGE }),
  }),
)
class Router extends React.Component {
  async componentDidMount() {
    await delay(2000);
    this.props.initLanguageReq('zh');
  }
  render() {
    const {
      props: { history, styles },
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
  initLanguageReq: PropTypes.func.isRequired,
};

export default Router;
