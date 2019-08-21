/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { isDev } from 'config';
import { disableReactDevTools } from 'utils/base';

if (!isDev) {
  disableReactDevTools();
}

function renderApp() {
  ReactDOM.render(<div>下载页面</div>, document.getElementById('root'));
}

renderApp();
