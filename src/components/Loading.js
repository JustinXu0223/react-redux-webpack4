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
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <ContainerView>
        <Spin size="large" />
      </ContainerView>
    );
  }
  // Handle the error state
  if (error) {
    return <ContainerView>Sorry, there was a problem loading the page...</ContainerView>;
  }

  return null;
};

LoadingComponent.defaultProps = {
  error: null,
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default LoadingComponent;
