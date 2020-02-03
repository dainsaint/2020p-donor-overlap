const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const del = require('del');
const config = require('./project.json');
const settings = require('./package.json');

function getTask(task) {
  return require(`./gulp-tasks/${task}`)(gulp, browserSync);
}

const sass = getTask('sass');
const cssnano = getTask('cssnano');
const browserSyncing = getTask('browserSync');
const clean = getTask('clean');
const nunjucks = getTask('nunjucks');
const browserify = getTask('browserify');
const uglify = getTask('uglify');
const minifyHTML = getTask('minifyhtml');

function watcher(cb) {
  gulp.watch('app/scss/**/*.scss', sass);
  gulp.watch('app/**/*.html', nunjucks);
  gulp.watch('app/js/**/*.+(js|html)', browserify);
  cb();
}

const setName = (cb) => {
  let name;
  if (config.projectName) {
    name = config.projectName;
  } else {
    name = settings.name;
  }
  return gulp
    .src('./dist/index.html')
    .pipe(
      rename((path) => {
        path.basename = name;
        path.extname = '.html';
      }),
    )
    .pipe(gulp.dest('./dist'));
  cb();
};

const delIndex = (cb) => del.sync('dist/index.html');

exports.rename = gulp.series(setName);

exports.default = gulp.series(gulp.parallel(sass, browserify, nunjucks), browserSyncing, watcher);

exports.build = gulp.series(clean, minifyHTML, cssnano, uglify);
