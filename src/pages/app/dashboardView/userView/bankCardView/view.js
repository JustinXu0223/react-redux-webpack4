/*
 * @component index.js
 * @description 用户银行卡
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';

// constants
// import routerId from 'constants/routerId';

class BankCard extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <p>用户银行卡用户银行卡</p>
      </div>
    );
  }
}

BankCard.defaultProps = {};

BankCard.propTypes = {
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

export default BankCard;
