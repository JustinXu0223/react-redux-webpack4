/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import { isDev } from 'config';
import { disableReactDevTools } from 'utils/base';
import history from 'utils/history';
import rootStore from 'pages/app/redux/rootStore';
import router from './rootRouter';

// mock
import mock from './mock';

if (isDev) {
  mock.start();
} else {
  disableReactDevTools();
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root,
  .app-container-view,
  .ant-layout {
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

function renderApp(Router) {
  ReactDOM.render(
    <AppContainer>
      <React.Fragment>
        <Provider store={rootStore}>
          <Router history={history} />
        </Provider>
        <GlobalStyle />
      </React.Fragment>
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(router);

if (module.hot) {
  module.hot.accept('./rootRouter.js', () => {
    const Router = require('./rootRouter.js').default;
    renderApp(Router);
  });
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(registration => {
//         console.warn('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         console.error('SW registration failed: ', registrationError);
//       });
//   });
// }
