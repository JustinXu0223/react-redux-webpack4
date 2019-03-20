/**
 * @component request.js
 * @description 封装 axios请求
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import axios from 'axios';
import history from './history';

const BASE_URL = process.env.REACT_APP_BASE_API;

function getServeError() {
  const language = localStorage.getItem('language') || 'zh';
  const bool = language === 'zh';
  return {
    SERVE_ERROR: bool ? '服务器发生未知错误' : 'Serve error',
    SERVE_TOKEN_ERROR: bool ? '令牌失效' : 'Token invalid',
    TIMEOUT_ERROR: bool ? '网络连接超时' : 'Network connection timeout',
    NETWORK_ERROR: bool ? '无网络连接' : 'Network error',
  };
}

class ResponseError extends Error {
  constructor(message, code, response = {}) {
    super(message);
    this.code = code;
    this.response = response;
  }
}

function reloadHttp(config) {
  if (!config || !config.retry) return Promise.resolve(null);

  // Set the variable for keeping track of the retry count
  config.last_retryCount = config.last_retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.last_retryCount >= config.retry) {
    // Reject with the error
    return Promise.resolve(null);
  }

  // Increase the retry count
  config.last_retryCount += 1;

  // Create new promise to handle exponential backoff
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, config.retryDelay || 1);
  }));
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,

  withCredentials: true,

  // 设置全局的请求次数，请求的间隙
  retry: 2,
  retryDelay: 1000,
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    debugger;
    const a = JSON.parse(data);
    debugger;
    return a;
  }],
});

// Add a request interceptor
instance.interceptors.request.use(config => {
  const language = localStorage.getItem('language');
  config.headers['X-Pool-Language'] = language || 'zh';
  const token = localStorage.getItem('token');
  // removeToken is true, don't need token
  if (token && !config.removeToken) {
    config.headers['X-Pool-Jwt'] = token;
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(response => {
  const { data, status } = response;
  if ((status >= 200 && status < 300) || status === 304) {
    if (Object.is('arraybuffer', response.config.responseType)) {
      const filename = response.headers['content-disposition'] || '';
      return { filename, file: data };
    }
    return data;
  }
  throw new ResponseError(getServeError().SERVE_ERROR, Number(data.code), response);
}, async (err) => {
  const { status, data: { msg, message, code } = {}, config = {} } = err.response || {};
  const errMsg = msg || message;
  // check reload http
  if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
    const reloadConfig = await reloadHttp(err.config);
    if (reloadConfig) return instance(reloadConfig);
  }
  // handle auth
  if (Object.is(401, status) && !config.removeAuth) {
    localStorage.removeItem('token');
    history.replace('/login');
    const message = errMsg || getServeError().SERVE_TOKEN_ERROR;
    throw new ResponseError(message, Number(code), err.response);
  }
  // handle network timeout
  if (Object.is('ECONNABORTED', err.code)) {
    throw new ResponseError(getServeError().TIMEOUT_ERROR, null, err.response);
  }
  // handle network error
  if (Object.is('Network Error', err.message)) {
    throw new ResponseError(getServeError().NETWORK_ERROR, null, err.response);
  }
  if (Object.is('arraybuffer', config.responseType)) {
    const data = err.response.data || '';
    const result = Buffer.from(data, 'binary').toString() || '{}';
    const message = JSON.parse(result).msg || getServeError().SERVE_ERROR;
    throw new ResponseError(message, null, err.response);
  }
  throw new ResponseError(errMsg || getServeError().SERVE_ERROR, null, err.response);
});

export default instance;

export function removeHandleAuth() {
  return { removeAuth: true };
}

export function removeHandleToken() {
  return { removeToken: true };
}

export function getBufferResType(download = 1) {
  return download ? 'arraybuffer' : 'json';
}
