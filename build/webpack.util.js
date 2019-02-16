const path = require('path');

/** resolve文件路径
 * */
function resolvePath(dir) {
  return path.join(__dirname, '../', dir);
}

exports.resolvePath = resolvePath;
