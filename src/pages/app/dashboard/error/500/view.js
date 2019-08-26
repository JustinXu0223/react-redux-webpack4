/**
 * @component view.js
 * @description 服务器错误页
 * @time 2018/5/7
 * @author JUSTIN
 */
import React from 'react';
import { compose } from 'redux';

// components
import HocBasic from 'components/hocBasic';
import HocError from '../component/hocError';

class NotFound extends React.Component {
  i18nName = 'server_error';

  render() {
    return null;
  }
}

export default compose(
  HocBasic,
  HocError,
)(NotFound);
