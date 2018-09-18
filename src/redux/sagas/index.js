/**
 * @component index.js
 * @description sage配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import { all, fork } from 'redux-saga/effects';

import globalFlow from './global';

export default function* rootSaga() {
  yield all([
    fork(globalFlow),
  ]);
}
