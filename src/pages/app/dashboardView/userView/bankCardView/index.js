/**
 * @component index.js
 * @description signIn路由导航
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import loadable from '@loadable/component';

// constants
import routerId from 'constants/routerId';

// components
import Loading from 'components/loading';

export const view = loadable(() => import(/* webpackChunkName: "bankCard" */ './view'), {
  fallback: <Loading />,
});

export const navigation = {
  path: routerId.userBankCard,
  name: '用户银行卡',
  icon: 'home',
  exact: true,
};
