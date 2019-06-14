/**
 * @component index.js
 * @description 根reducer
 * @time 2018/5/17
 * @author JUSTIN XU
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const req = require.context('./', false, /\.js$/);
const context = req.keys().filter(item => item !== './initialState.js');

export default combineReducers({
  routes: routerReducer,
  ...context.reduce((prevValue, currValue) => Object.assign(prevValue, req(currValue)), {}),
});
