import immutable from 'immutable';

export function initList(list = []) {
  return immutable.fromJS({
    loading: false,
    loadingMore: false,
    loaded: false,
    noData: false,
    list,
    errMsg: null,
  });
}

export function initMap(data = {}) {
  return immutable.fromJS({
    loading: true,
    loadingMore: false,
    loaded: false,
    noData: false,
    data,
    errMsg: null,
  });
}

export function initTable(list = []) {
  return immutable.fromJS({
    loading: false,
    noData: false,
    list,
    errMsg: null,
    page: 1,
    pageSize: 10,
  });
}
