/**
 * @component index.js
 * @description 错误页
 * @time 2018/5/7
 * @author JUSTIN
 */
import React from 'react';

// components
import HocBasic from 'components/hocBasic';
import HocError from '../component/hocError';

@HocBasic
@HocError
class ServerError extends React.Component {
  i18nName = 'not_found';

  render() {
    return null;
  }
}

export default ServerError;
