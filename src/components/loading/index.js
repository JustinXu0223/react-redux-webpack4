/**
 * @component loading.js
 * @description 加载组件
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

// styles
import styles from './styles.less';

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div className={styles.loadingView}>
        <Spin size='large' />
      </div>
    );
  }
  // Handle the error state
  if (error) {
    return <div className={styles.loadingView}>Sorry, there was a problem loading the page...</div>;
  }

  return null;
};

LoadingComponent.defaultProps = {
  error: null,
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default LoadingComponent;
