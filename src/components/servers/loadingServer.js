import BasicServer from './basicServer';

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
  handleRequestLoading = bindLoading => {
    if (bindLoading === loadingType.global) {
      // TODO 全局loading
    } else if (bindLoading) {
      this.setState({
        [bindLoading]: true,
      });
    }
  };
  handleResponseLoading = bindLoading => {
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
    this.handleRequestLoading(bindLoading);
    return this.doAction({ type }, restProps).finally(() => {
      this.handleResponseLoading(bindLoading);
    });
  };
  // 请求数据, 读取单个
  getSingle = ({ bindLoading = loadingType.loading, action = '', ...restProps } = {}) => {
    this.handleRequestLoading(bindLoading);
    return this.doAction({ action }, restProps).finally(() => {
      this.handleResponseLoading(bindLoading);
    });
  };

  render() {
    return null;
  }
}

export default LoadingServer;
