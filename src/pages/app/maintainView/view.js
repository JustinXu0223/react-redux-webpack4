/*
 * @component index.js
 * @description 维护页
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class Maintain extends React.Component {
  state = {};

  render() {
    return (
      <div>
        维护维护维护维护维护
        <Button type='primary' onClick={() => this.props.history.goBack()}>
          返回
        </Button>
      </div>
    );
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
