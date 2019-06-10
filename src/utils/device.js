/**
 * @component device.js
 * @description 设备判断
 * @time 2017/9/17
 * @author JUSTIN XU
 */
import Fingerprint from 'fingerprintjs';

const ua = navigator.userAgent;

// 是否为mac系统
export const isMac = () => /macintosh|mac os x/i.test(ua);


// 是否为windows系统
export const isWindows = () => /windows|win32/i.test(ua);

// 是否移动
export const isMobile = () => // detection PC and Mobile
  !!ua.match(/AppleWebKit.*Mobile.*/) && !!ua.match(/AppleWebKit/);
export const isAndroid = () => /(?:Android)/.test(ua);

export const isFireFox = () => /(?:Firefox)/.test(ua);

export const isTablet = () => /(?:iPad|PlayBook)/.test(ua) || (isAndroid() && !/(?:Mobile)/.test(ua)) || (isFireFox() && /(?:Tablet)/.test(ua));

export const isPC = () => !(isMobile() || isTablet());

export const getDeviceUniqueID = () => new Fingerprint().get();

export function getScrollBarWidth() {
  const el = document.createElement('div');
  // 设置style
  el.style.width = '100px';
  el.style.height = '100px';
  // 插入文档
  document.body.appendChild(el);
  // 获取未加入滚动轴的clientWidth
  const clientWidth1 = el.clientWidth;
  // 设置滚动轴属性
  el.style.overflowY = 'scroll';
  // 获取加入滚动轴的clientWidth
  const clientWidth2 = el.clientWidth;
  // 获取滚动轴宽度
  const scrollBarWidth = clientWidth1 - clientWidth2;
  // 移除元素兼容IE
  document.body.removeChild(el);
  // 移除元素不兼容IE
  el.remove();
  return scrollBarWidth;
}
