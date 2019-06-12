const fs = require('fs');
const path = require('path');

/** resolve文件路径
 * */
function resolvePath(dir, ...rest) {
  return path.join(__dirname, '../', dir, ...rest);
}

exports.resolvePath = resolvePath;

/** 获取入口文件对象
 * [a, b, index]
 * */
function getEntryMap(fileList) {
  const entry = [];
  fileList.forEach((item) => {
    const name = item[0].split('.').slice(0, -1).join('.');
    entry.push(name);
  });
  return entry;
}

exports.getEntryMap = getEntryMap;

function getAllFile(path, list) {
  let files = [];
  if (fs.existsSync(path)) { // 是否存在此路径
    files = fs.readdirSync(path);
    files.forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) { // recurse 查看文件是否是文件夹
        getAllFile(curPath);
      } else if (file !== '.DS_Store') {
        list.push([file, path, curPath]);
      }
    });
  }
}

/** 递归遍历所有文件(输出格式)
 *  [
 [ 'a.js', './src/pages/', './src/pages/a.js' ],
 [ 'b.js', './src/pages/', './src/pages/b.js' ],
 [ 'index.js', './src/pages/', './src/pages/index.js' ],
 ]
 * */
function getAllFileList(path) {
  const AllFileList = [];
  getAllFile(path, AllFileList);
  return AllFileList;
}

exports.getAllFileList = getAllFileList;
