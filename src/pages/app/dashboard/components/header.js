/*
 * @component header.js
 * @description 头部组件
 * @time 2019/8/9
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Dropdown, Menu } from 'antd';

// styles
import styles from './header.less';

class Header extends React.PureComponent {
  render() {
    const {
      props: { isCollapsed, onToggle, userInfo, onSignOut },
    } = this;
    const menu = (
      <Menu>
        <Menu.Item key='0'>
          <div onClick={onSignOut}>退出</div>
        </Menu.Item>
        {/* <Menu.Divider /> */}
      </Menu>
    );
    return (
      <Layout.Header className={styles.headerView}>
        <Icon
          style={{ fontSize: 18 }}
          type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onToggle}
        />
        <div>
          <Dropdown overlay={menu}>
            <span style={{ color: '#1890ff' }}>
              <span className={styles.userNameView}>{userInfo.name}</span>
              <Icon type='down' />
            </span>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

Header.defaultProps = {
  userInfo: {
    name: '无名',
  },
  onSignOut: () => null,
};

Header.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.any),
  onSignOut: PropTypes.func,
};

export default Header;
