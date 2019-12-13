/**
 * @component demoReducer.js
 * @description demo reducer
 * @time 2019/6/15
 * @author JUSTIN XU
 */
import { initList } from 'constants/initialState';
import { RESET_REDUX_STORE } from 'pages/app/authView/redux/authAction';
import * as types from './demoAction';

const initDemo = initList([
  {
    id: 1,
    name: 'First',
    number: 0,
  },
  {
    id: 2,
    name: 'Second',
    number: 10,
  },
  {
    id: 3,
    name: 'Third',
    number: 20,
  },
]);

// demo
export const demo = (state = initDemo, action) => {
  switch (action.type) {
    case types.INCREMENT_REQ:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('loadingMore', false)
        .set('errMsg', false);
    case types.INCREMENT_RES:
      return state.set('loading', false).merge(action.payload);
    case types.DECREASE_REQ:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('loadingMore', false)
        .set('errMsg', false);
    case types.DECREASE_RES:
      return state.set('loading', false).merge(action.payload);
    case RESET_REDUX_STORE:
      return initDemo;
    default: {
      return state;
    }
  }
};
