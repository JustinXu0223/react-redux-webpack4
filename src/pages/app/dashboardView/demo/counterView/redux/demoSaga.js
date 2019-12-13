/**
 * @component demoSaga.js
 * @description demo saga
 * @time 2019/6/15
 * @author JUSTIN XU
 */
import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { delay } from '../demoService';
import * as Types from './demoAction';
import { getDemo } from './demoSelector';

export function* incrementSaga({ payload }) {
  try {
    const demo = yield select(getDemo);
    yield call(delay, 1000);
    const list = demo.get('list').map(value => {
      if (value.get('id') !== payload) return value;
      return value.update('number', number => number + 1);
    });
    yield put({
      type: Types.DECREASE_RES,
      payload: { list },
    });
  } catch (err) {
    yield put({
      type: Types.INCREMENT_RES,
      payload: { errMsg: err.message },
    });
  }
}

export function* decreaseSaga({ payload }) {
  try {
    const demo = yield select(getDemo);
    yield call(delay, 1000);
    const list = demo.get('list').map(value => {
      if (value.get('id') !== payload) return value;
      return value.update('number', number => (number === 0 ? 0 : number - 1));
    });
    yield put({
      type: Types.INCREMENT_RES,
      payload: { list },
    });
  } catch (err) {
    // handle error
    yield put({
      type: Types.INCREMENT_RES,
      payload: { errMsg: err.message },
    });
  }
}

export default function* rootFlow() {
  yield all([
    takeEvery(Types.INCREMENT_REQ, incrementSaga),
    takeEvery(Types.DECREASE_REQ, decreaseSaga),
  ]);
}
