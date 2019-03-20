/**
 * @component demo.js
 * @description demo service
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import axios from 'utils/request';

export function delay(time = 3000) {
  return new Promise(resolve => setTimeout(() => resolve(time), time));
}


export function getUser() {
  return axios.get('/user');
}

