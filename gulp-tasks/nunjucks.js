const nunjucksRender = require('gulp-nunjucks-html');

module.exports = (gulp, browserSync) => function nunjucksRenderTask(cb) {
  gulp
    .src('app/**/*.html')

    .pipe(
      nunjucksRender({
        searchPaths: ['app/templates'],
      }),
    )
    .on('error', (err) => {
      console.log(err);
      // err is the error thrown by the Nunjucks compiler.
    })
    .pipe(gulp.dest('.tmp'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
  cb();
};
