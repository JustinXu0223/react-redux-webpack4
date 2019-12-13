/*
 * @component scanner.js
 * @description 文件扫描
 * @time 2019/12/10
 * @author JUSTIN
 */
import React from 'react';
import { Route } from 'react-router-dom';

// constants
import { layoutEnum, layoutList, layoutTree } from 'constants/routerId';

// utils
import { getTreePathList } from 'utils/base';

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
 * 获取当前视图layout和page的对应
 * @returns {Object}
 */
function getPagePath(curr, index) {
  // 当前layout数组长度
  const len = layoutList.length;
  // 取出最后一个
  const key = layoutList[len - index];
  // 获取当前path的路径list
  const pathList = getTreePathList(layoutTree, key, { returnKey: 'name' });
  // 得到当前路径
  const path = pathList.join('');
  if (curr.navigation.path.startsWith(path)) {
    // exact 为false, 为上层layout导航
    if (curr.navigation.exact === false) {
      // 获取当前父亲节点的index
      const pathParentIndex = pathList.findIndex(item => item === key) - 1;
      return {
        layout: pathList[pathParentIndex],
        page: curr,
      };
    } else {
      return {
        layout: key,
        page: curr,
      };
    }
  }
  // 当达到列表长度，还未返回，默认为顶层路由
  if (index === len) {
    // debugger;
    return {
      layout: layoutEnum.root,
      page: curr,
    };
  }
  // 当index没达到列表长度，递归查询
  if (index !== len) {
    return getPagePath(curr, index + 1);
  }
}

/*
 * 获取router路径规则
 * export.default 默认输出路由规则，如果有，则使用其
 * 其他自动生成路由规则
 * */
function getRouteRule(page) {
  if (page.default) {
    return page.default;
  }
  return (
    <Route
      exact={page.navigation.exact}
      key={page.navigation.path}
      path={page.navigation.path}
      component={page.view}
    />
  );
}

/*
 * 获取当前视图layout和view的对应路由规则
 */
export function getRouterTree() {
  const pageList = getPageList();
  // console.log('@pageList:', pageList);
  return pageList.reduce((prev, curr) => {
    const { layout, page } = getPagePath(curr, 1);
    if (prev[layout]) {
      prev[layout].push({
        navigation: curr.navigation,
        router: getRouteRule(page),
      });
    } else {
      prev[layout] = [
        {
          navigation: curr.navigation,
          router: getRouteRule(page),
        },
      ];
    }
    return prev;
  }, {});
}

/*
 * 序列化路由树
 * @returns {Array}
 */
export function getFormatRouterTree() {
  const routerTree = getRouterTree();
  // console.log('@routerTree:', routerTree);
  const res = Object.keys(routerTree).reduce((prev, curr) => {
    prev[curr] = routerTree[curr]
      // 为sort默认附值
      .map(item => {
        if (typeof item.navigation.sort == 'undefined') {
          item.navigation.sort = 5;
        }
        return item;
      })
      // 默认升序
      .sort((a, b) => a.navigation.sort - b.navigation.sort)
      .map(item => item.router)
      .flat(1);
    return prev;
  }, {});
  // console.log('@res:', res);
  return res;
}
