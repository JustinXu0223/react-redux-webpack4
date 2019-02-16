/**
 * @component index.js
 * @description 根reducer
 * @time 2018/5/17
 * @author JUSTIN XU
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as global from './global';

export default combineReducers({
  routes: routerReducer,
  ...global,
});
