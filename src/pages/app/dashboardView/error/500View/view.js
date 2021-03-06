/**
 * @component view.js
 * @description 服务器错误页
 * @time 2018/5/7
 * @author JUSTIN
 */
import React from 'react';

// components
import HocBasic from 'pages/app/components/hocBasic';
import HocError from 'pages/app/components/hocError';

@HocBasic
@HocError
class NotFound extends React.Component {
  i18nName = 'server_error';

  render() {
    return null;
  }
}

export default NotFound;
