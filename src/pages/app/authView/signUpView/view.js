/*
 * @component index.js
 * @description 注册页
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class SignUp extends React.Component {
  state = {};

  render() {
    return (
      <div>
        SignInSignIn
        <Button type='primary' onClick={() => this.props.history.goBack()}>
          去登录
        </Button>
      </div>
    );
  }
}

SignUp.defaultProps = {};

SignUp.propTypes = {
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

export default SignUp;
