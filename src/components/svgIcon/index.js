/**
 * @component svgIcon.js
 * @description
 * @time 2019/6/14
 * @author JUSTIN
 */

import React from 'react';
import PropTypes from 'prop-types';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('assets/svg', true, /\.svg$/, 'lazy');
requireAll(req);

class SvgIcon extends React.PureComponent {
  render() {
    const {
      props: { iconClass, fill, children, size, width = size, height = size | width },
    } = this;
    return (
      <svg aria-hidden className='svg-icon' style={{ width: `${width}px`, height: `${height}px` }}>
        <use xlinkHref={`#icon-${iconClass}`} style={{ fill }} />
        {children}
      </svg>
    );
  }
}

SvgIcon.defaultProps = {
  children: null,
  fill: 'red',
  size: 20,
  width: undefined,
  height: undefined,
};

SvgIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  fill: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

export default SvgIcon;
