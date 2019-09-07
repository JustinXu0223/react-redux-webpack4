/**
 * @component index.js
 * @description 首页
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button } from 'antd';

// components
import { ContainerView } from 'components/layout/styles';
import SvgIcon from 'components/svgIcon';
import HocBasic from 'components/hocBasic';
import { connect } from 'react-redux';

// reduxs
// import { connect } from 'react-redux';
// import { CHANGE_THEME_NAME } from 'reduxs/actions/global';

const ButtonView = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

@connect(state => ({
  language: state.language,
}))
@HocBasic
class Home extends React.Component {
  onToggleTheme = theme => {
    this.props.changeThemeReq(theme);
  };

  render() {
    const {
      props: {
        styles: { name, theme },
        language: { i18n = {} },
      },
    } = this;
    return (
      <ContainerView>
        <Helmet>
          <title>{i18n.helmet_title('Home')}</title>
        </Helmet>
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

Home.WrappedComponent.defaultProps = {};

Home.WrappedComponent.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
};

export default Home;
