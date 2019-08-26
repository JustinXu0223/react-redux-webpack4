/**
 * @component index.js
 * @description 错误页
 * @time 2018/5/7
 * @author JUSTIN
 */
import React from 'react';
import { compose } from 'redux';

// components
import HocBasic from 'components/hocBasic';
import HocError from '../component/hocError';

class ServerError extends React.Component {
  i18nName = 'not_found';

  render() {
    return null;
  }
}

export default compose(
  HocBasic,
  HocError,
)(ServerError);
