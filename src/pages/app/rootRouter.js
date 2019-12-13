/**
 * @component router.js
 * @description 顶层路由配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

// constants
import routerId, { layoutEnum } from 'constants/routerId';

// reduxs
import { connect } from 'react-redux';
import { INIT_LANGUAGE } from 'pages/app/redux/globalAction';

// utils
import { SubscriberContext, getFormatRouterTree } from 'utils/scanner';

// components
import HocBasic from 'pages/app/components/hocBasic';

export const layoutType = layoutEnum.root;

// 路由规则map
const routerTree = getFormatRouterTree();
// 顶层路由规则
const rootRouterMap = routerTree[layoutType];

// 初次加载页面的顶层无路由和权限页面逻辑
const rootList = ['/', routerId.loading];

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
    // TODO 权限验证 增加loading页面，鉴权进行路由跳转
    if (rootList.includes(this.props.history.location.pathname)) {
      this.props.history.replace(routerId.dashboard);
    }
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
        <SubscriberContext.Provider value={routerTree}>
          <div className={`app-container-view theme-${name}-view`}>
            <Switch>{rootRouterMap}</Switch>
          </div>
        </SubscriberContext.Provider>
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
