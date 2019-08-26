/*
 * @component index.js
 * @description error路由和规则输出
 * @time 2019/8/11
 * @author JUSTIN
 */
// constants
import routerId from 'constants/routerId';

import ServerErrorContent, { navigation as serverErrorRouter } from './500';
import NotFoundContent, { navigation as notFoundRouter } from './404';

const errorNav = {
  path: routerId.error,
  name: '错误页',
  icon: 'pie-chart',
};

export const navigation = {
  ...errorNav,
  children: [notFoundRouter, serverErrorRouter],
};

export default [ServerErrorContent, NotFoundContent];
