/**
 * @component SvgIcon
 * @description
 * @time 2019/6/14
 * @author JUSTIN
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('assets/svg', true, /\.svg$/);
requireAll(req);

const ContainerView = styled.svg.attrs({
  'aria-hidden': true,
})`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`;

class SvgIcon extends React.PureComponent {
  render() {
    const {
      props: {
        iconClass,
        fill,
        children,
        width,
        height,
      },
    } = this;
    return (
      <ContainerView
        className="svg-icon"
        width={width}
        height={height || width}
      >
        <use
          xlinkHref={`#icon-${iconClass}`}
          style={{ fill }}
        />
        {children}
      </ContainerView>
    );
  }
}

SvgIcon.defaultProps = {
  children: null,
  fill: 'red',
  width: 20,
  height: undefined,
};

SvgIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

export default SvgIcon;
