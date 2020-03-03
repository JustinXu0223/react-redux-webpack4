import BasicServer from './basicService';

const loadingType = {
  global: 'global', // 全局
  loading: 'loading', // 默认单个为loading
};

class LoadingServer extends BasicServer {
  state = {};

  bindType = {
    all: 'all', // 一起请求
  };

  // 处理loading
  $_handleRequestLoading = bindLoading => {
    if (bindLoading === loadingType.global) {
      // TODO 全局loading
    } else if (bindLoading) {
      this.setState({
        [bindLoading]: true,
      });
    }
  };
  $_handleResponseLoading = bindLoading => {
    if (bindLoading === loadingType.global) {
      // TODO 全局loading
    } else if (bindLoading) {
      this.setState({
        [bindLoading]: false,
      });
    }
  };

  bindAllAction = ({
    api = {},
    action = api.name,
    type = this.bindType.all,
    ...restProps
  } = {}) => {
    this.bindAction({
      api,
      action,
      type,
      ...restProps,
    });
  };
  // 请求数据, 多个一起
  getAll = ({ bindLoading = loadingType.global, type = this.bindType.all, ...restProps } = {}) => {
    this.$_handleRequestLoading(bindLoading);
    return this.doAction({ type }, restProps).finally(() => {
      this.$_handleResponseLoading(bindLoading);
    });
  };
  // 请求数据, 读取单个
  getSingle = ({ bindLoading = loadingType.loading, action = '', ...restProps } = {}) => {
    this.$_handleRequestLoading(bindLoading);
    return this.doAction({ action }, restProps)
      .catch(err => {
        return Promise.reject(err);
      })
      .finally(() => {
        this.$_handleResponseLoading(bindLoading);
      });
  };

  render() {
    return null;
  }
}

export default LoadingServer;
