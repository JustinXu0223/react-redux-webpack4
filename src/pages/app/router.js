/**
 * @component router.js
 * @description 顶层路由配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// reduxs
import { connect } from 'react-redux';
import { INIT_LANGUAGE } from 'reduxs/actions/global';

// components
import Loading from 'components/loading';
import HocBasic from 'components/hocBasic';

const AsyncApp = Loadable(() => import('./dashboard'), {
  fallback: Loading,
});

@connect(
  state => ({
    language: state.language,
  }),
  dispatch => ({
    initLanguageReq: () => dispatch({ type: INIT_LANGUAGE }),
  }),
)
@HocBasic
class MyRouter extends React.Component {
  componentDidMount() {
    this.props.initLanguageReq('zh');
  }
  render() {
    const {
      props: {
        history,
        styles: { name },
      },
    } = this;
    return (
      <ConnectedRouter history={history}>
        <div className={`app-container-view theme-${name}-view`}>
          <Switch>
            {/* <Route exact path={routerId.notFound} component={AsyncNotFound} />*/}
            <Route path={routerId.app} component={AsyncApp} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

MyRouter.WrappedComponent.propTypes = {
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
  initLanguageReq: PropTypes.func.isRequired,
};

export default MyRouter;
