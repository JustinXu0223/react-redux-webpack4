/**
 * @component view.js
 * @description 首页
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';

// components
import { Button } from 'antd';
import SvgIcon from 'components/svgIcon/index';
import HocBasic from 'components/hocBasic';

import { getUser } from 'services/demo';

// styles
import styles from './styles.less';

class Home extends React.Component {
  async componentDidMount() {
    const data = await getUser();
    alert(JSON.stringify(data));
  }

  onToggleTheme = theme => {
    this.props.changeThemeReq(theme);
  };

  render() {
    const {
      props: {
        styles: { name },
      },
    } = this;
    return (
      <div className={styles.homePage}>
        HomeHome
        <div>主题名称: {name}</div>
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

Home.propTypes = {};

export default HocBasic(Home);
