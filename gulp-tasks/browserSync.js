module.exports = (gulp, browserSync) => function browserSyncTask(cb) {
  browserSync.init({
    open: false,
    ghostMode: false,
    server: {
      baseDir: '.tmp',
    },
  });
  cb();
};
