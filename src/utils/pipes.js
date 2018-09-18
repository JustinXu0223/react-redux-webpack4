/**
 * @component pipes.js
 * @description 通道
 * @time 2017/7/17
 * @author JUSTIN XU
 */
// 电话pipe
export function telPipe(value) {
  if (!value) return null;
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  if (typeof value !== 'string') value = value.toString();
  return value.replace(reg, '$1****$2');
}

export function addressPipe(value) {
  if (!value) return null;
  const reg = /^(\w{6}).+?(\w{6})$/;
  if (typeof value !== 'string') value = value.toString();
  return value.replace(reg, '$1******$2');
}
