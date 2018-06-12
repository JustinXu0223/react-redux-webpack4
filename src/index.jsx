/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages';

console.log(process.env);
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
