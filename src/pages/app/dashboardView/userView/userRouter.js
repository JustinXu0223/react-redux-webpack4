/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch } from 'react-router-dom';
import styled from 'styled-components';

// constants
import routerId, { layoutEnum } from 'constants/routerId';

// utils
import { SubscriberContext } from 'utils/scanner';

export const layoutType = layoutEnum.user;

const SectionView = styled.div`
  border: 1px solid red;
`;

const HeaderView = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderItemView = styled(NavLink)`
  border: 1px solid blue;
  padding: 5px 10px;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &.activeView {
    color: red;
    border-color: red;
  }
`;

class User extends React.Component {
  // 将context绑定在contextType上面
  static contextType = SubscriberContext;

  render() {
    return (
      <SectionView>
        <HeaderView>
          <HeaderItemView activeClassName='activeView' to={routerId.userInfo}>
            个人信息
          </HeaderItemView>
          <HeaderItemView activeClassName='activeView' to={routerId.userBankCard}>
            银行卡
          </HeaderItemView>
        </HeaderView>
        <Switch>{this.context[layoutType]}</Switch>
      </SectionView>
    );
  }
}

User.propTypes = {
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

export default User;
