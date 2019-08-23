/*
 * @component sider.js
 * @description 侧边栏组件
 * @time 2019/8/9
 * @author chat
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

// utils
import { getTreePathList } from 'utils/base';

// style
import styles from './silder.scss';

class Sider extends React.Component {
  getDefaultOpenKeys = () => {
    const {
      props: {
        list,
        history: {
          location: { pathname },
        },
      },
    } = this;
    return getTreePathList(list, pathname, {
      equalKey: 'path',
      returnKey: 'path',
    });
  };

  renderMenuItem = (list = []) =>
    list.map(item => {
      if (item.children && item.children.length) {
        return (
          <Menu.SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenuItem(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <NavLink to={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      );
    });

  render() {
    const {
      props: { isCollapsed, list },
    } = this;
    const selectKeyList = this.getDefaultOpenKeys();
    return (
      <Layout.Sider collapsed={isCollapsed}>
        <div className={styles.logoView}>Admin</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={selectKeyList}
          defaultOpenKeys={selectKeyList}
        >
          {this.renderMenuItem(list)}
        </Menu>
      </Layout.Sider>
    );
  }
}

Sider.defaultProps = {
  list: [],
};

Sider.propTypes = {
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
  isCollapsed: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.any),
};

export default withRouter(Sider);
