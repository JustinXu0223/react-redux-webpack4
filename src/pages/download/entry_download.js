/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { isDev } from 'config';
import { disableReactDevTools } from 'utils/base';

if (!isDev) {
  disableReactDevTools();
}

/* eslint-disable no-unused-expressions */
injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
  ol, ul {
    list-style: none;
    list-style-type: none;
  }
  a:focus {
    text-decoration: none;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

function renderApp() {
  ReactDOM.render(
    <div>
      下载页面
    </div>,
    document.getElementById('root'),
  );
}

renderApp();
