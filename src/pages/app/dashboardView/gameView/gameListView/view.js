/*
 * @component index.js
 * @description 游戏列表
 * @time 2019/8/21
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';

// constants
// import routerId from 'constants/routerId';

class GameList extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <p>游戏列表游戏列表游戏列表</p>
      </div>
    );
  }
}

GameList.defaultProps = {};

GameList.propTypes = {
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

export default GameList;
