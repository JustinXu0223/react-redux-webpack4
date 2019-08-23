/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout, Modal, BackTop } from 'antd';

// utils
import history from 'utils/history';

// components
import Sider from './components/sider';
import Header from './components/header';

// pages
import Home, { navigation as homeRouter } from './home';
import Demo, { navigation as channelRouter } from './demo';
import Error, { navigation as errorRouter } from './error';

// 路由配置
const routerList = [
  Home, // 必须放在最前面
  Demo,
  ...Error, // 必须放在最后
];

// 路由导航
const navList = [homeRouter, channelRouter, errorRouter];

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

class Dashboard extends React.Component {
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
    };
    return (
      <Layout>
        <Sider {...siderProps} />
        <Layout>
          <Header {...headerProps} />
          <Layout.Content className='layout-scroll-view' style={contentStyle}>
            <Switch>{routerList}</Switch>
            <BackTop {...backTopProps} />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
