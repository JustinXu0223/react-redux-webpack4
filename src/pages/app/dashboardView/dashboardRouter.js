/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Layout, Modal, BackTop } from 'antd';
import styled from 'styled-components';

// constants
import routerId, { layoutType } from 'constants/routerId';

// utils
import history from 'utils/history';
import { SubscriberContext } from 'utils/scanner';

// components
import Sider from './components/sider';
import Header from './components/header';

// pages
import { navigation as homeRouter } from './homeView';
import { navigation as channelRouter } from './demo';
import { navigation as userRouter } from './userView';
import { navigation as errorRouter } from './error';

// 路由导航
const navList = [homeRouter, channelRouter, userRouter, errorRouter];

const backTopProps = {
  target: () => document.querySelector('.layout-scroll-view'),
  visibilityHeight: 100,
};

const contentStyle = {
  margin: '24px 16px',
  padding: 24,
  background: '#fff',
  minHeight: 280,
};

const SectionView = styled(Layout.Content)`
  overflow-y: scroll;
`;

export const name = layoutType.dashboard;

class Dashboard extends React.Component {
  // 将context绑定在contextType上面
  static contextType = SubscriberContext;

  state = {
    isCollapsed: false,
  };

  componentDidMount() {
    this.unlisten = history.listen(() => {
      Modal.destroyAll();
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  onToggle = () => {
    this.setState(state => ({
      ...state,
      isCollapsed: !state.isCollapsed,
    }));
  };

  render() {
    const {
      state: { isCollapsed },
    } = this;
    const siderProps = {
      isCollapsed,
      list: navList,
    };
    const headerProps = {
      isCollapsed,
      onToggle: this.onToggle,
      onSignOut: () => this.props.history.push(routerId.signIn),
    };
    return (
      <Layout>
        <Sider {...siderProps} />
        <Layout>
          <Header {...headerProps} />
          <SectionView className='layout-scroll-view' style={contentStyle}>
            <Switch>{this.context[name]}</Switch>
            <BackTop {...backTopProps} />
          </SectionView>
        </Layout>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
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

export default Dashboard;
