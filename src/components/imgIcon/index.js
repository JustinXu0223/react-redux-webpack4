/**
 * @component imgIcon.js
 * @description image组件
 * @time 2018/7/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';

class ImgIcon extends React.PureComponent {
  render() {
    const {
      props: { src, alt, size, width = size, height = size },
    } = this;

    return <img src={src} alt={alt} width={width} height={height} />;
  }
}

ImgIcon.defaultProps = {
  alt: 'image',
  size: 36,
  width: undefined,
  height: undefined,
};

ImgIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ImgIcon;
