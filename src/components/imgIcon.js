/**
 * @component imgIcon.js
 * @description image组件
 * @time 2018/7/24
 * @author JUSTIN XU
 */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgIcon = styled.img.attrs({
  src: props => props.src,
  alt: props => props.alt,
})`
  width: ${props => props.width || props.size};
  height: ${props => props.height || props.size};
`;

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
