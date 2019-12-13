/**
 * @component demoSaga.js
 * @description demo selectors
 * @time 2019/6/15
 * @author JUSTIN XU
 */
import { createSelector } from 'reselect';

export const getDemo = state => state.demo;

export const getCounter = createSelector(
  [getDemo],
  demo => demo.get('list').reduce((prevValue, currValue) => prevValue + currValue.get('number'), 0),
);
