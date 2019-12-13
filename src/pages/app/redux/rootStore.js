/* eslint-disable no-underscore-dangle */
/**
 * @component index.js
 * @description Store配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { END } from 'redux-saga';
import { isDev } from 'config';
import history from 'utils/history';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const win = window;

const navigationMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [navigationMiddleware, sagaMiddleware];

const composeEnhancers = isDev ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares));

const rootStore = createStore(rootReducer, {}, storeEnhancers);

if (module.hot) {
  module.hot.accept('./rootReducer.js', () => {
    rootStore.replaceReducer(rootReducer);
  });
}

sagaMiddleware.run(rootSaga);
rootStore.close = () => rootStore.dispatch(END);

export default rootStore;
