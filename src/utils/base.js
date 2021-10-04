/**
 * @component base.js
 * @description 基础方法库
 * @time 2017/4/3
 * @author JUSTIN XU
 */

export function delay(time = 300) {
  return new Promise(resolve => setTimeout(() => resolve(time), time));
}

// 根据数组对象排序 默认升序
export function compareProps(prop) {
  return (obj1, obj2) => {
    const val1 = obj1[prop];
    const val2 = obj2[prop];
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    }
    return 0;
  };
}

// 切割base64字符串
export function sliceBase64(baseString = '') {
  const str = 'data:image/jpeg;base64,';
  if (!baseString) return null;
  if (baseString.startsWith(str)) {
    return baseString.replace(str, '');
  }
  if (baseString.startsWith('http')) {
    return baseString;
  }
  return null;
}

function padLeftZero(str) {
  return `00${str}`.substr(str.length);
}

// 格式化时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length),
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  /* eslint-disable no-restricted-syntax */
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 去除html中的标签
export function replaceHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]+>/g, '');
}

// 获取字符串img标签
export function matchImg(str) {
  if (!str) return '';
  return str.match(/<img.*?(?:>|\/>)/gi);
}

// 设置title
export function setTitle(title = '') {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    const i = document.createElement('iframe');
    i.src = '/static/favicon.ico';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}

// 处理搜索
export function transformKeyword(value, keyword) {
  if (!keyword || !value) return value;
  const reg = new RegExp(`(${keyword})`, 'ig');
  return value.replace(reg, `<span style="color: #ff4747">${keyword}</span>`);
}

// 防止重复点击
export const noDoubleHandle = {
  lastPressTime: 1,
  onHandle(callback) {
    const curTime = new Date().getTime();
    if (curTime - this.lastPressTime > 500) {
      this.lastPressTime = curTime;
      callback();
    }
  },
};

// array 去重
export function uniqueArr(arr = [], type = 'name') {
  if (!Array.isArray(arr)) throw new Error('params must be array');
  if (arr.length === 0) return arr;
  const hash = {};
  return arr.reduce((item, next) => {
    if (!hash[next[type]]) {
      hash[next[type]] = true;
      item.push(next);
    }
    return item;
  }, []);
}

// 格式化money 适用于numberInput
export function formatMoney(value) {
  if (!value && value !== 0) return null;
  if (typeof value === 'number') {
    value = String(value);
  }
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//  解析money 1,000,000 适用于numberInput
export function parserMoney(value) {
  if (!value && value !== 0) return null;
  if (typeof value === 'number') {
    value = String(value);
  }
  const res = value.replace(/\$\s?|(,*)/g, '');
  if (Number.isNaN(Number(res))) return value;
  return Number(res);
}

/**
 * 递归查询tree path
 * @param {array} list 数组
 * @param {string} value 比对值
 * @param {object} options 配置
 * {
 *   {String} equalKey 比对key
 *   {String} returnKey 返回key
 *   {Bool} returnIndex 是否返回index
 *   {Bool} returnOnlyLast 是否只返回最后一个
 * }
 * @return {*} 从顶层到当前层级
 */
export function getTreePathList(
  list,
  value,
  { equalKey = 'name', returnKey = 'uid', returnIndex = false, returnOnlyLast = false } = {},
) {
  for (let i = 0; i < list.length; i += 1) {
    const { children = [], [equalKey]: name, [returnKey]: uid } = list[i];
    const returnMap = returnIndex
      ? {
          ...list[i],
          index: i,
        }
      : uid;
    if (name === value) {
      if (returnOnlyLast) return returnMap;
      return [returnMap];
    }
    if (children && children.length) {
      const res = getTreePathList(children, value, {
        equalKey,
        returnKey,
        returnIndex,
      });
      if (res) {
        if (returnOnlyLast) return res;
        return [returnMap, res].flat();
      }
    }
  }
}

/**
 * 获取随机数
 * @param {number} max 最大数
 * @return {*} 0-max的随机数
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * key value对象转换成数组
 * @param {object} obj 需要转化对象
 * @param {string} name 映射的值
 * @return {*} []
 */
export function mapToArray(obj, name = 'value') {
  if (!(obj && Object.keys(obj).length)) return [];
  return Object.keys(obj).map(key => ({ key, [name]: obj[key] }));
}

// 将string转为number
function stringToNumber(data) {
  if (typeof data !== 'string') return data;
  const res = Number(data);
  return Number.isNaN(res) ? data : res;
}

/**
 * 将数据转为number
 * @param {*} data 需要
 * @return {*} * number / []
 */
export function toNumber(data) {
  if (Array.isArray(data)) {
    if (!data.length) return data;
    return data.map(item => stringToNumber(item));
  }
  return stringToNumber(data);
}

// 获取高阶组件名字
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * 实现redux的compose方法 [用作组件多个高阶连接打平]
 * 将hocA(hocB(Component))) ——> compose(hocA, hocB)(Component)
 * @param {*} functions 多个func
 * @return {*} function
 */
export function compose(...functions) {
  return functions.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
}

export function getUrlParam(key) {
  const { search } = window.location;
  if (!(key && search)) return null;
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const r = search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function loadScript(url) {
  if (!url) return null;
  const hm = document.createElement('script');
  hm.type = 'text/javascript';
  hm.src = url;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}
