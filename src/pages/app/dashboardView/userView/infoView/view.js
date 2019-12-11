/*
 * @component index.js
 * @description 用户信息
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';

// constants
// import routerId from 'constants/routerId';

class UserInfo extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <p>用户信息用户信息</p>
      </div>
    );
  }
}

UserInfo.defaultProps = {};

UserInfo.propTypes = {
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

export default UserInfo;
