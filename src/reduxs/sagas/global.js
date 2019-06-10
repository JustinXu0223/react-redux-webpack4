/**
 * @component global.js
 * @description App 动作
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import { takeEvery, all, put } from 'redux-saga/effects';
import * as Types from '../actions/global';

// language saga
const initLanguageSaga = function* saga() {
  const rawCode = localStorage.getItem('language') || 'zh';
  const code = ['en', 'zh'].includes(rawCode) ? rawCode : 'en';

  yield put({ type: Types.CHANGE_LANGUAGE_NAME, payload: code });
};

const changeLanguageSaga = function* saga({ payload }) {
  localStorage.setItem('language', payload);
  const i18n = yield import(`i18n/${payload}`);
  yield put({ type: Types.CHANGE_I18N, payload: i18n.default });
};

// styles saga
const initStylesSaga = function* saga() {
  const rawCode = localStorage.getItem('styles') || 'light';
  const name = ['light', 'dark'].includes(rawCode) ? rawCode : 'light';

  yield put({ type: Types.CHANGE_THEME_NAME, payload: name });
};

const changeStylesSaga = function* saga({ payload }) {
  localStorage.setItem('styles', payload);
  const theme = yield import(`theme/${payload}`);
  yield put({ type: Types.CHANGE_THEME, payload: theme.default });
};


export default function* rootFlow() {
  yield all([
    takeEvery(Types.INIT_LANGUAGE, initLanguageSaga),
    takeEvery(Types.CHANGE_LANGUAGE_NAME, changeLanguageSaga),
    takeEvery(Types.INIT_THEME, initStylesSaga),
    takeEvery(Types.CHANGE_THEME_NAME, changeStylesSaga),
  ]);
}
