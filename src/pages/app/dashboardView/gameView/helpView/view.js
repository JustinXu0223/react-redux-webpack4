/*
 * @component index.js
 * @description 游戏帮助
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';

// constants
// import routerId from 'constants/routerId';

class GameHelp extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <p>游戏帮助游戏帮助</p>
      </div>
    );
  }
}

GameHelp.defaultProps = {};

GameHelp.propTypes = {
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

export default GameHelp;
