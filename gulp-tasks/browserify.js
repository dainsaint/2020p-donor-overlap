const browserify = require('browserify');
const source = require('vinyl-source-stream');
const stringify = require('stringify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

module.exports = (gulp, browserSync) => function browserifyTask(cb) {
  browserify({
    entries: ['app/js/main.js'],
  })
    .transform(stringify, {
      appliesTo: {
        includeExtensions: ['.html'],
      },
    })
    .on('error', (err) => {
      console.log(err);
    })
    .transform(babelify, {
      presets: ['env'],
    })
    .on('error', (err) => {
      console.log(err);
    })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest('.tmp/js'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
  cb();
};
