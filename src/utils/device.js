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
export const isMobile = () =>
  // detection PC and Mobile
  !!ua.match(/AppleWebKit.*Mobile.*/) && !!ua.match(/AppleWebKit/);
export const isAndroid = () => /(?:Android)/.test(ua);

export const isFireFox = () => /(?:Firefox)/.test(ua);

export const isTablet = () =>
  /(?:iPad|PlayBook)/.test(ua) ||
  (isAndroid() && !/(?:Mobile)/.test(ua)) ||
  (isFireFox() && /(?:Tablet)/.test(ua));

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

// 处理手势
// export const modalHelper = {
//   preventFun: e => e.preventDefault(),
//
//   handleStopScroll() {
//     document.body.addEventListener('touchmove', this.preventFun, { passive: false });
//   },
//
//   handleOpenScroll() {
//     document.body.removeEventListener('touchmove', this.preventFun, { passive: false });
//   },
// };
export const modalHelper = {
  bodyEl: document.body,
  top: 0,

  handleStopScroll() {
    this.top = window.scrollY;
    this.bodyEl.style.position = 'fixed';
    this.bodyEl.style.top = `${-this.top}px`;
  },
  handleOpenScroll() {
    this.bodyEl.style.position = '';
    this.bodyEl.style.top = '';
    window.scrollTo(0, this.top); // 回到原先的top
  },
};

/* 打开窗口
 * @param {string} url 跳转地址
 * @param {object} 配置
 * {
 *  {string} id div的id
 *  {boolean} isDownload 下载，不需要打开新页面
 * }
 * */
export function openWindow(url = '', { id = 'download', isDownload = false } = {}) {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  if (isDownload) {
    a.setAttribute('target', '_blank');
  }
  a.setAttribute('id', id);

  try {
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
  } catch (e) {
    window.open(url);
  }
}

/* 滚动到顶部 -> 使用定时器兼容火狐
 * */
export function scrollToTop() {
  const time = isFireFox() ? 250 : 0;
  setTimeout(() => {
    window.document.body.scrollIntoView({
      behavior: 'smooth',
    });
  }, time);
}
