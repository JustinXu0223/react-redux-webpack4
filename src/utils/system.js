/**
 * @component system.js
 * @description 系统判断
 * @time 2017/9/17
 * @author JUSTIN XU
 */
/** * 是否为mac系统（包含iphone手机） * */
export const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);


/** * 是否为windows系统 * */
export const isWindows = () => /windows|win32/i.test(navigator.userAgent);

// 是否移动
export const isMobile = () => { // detection PC and Mobile
  if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && !!navigator.userAgent.match(/AppleWebKit/)) {
    return true;
  }
  return false;
};
