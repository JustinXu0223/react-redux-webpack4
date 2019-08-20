/**
 * @component demo.js
 * @description demo service
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import axios from 'utils/request';
import { delay } from 'utils/base';

export function getUser() {
  return axios.get('/user');
}

export { delay };
