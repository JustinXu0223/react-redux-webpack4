/*
 * @component index.js
 * @description 登录页
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

// constants
import routerId from 'constants/routerId';

class SignIn extends React.Component {
  state = {};

  render() {
    return (
      <div>
        SignInSignIn
        <Button type='primary' onClick={() => this.props.history.push(routerId.signUp)}>
          去注册
        </Button>
      </div>
    );
  }
}

SignIn.defaultProps = {};

SignIn.propTypes = {
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

export default SignIn;
