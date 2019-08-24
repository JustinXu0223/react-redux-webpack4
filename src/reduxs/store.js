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
import rootReducer from './reducers';
import rootSaga from './sagas';
import history from '../utils/history';

const win = window;

const navigationMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [navigationMiddleware, sagaMiddleware];

const composeEnhancers = isDev ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, {}, storeEnhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer);
  });
}

sagaMiddleware.run(rootSaga);
store.close = () => store.dispatch(END);

export default store;
