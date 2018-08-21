/**
 * @component ImgIcon.js
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
  width: ${props => props.size};
  height: ${props => props.size};
`;

ImgIcon.defaultProps = {
  size: 36,
  alt: 'image',
};

ImgIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
};

export default ImgIcon;
