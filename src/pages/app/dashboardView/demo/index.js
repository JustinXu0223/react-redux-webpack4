/*
 * @component index.js
 * @description demo路由和规则输出
 * @time 2019/8/11
 * @author JUSTIN
 */
// constants
import routerId from 'pages/app/constants/routerId';

import Counter, { navigation as counterRouter } from './counterView';
import Sticky, { navigation as stickyRouter } from './reactTickyView';

const errorNav = {
  path: routerId.demo,
  name: 'Demo',
  icon: 'area-chart',
};

export const navigation = {
  ...errorNav,
  children: [counterRouter, stickyRouter],
};

export default [Counter, Sticky];
