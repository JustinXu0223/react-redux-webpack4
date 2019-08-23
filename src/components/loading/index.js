/**
 * @component loading.js
 * @description 加载组件
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import React from 'react';

import { Spin } from 'antd';

// style
import styles from './styles.scss';

function Loading() {
  return (
    <div className={styles.loadingView}>
      <Spin size='large' />
    </div>
  );
}

export default Loading;
