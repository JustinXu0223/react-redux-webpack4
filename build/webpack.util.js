/* eslint import/no-extraneous-dependencies: 0 */
const fs = require('fs');
const path = require('path');

// resolve文件路径
function resolvePath(dir, ...rest) {
  return path.join(__dirname, '../', dir, ...rest);
}

exports.resolvePath = resolvePath;

const entryPrefix = 'entry_';

// 获取入口文件对象 [{ name: '文件名', currPath: '当前路径' }]
function getEntryMap(fileList) {
  const entry = [];
  fileList
    .filter(item => {
      // 标识入口文件必须在pages文件，并且在索引文件夹第一层, 并且以entry_开头，并截取_后的文件名
      const { fileName, level } = item;
      return fileName.endsWith('.js') && Number(level) === 1 && fileName.startsWith(entryPrefix);
    })
    .forEach(item => {
      const name = item.fileName
        .slice(entryPrefix.length)
        .split('.')
        .slice(0, -1)
        .join('');
      entry.push({ name, currPath: item.currPath });
    });
  return entry;
}

exports.getEntryMap = getEntryMap;

function getAllFile(p, list, level) {
  let files = [];
  if (fs.existsSync(p)) {
    // 是否存在此路径  && file.endsWith('.js')
    files = fs.readdirSync(p);
    files.forEach(file => {
      const currPath = `${p}/${file}`;
      if (fs.statSync(currPath).isDirectory()) {
        // recurse 查看文件是否是文件夹
        getAllFile(currPath, list, level + 1);
      } else if (file !== '.DS_Store') {
        list.push({
          fileName: file,
          parentPath: p,
          currPath,
          level,
        });
      }
    });
  }
}

// 递归遍历所有文件(输出格式) [[ 'a.js', './src/pages/', './src/pages/a.js' ],[ 'b.js', './src/pages/', './src/pages/b.js' ]],
function getAllFileList(p) {
  const AllFileList = [];
  const level = 0;
  getAllFile(p, AllFileList, level);
  return AllFileList;
}

exports.getAllFileList = getAllFileList;
