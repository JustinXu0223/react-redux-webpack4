/**
 * @component view.js
 * @description 首页
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// components
import { Button } from 'antd';
import SvgIcon from 'components/svgIcon/index';
import HocBasic from 'components/hocBasic';

// reduxs
import { connect } from 'react-redux';

import { getUser } from 'services/demo';

// styles
import styles from './styles.scss';

@connect(state => ({
  language: state.language,
}))
class Home extends React.Component {
  state = {
    user: null,
  };
  async componentDidMount() {
    this.getData();
  }

  onToggleTheme = theme => {
    this.props.changeThemeReq(theme);
  };

  getData = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  render() {
    const {
      state: { user },
      props: {
        styles: { name },
        language: { i18n = {} },
      },
    } = this;
    return (
      <div className={styles.homePage}>
        <Helmet>
          <title>{i18n.helmet_title('Home')}</title>
        </Helmet>
        HomeHome
        <div>主题名称: {name}</div>
        <div>用户信息: {user ? JSON.stringify(user) : 'loading...'}</div>
        <div className={styles.buttonView}>
          <Button
            type='primary'
            onClick={() => this.onToggleTheme(name === 'dark' ? 'light' : 'dark')}
          >
            按钮
          </Button>
          <SvgIcon iconClass='delete' fill={name === 'dark' ? 'red' : 'blue'} />
        </div>
      </div>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
};

export default HocBasic(Home);
