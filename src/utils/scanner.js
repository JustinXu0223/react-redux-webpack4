/*
 * @component scanner.js
 * @description 文件扫描
 * @time 2019/12/10
 * @author JUSTIN
 */
import React from 'react';
import { Route } from 'react-router-dom';

// constants
import { layoutType } from 'constants/routerId';

/** router 排序类型
 * 只关心开始和结束的位置，其他可以任意排列
 * */
export const sortType = {
  start: 'scanner/start',
  end: 'scanner/end',
};

// 创建context容器
export const SubscriberContext = React.createContext({});

/*
 * Layout扫描
 * @returns {Array}
 */
export function getLayoutList() {
  const req = require.context('../', true, /\w+Router.js$/i);
  return (
    req
      .keys()
      .map(item => ({
        ...req(item),
        path: item.slice(2),
        pathList: item.split('/'),
      }))
      // 设置排列为升序
      .sort((a, b) => a.pathList.length - b.pathList.length)
      .map(item => item.name)
  );
}
/*
 * 视图扫描
 * @returns {Array}
 */
export function getPageList() {
  const req = require.context('../', true, /\w+View\/index\.[a-z]+$/i);
  return req.keys().map(item => ({
    ...req(item),
    path: item.slice(2),
  }));
}

/*
 * 获取当前视图layout和page的对应
 * @returns {Object}
 */
function getPagePath(layoutList, curr, index) {
  const len = layoutList.length;
  // 反序排列index
  const keyIndex = len - index;
  const key = layoutList[keyIndex];
  // 顶层路由为/，但是key设置为root，这里过滤掉其生成的path
  const path = layoutList.slice(0, keyIndex + 1).join('');
  if (curr.navigation.path.startsWith(path)) {
    // exact 为false, 为上层layout导航
    if (curr.navigation.exact === false) {
      return {
        layout: layoutList[len - index - 1],
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
    return {
      layout: layoutType.root,
      page: curr,
    };
  }
  // 当index没达到列表长度，递归查询
  if (index !== len) {
    return getPagePath(layoutList, curr, index + 1);
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
  const layoutList = getLayoutList();
  const pageList = getPageList();
  console.log('@layoutList:', layoutList);
  console.log('@pageList:', pageList);
  return pageList.reduce((prev, curr) => {
    const { layout, page } = getPagePath(layoutList, curr, 1);
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
  console.log('@routerTree:', routerTree);
  const res = Object.keys(routerTree).reduce((prev, curr) => {
    let startRouter;
    let endRouter;
    const otherRouter = [];
    routerTree[curr].forEach(item => {
      if (item.navigation.sort === sortType.start) {
        startRouter = item.router;
        return false;
      }
      if (item.navigation.sort === sortType.end) {
        endRouter = item.router;
        return false;
      }
      otherRouter.push(item.router);
    });
    if (startRouter) {
      otherRouter.unshift(startRouter);
    }
    if (endRouter) {
      otherRouter.push(endRouter);
    }
    prev[curr] = otherRouter.flat(1);
    return prev;
  }, {});
  console.log('@res:', res);
  return res;
}
