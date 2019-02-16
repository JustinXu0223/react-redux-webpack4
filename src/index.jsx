/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import history from './utils/history';
import store from './reduxs/store';
import Router from './router';
import theme from './styles';

// you can open local mock
// import mock from './mock';
//
// if (process.env.NODE_ENV !== 'production') {
//   mock.start();
// }

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
`;

console.log(process.env);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
