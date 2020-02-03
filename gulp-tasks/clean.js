const del = require('del');

module.exports = () => function cleanTask(cb) {
  del.sync('dist');
  cb();
};
