require('dotenv').config();

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const svgmin = require('gulp-svgmin');
const browserSync = require('browser-sync').create();

const gulppath = require('./gulppath');

const isProductionEnviroment = process.env.NODE_ENV === 'production';

let tasksArr = [];
let taskObjectArr = Object.entries(gulppath.tasks);

for ( let key in taskObjectArr ) {
  if ( taskObjectArr[key][1] !== null ) {
    tasksArr.push(taskObjectArr[key][0]);
  }
}

const optionsSourcemaps = isProductionEnviroment ? { sourcemaps: true } : null;

function ltco_styles() {
  let { srcPath, destPath } = gulppath.tasks.ltco_styles;

  return gulp
    .src(srcPath)
    .pipe(sass({
      outputStyle: isProductionEnviroment ? 'compressed' : 'expanded' // expanded / nested / compact / compressed
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream())
}

gulp.task('ltco_styles', ltco_styles);

function ltco_scripts() {
  let { srcPath, destPath } = gulppath.tasks.ltco_scripts;

  return gulp
    .src(srcPath, optionsSourcemaps)
    .pipe(babel())
    .pipe(gulp.dest(destPath, optionsSourcemaps))
    .pipe(browserSync.stream())
}

gulp.task('ltco_scripts', ltco_scripts);

function ltco_scripts_plugins() {
  let { srcPath, destPath } = gulppath.tasks.ltco_scripts_plugins;

  return gulp
    .src(srcPath, optionsSourcemaps)
    .pipe(concat('plugins.min.js'))
    .pipe(gulp.dest(destPath, optionsSourcemaps))
    .pipe(browserSync.stream())
}

gulp.task('ltco_scripts_plugins', ltco_scripts_plugins);

function ltco_svgs() {
  let { srcPath, destPath } = gulppath.tasks.ltco_svgs;

  return gulp
    .src(srcPath)
    .pipe(svgmin())
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream())
}

gulp.task('ltco_svgs', ltco_svgs);

function ltco_html() {
  let { srcPath, destPath } = gulppath.tasks.ltco_html;

  return gulp
    .src(srcPath)
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream())
}

gulp.task('ltco_html', ltco_html);

function ltco_fonts() {
  let { srcPath, destPath } = gulppath.tasks.ltco_fonts;

  return gulp
    .src(srcPath)
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream())
}

gulp.task('ltco_fonts', ltco_fonts);

function browser() {
  let browserSyncOptions = gulppath.browserSync;

  const options = {
    server: {
      baseDir: './public',
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  };

  browserSync.init(browserSyncOptions || options);
}

gulp.task('browser-sync', browser);

function watchLT() {
  let watchPath = gulppath.watch;

  gulp.watch(watchPath.ltco_styles, ltco_styles);

  gulp.watch(watchPath.ltco_scripts, ltco_scripts);

  gulp.watch(watchPath.ltco_svgs, ltco_svgs);

  gulp.watch(watchPath.ltco_html, ltco_html);
}

gulp.task('watchLT', watchLT);

gulp.task(
  'server',
  gulp.series(
    gulp.parallel(tasksArr),
    gulp.parallel(
      'watchLT',
      'browser-sync'
    )
  )
);

gulp.task(
  'dev',
  gulp.series(
    gulp.parallel(tasksArr),
    gulp.parallel(
      'watchLT'
    )
  )
);

gulp.task( 'default', gulp.parallel(tasksArr) );
