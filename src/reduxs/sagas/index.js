/**
 * @component index.js
 * @description sage配置
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import { all, fork } from 'redux-saga/effects';

const req = require.context('./', false, /\.js$/);
const context = req.keys().filter(item => item !== './index.js');

export default function* rootSaga() {
  yield all(context.map(key => fork(req(key).default)));
}
