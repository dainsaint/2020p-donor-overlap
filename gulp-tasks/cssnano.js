const sass = require('gulp-sass');

module.exports = (gulp) => function sassTask(cb) {
  gulp
    .src(['./.tmp/css/styles.css']) // Gets all files ending with .scss in app/scss
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
  cb();
};
