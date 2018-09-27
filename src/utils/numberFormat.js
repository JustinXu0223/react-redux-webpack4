/**
 * @component numberFormat.js
 * @description 数字格式化
 * @time 2018/5/18
 * @author JUSTIN XU
 */
import Big from 'big.js';

export function hashrateFormat(hashrate = 0) {
  let magnitude = 1;
  let unit = '';
  if (hashrate >= 1e3 && hashrate < 1e6) {
    magnitude = 1e3;
    unit = 'K';
  } else if (hashrate >= 1e6 && hashrate < 1e9) {
    magnitude = 1e6;
    unit = 'M';
  } else if (hashrate >= 1e9 && hashrate < 1e12) {
    magnitude = 1e9;
    unit = 'G';
  } else if (hashrate >= 1e12 && hashrate < 1e15) {
    magnitude = 1e12;
    unit = 'T';
  } else if (hashrate >= 1e15) {
    magnitude = 1e15;
    unit = 'P';
  }
  const number = parseFloat((hashrate / magnitude).toFixed(3));
  return {
    number,
    unit,
    magnitude,
    formated: `${number} ${unit}H/s`,
  };
}

export function numberFormat(val, len = 0) {
  let num = val;
  if (typeof num !== 'number') {
    num = parseFloat(num);
    if (typeof num !== 'number') {
      return '';
    }
  }
  let res;
  if (num && len) {
    res = new Big(num).toFixed(len);
  } else {
    res = num;
  }
  if (num < 1000) return res;
  const parsedArr = res.split('.');
  const integer = parsedArr[0];
  const fraction = parsedArr[1];
  const numArr = integer.split('');
  const postInt = numArr.map((digit, index) => ((numArr.length - index) % 3 === 0 && index !== 0 ? `,${digit}` : digit)).join('');
  return fraction ? `${postInt}.${fraction}` : postInt;
}
