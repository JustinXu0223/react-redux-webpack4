/**
 * @component HocBasic.js
 * @description 基础高阶组件
 * @time 2019/6/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

// reduxs
import { connect } from 'react-redux';
import { CHANGE_THEME_NAME } from 'reduxs/actions/global';

// utils
import { getDisplayName } from 'utils/base';

function HocBasic(Component) {
  @connect(
    state => ({
      styles: state.styles,
    }),
    dispatch => ({
      changeThemeReq: payload => dispatch({ type: CHANGE_THEME_NAME, payload }),
    }),
  )
  class WrappedComponent extends React.Component {
    static displayName = `WithAuth(${getDisplayName(Component)})`;

    render() {
      return <Component {...this.props} />;
    }
  }

  hoistNonReactStatic(WrappedComponent, Component);
  return WrappedComponent;
}

HocBasic.defaultProps = {};

HocBasic.propTypes = {
  styles: PropTypes.shape({
    name: PropTypes.string,
    theme: PropTypes.object,
  }).isRequired,
  changeThemeReq: PropTypes.func.isRequired,
};

export default HocBasic;
