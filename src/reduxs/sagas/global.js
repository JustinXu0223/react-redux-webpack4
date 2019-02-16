/**
 * @component global.js
 * @description App 动作
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import { takeEvery, all, put } from 'redux-saga/effects';
import * as Types from '../actions/global';

// saga
const initLanguageSaga = function* saga() {
  const rawCode = localStorage.getItem('language') || 'zh';
  const code = ['en', 'zh'].includes(rawCode) ? rawCode : 'en';

  yield put({ type: Types.CHANGE_LANGUAGE, payload: code });
};

const changeLanguageSaga = function* saga({ payload }) {
  yield localStorage.setItem('language', payload);
  const i18n = yield import(`i18n/${payload}`);
  yield put({ type: Types.CHANGE_I18N, payload: i18n.default });
};


export default function* rootFlow() {
  yield all([
    takeEvery(Types.INIT_LANGUAGE, initLanguageSaga),
    takeEvery(Types.CHANGE_LANGUAGE, changeLanguageSaga),
  ]);
}
