/*
 * @component scanner.js
 * @description 文件扫描
 * @time 2019/12/10
 * @author JUSTIN
 */
import React from 'react';

// constants
import { layoutEnum, layoutList, layoutTree } from 'pages/app/constants/routerId';

// utils
import { getRouterTree, getFormatRouterTree } from 'utils/scanner';

// 创建context容器
export const SubscriberContext = React.createContext({});

/*
 * 视图扫描
 * @returns {Array}
 */
export function getPageList() {
  const req = require.context('../', true, /\w+View\/index\.[a-z]+$/i);
  return req.keys().map(item => req(item));
}

/*
 * 序列化路由树
 * @returns {Array}
 */
export function getAppRouterTree() {
  return getFormatRouterTree(getRouterTree(getPageList())({ layoutEnum, layoutList, layoutTree }));
}
