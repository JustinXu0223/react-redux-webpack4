/*
 * @component index.js
 * @description error路由和规则输出
 * @time 2019/8/11
 * @author JUSTIN
 */
// constants
import routerId from 'constants/routerId';

import { navigation as serverErrorRouter } from './500View';
import { navigation as notFoundRouter } from './404View';

export const navigation = {
  path: routerId.dashError,
  name: '错误页',
  icon: 'pie-chart',
  children: [notFoundRouter, serverErrorRouter],
};
