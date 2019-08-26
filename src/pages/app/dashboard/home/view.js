/**
 * @component index.js
 * @description 首页
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { compose } from 'redux';

// components
import { ContainerView } from 'components/layout/styles';
import SvgIcon from 'components/svgIcon';
import HocBasic from 'components/hocBasic';

// reduxs
// import { connect } from 'react-redux';
// import { CHANGE_THEME_NAME } from 'reduxs/actions/global';

const ButtonView = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

class Home extends React.Component {
  onToggleTheme = theme => {
    this.props.changeThemeReq(theme);
  };

  render() {
    const {
      props: {
        styles: { name, theme },
      },
    } = this;
    return (
      <ContainerView>
        HomeHome
        <div>主题名称: {name}</div>
        <div>主题颜色: {theme.primaryColor}</div>
        <ButtonView>
          <Button
            type='primary'
            onClick={() => this.onToggleTheme(name === 'dark' ? 'light' : 'dark')}
          >
            按钮
          </Button>
          <SvgIcon iconClass='delete' fill={name === 'dark' ? 'red' : 'blue'} />
        </ButtonView>
      </ContainerView>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};

export default compose(HocBasic)(Home);
