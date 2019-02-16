import immutable from 'immutable';

export const initBasicList = immutable.fromJS({
  loading: true,
  loadingMore: false,
  list: [],
  errMsg: null,
});

export const initBasicMap = immutable.fromJS({
  loading: false,
  data: {},
  errMsg: null,
});

export const initTableBasicList = initBasicList.merge({
  page_size: 30,
  page_index: null,
  total: null,
});

export const initTableQueryList = initTableBasicList.merge({
  extra_data: {},
  time_start: null,
  time_end: null,
});
