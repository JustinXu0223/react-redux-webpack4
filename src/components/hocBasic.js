/**
 * @component HocBasic.js
 * @description 基础高阶组件
 * @time 2019/6/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';

// reduxs
import { connect } from 'react-redux';
import { CHANGE_THEME_NAME } from 'reduxs/actions/global';

function HocBasic(WrappedComponent) {
  @connect(
    state => ({
      styles: state.styles,
    }),
    dispatch => ({
      changeThemeReq: payload => dispatch({ type: CHANGE_THEME_NAME, payload }),
    }),
  )
  class WrapperComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WrapperComponent;
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
