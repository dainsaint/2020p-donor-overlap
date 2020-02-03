const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const inquirer = require('inquirer');

let versionNumber;

plugins.sass = require('gulp-sass');
plugins.gulpIf = require('gulp-if');
plugins.runSequence = require('run-sequence');
plugins.browserSync = require('browser-sync').create();
plugins.gutil = require('gulp-util');
plugins.inline = require('gulp-inline');
plugins.removeCode = require('gulp-remove-code');
plugins.htmlmin = require('gulp-htmlmin');

function getTask(task) {
  return require(`./gulp-tasks/${task}`)(gulp, plugins);
}

gulp.task('sass', getTask('sass'));
gulp.task('browserSync', getTask('browserSync'));
gulp.task('browserify', getTask('browserify'));
gulp.task('browserifyBuild', getTask('browserifybuild'));
gulp.task('clean', getTask('clean'));
gulp.task('nunjucks', getTask('nunjucks'));
gulp.task('nunjucks-build', getTask('nunjucks-build'));
gulp.task('useref', getTask('useref'));
gulp.task('useref-pym', getTask('useref-pym'));
gulp.task('useref-pym2', getTask('useref-pym2'));
gulp.task('indexcleanup', ['useref-pym', 'inline'], getTask('indexcleanup'));
gulp.task('sass-build', getTask('sass-build'));
gulp.task('inline', getTask('inline'));
gulp.task('inline-pym', getTask('inline-pym'));
gulp.task('pymtoolclean', ['useref-pym2', 'inline-pym'], getTask('pymtoolclean'));

gulp.task('inq', (done) => {
  const questions = [
    {
      type: 'input',
      name: 'version_number',
      message: 'What is the # file version?',
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    JSON.stringify(answers, null, '  ');
    versionNumber = answers.version_number;
    done();
  });
});

gulp.task('setName', () => {
  const config = require('./project.json');
  const settings = require('./package.json');
  let name;

  if (config.projectName) {
    name = config.projectName;
  } else {
    name = settings.name;
  }
  return gulp
    .src('./pymframe/index.html')
    .pipe(
      rename((path) => {
        path.basename = name;
        path.basename += `-${versionNumber}`;
        path.extname = '.html';
      }),
    )
    .pipe(gulp.dest('./pymframe'));
});

gulp.task('delIndex', () => del.sync('pymframe/index.html'));
gulp.task('rename', (callback) => {
  plugins.runSequence('setName', 'delIndex', callback);
});

// gulp.task('browserify', function() {
//     return browserify({'entries': ['app/js/main.js']}).transform(stringify, {
//         appliesTo: {
//             includeExtensions: ['.html']
//         }
//     }).transform(babelify, {presets: ["env"]}).bundle().pipe(source('main.js')).pipe(buffer()).pipe(gulp.dest('.tmp/js')).pipe(plugins.browserSync.reload({stream: true}))
// });

// gulp.task('browserifyBuild', function() {
//     return browserify({'entries': ['app/js/main.js']}).transform(stringify, {
//         appliesTo: {
//             includeExtensions: ['.html']
//         }
//     }).transform(babelify, {presets: ["env"]}).bundle().pipe(source('main.js')).pipe(buffer()).pipe(uglify({mangle: false, compress: false}).on('error', plugins.gutil.log)).pipe(gulp.dest('.tmp/js'))
// });

gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['nunjucks']);
  gulp.watch('app/js/**/*.js', ['browserify']);
  gulp.watch('app/js/**/*.html', ['browserify']);
  gulp.watch('app/js/**/*.json', ['browserify']);
});

gulp.task('default', (callback) => {
  plugins.runSequence(['sass', 'browserify', 'nunjucks', 'browserSync', 'watch'], callback);
});

gulp.task('build', (callback) => {
  plugins.runSequence(
    'clean',
    'browserifyBuild',
    ['sass-build', 'nunjucks-build'],
    'useref-pym',
    'inline-pym',
    'indexcleanup',
    'inq',
    'rename',
    callback,
  );
});

gulp.task('pymtool', (callback) => {
  plugins.runSequence(
    'clean',
    'browserifyBuild',
    ['sass-build', 'nunjucks-build'],
    'useref-pym2',
    'inline',
    'pymtoolclean',
    callback,
  );
});
