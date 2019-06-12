/**
 * @component index.js
 * @description 首页
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'antd';

// components
import { ContainerView } from 'components/Layout/Styles';

class Home extends React.Component {
  render() {
    return (
      <ContainerView>
        HomeHome
        <Button type="primary">按钮</Button>
      </ContainerView>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
