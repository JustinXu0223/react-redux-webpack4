/*
 * @component header.js
 * @description 头部组件
 * @time 2019/8/9
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Layout, Dropdown, Menu } from 'antd';

const HeaderView = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px 0 16px !important;
  background-color: #fff;
`;

const UserNameView = styled.div`
  padding-right: 5px;
`;

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
      <HeaderView>
        <Icon
          style={{ fontSize: 18, color: '#fff' }}
          type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onToggle}
        />
        <div>
          <Dropdown overlay={menu}>
            <span style={{ color: '#1890ff' }}>
              <UserNameView>{userInfo.name}</UserNameView>
              <Icon type='down' />
            </span>
          </Dropdown>
        </div>
      </HeaderView>
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
