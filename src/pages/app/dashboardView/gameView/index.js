/**
 * @component index.js
 * @description 游戏路由导航
 * @time 2019/3/9
 * @author JUSTIN
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

// import { navigation as userInfoRouter } from './infoView';
// import { navigation as bankCardRouter } from './bankCardView';

export const view = loadable(() => import(/* webpackChunkName: "gameRouter" */ './gameRouter'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.game,
  name: '游戏',
  icon: 'home',
  exact: false,
  // children: [userInfoRouter, bankCardRouter],
};
