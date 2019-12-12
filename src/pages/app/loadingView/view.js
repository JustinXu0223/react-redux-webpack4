/*
 * @component index.js
 * @description 加载页
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
// import { Icon } from 'antd';

class Maintain extends React.Component {
  state = {};

  render() {
    return <div>加载中</div>;
  }
}

Maintain.defaultProps = {};

Maintain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    replace: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.any,
    }),
  }).isRequired,
};

export default Maintain;
