/**
 * @component chart.js  basic bizcharts
 * @description chart selector
 * @time 2018/5/25
 * @author JUSTIN XU
 */
import { createSelector } from 'reselect';
import moment from 'moment';

const getHashrate = (state, type) => state[type];

// one miner example: chart components/LineChart.jsx
export const hashrateSelector = createSelector(
  [getHashrate],
  hashrate => {
    const result = hashrate.get('list').toJS() || [];
    const loading = hashrate.get('loading') || false;
    const data = result.map(item => {
      const time = moment
        .unix(item[0])
        .local()
        .format('MM-DD HH:mm');
      const [, res] = item;
      return {
        time,
        hashrate: res,
      };
    });
    return {
      data,
      loading,
    };
  },
);
