/**
 * @component Loading.js
 * @description 加载组件
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components';

const ContainerView = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.5s;
`;

function Loading({ isLoading }) {
  if (!isLoading) return null;
  // Handle the loading state
  return (
    <ContainerView>
      <Spin size='large' />
    </ContainerView>
  );
}

Loading.defaultProps = {
  isLoading: true,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
