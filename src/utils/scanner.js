/*
 * @component scanner.js
 * @description 文件扫描
 * @time 2019/12/10
 * @author chat
 */
/*
 * 视图扫描
 * @returns {Array}
 */
export function getPageList() {
  const req = require.context('../', true, /\w+View\/index\.[a-z]+$/i);
  req.keys().forEach(item => {
    // const result = iteratee(req(modulePath), modulePath, index);
    // result && contents.push(result, modulePath);
    console.log('@Page1:', item);
    console.log('@Page2:', req(item));
    // console.log(req(item).navigation);
    // console.log(req(item).view);
  });
}

/*
 * Layout扫描
 * @returns {Array}
 */
export function getLayoutList() {
  const req = require.context('../', true, /\w+Router.js$/i);
  req.keys().forEach(item => {
    // const result = iteratee(req(modulePath), modulePath, index);
    // result && contents.push(result, modulePath);
    console.log('@Layout1:', item);
    const list = item.split('/');
    console.log('@Layout1:', list);
    console.log('@Layout1:', list[list.length - 1].replace('Router.js', ''));

    console.log('@Layout3:', req(item));
    console.log('@Layout3:', req(item).default);
    // console.log(req(item).navigation);
    // console.log(req(item).view);
  });
}
