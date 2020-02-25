import React from 'react';

class BasicServer extends React.PureComponent {
  state = {};

  componentWillUnmount() {
    this.apiList = [];
    this.pollingApiList.forEach(item => {
      clearInterval(item);
    });
  }

  getBindList = ({ action = '', type = '' } = {}) => {
    return this.apiList.filter(
      item => (item.action === action && action) || (item.type === type && type),
    );
  };

  apiList = []; // api列表
  pollingApiList = []; // 轮训api列表

  // 绑定基础方法
  bindAction = ({
    api = {}, // api请求
    action = api.name, // 给doAction使用
    type = '', // 提供getAll 遍历一起使用
    formatBindingData = v => v, // 格式化绑定在state的值
    bindingData = '', // 绑定在state的值
    sendingData = {}, // 发送的数据
    polling = false, // 当前接口是否轮询
    callback = () => null, // 回调
  } = {}) => {
    this.apiList.push({
      api,
      action,
      type,
      formatBindingData,
      bindingData,
      sendingData,
      polling,
      callback,
    });
  };

  // 执行单一请求
  doAction = ({ action = '', type = '' } = {}, restProps = {}) => {
    const bindList = this.getBindList({ action, type });
    if (!(Array.isArray(bindList) && bindList.length)) {
      console.error('你还未绑定action');
      return Promise.resolve(true);
    }
    return this.handleCommand(bindList, restProps);
  };

  handleCommand = async (bindList, restProps = {}) => {
    try {
      const bindPromise = bindList.map(item => {
        const resItem = { ...item, ...restProps };
        if (item.polling) {
          this.pollingApiList.push(
            setInterval(() => {
              this.handleRequest(resItem);
            }, resItem.polling),
          );
        }
        return this.handleRequest(resItem);
      });

      return Promise.all(bindPromise);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  handleRequest = async ({ api, sendingData, formatBindingData, bindingData, callback }) => {
    try {
      const result = await api(sendingData);
      // TODO 处理返回信息
      /*if (result.status !== 6000) {
        throw new Error(result.message);
      }*/
      // 申请接口不需要绑定值
      if (bindingData) {
        this.setState({
          // [bindingData]: formatBindingData(result.data),
          [bindingData]: formatBindingData(result),
        });
      }
      callback(null, result);
      return Promise.resolve(result);
    } catch (e) {
      callback(e);
      return Promise.reject(e);
    }
  };

  render() {
    return null;
  }
}

export default BasicServer;
