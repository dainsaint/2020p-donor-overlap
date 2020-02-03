const uglify = require('gulp-uglify');

module.exports = (gulp) => function uglifyTask(cb) {
  gulp
    .src('./.tmp/js/main.js')
    .pipe(
      uglify({
        mangle: false,
        compress: true,
      }),
    )
    .pipe(gulp.dest('dist/js'));
  cb();
};
