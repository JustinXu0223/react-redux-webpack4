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
import { isDev } from 'config';
import { disableReactDevTools } from 'utils/base';
import history from 'utils/history';
import store from 'reduxs/store';

// styles
import '../../theme/cssRest.css';

import router from './router';

// mock
import mock from '../../mock';

if (isDev) {
  mock.start();
} else {
  disableReactDevTools();
}

function renderApp(Router) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(router);

if (module.hot) {
  module.hot.accept('./router.js', () => {
    const Router = require('./router.js').default;
    renderApp(Router);
  });
}
