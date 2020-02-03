const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

module.exports = (gulp, browserSync) => function sassTask(cb) {
  gulp
    .src(['app/scss/styles.scss']) // Gets all files ending with .scss in app/scss
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
  cb();
};
