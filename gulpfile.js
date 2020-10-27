//подключение gulp
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    uglif = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    cleanCSS =require('gulp-clean-css'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch');

const style = [
      './src/source/style.scss',
      './src/source/*.scss'

  ]   
  
  const jsFile = [
    './src/js/main.js'
]  
const imgFile = [
  './src/img/**/*.*'
]
function image() {
  return gulp.src(imgFile)
  .pipe(imagemin({ 
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    interlaced: true
  }))
  .pipe(gulp.dest('./build/img'))
  .pipe(browserSync.stream())
}
  function Style() {
      return gulp.src(style)
      .pipe(concat('style.scss'))
      .pipe(autoprefixer({
        Browserslist: [' last 2 versions'],
        cascade: false
        }))
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({level: 2}))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream())
    }
  function scrip() {
    return gulp.src(jsFile)
    .pipe(concat('main.js'))
    .pipe(uglif())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
}
function cleam() {
    return del(['build/*'])
}
function Watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/source/**/*.scss', Style)
    gulp.watch('./src/js/**/*.js', scrip)
    gulp.watch("./*.html").on('change', browserSync.reload);
}
  gulp.task('styles', Style);
  gulp.task('scripts', scrip);
  gulp.task('images', image);
  gulp.task('watch', Watch);

  gulp.task('build', gulp.series(cleam, gulp.parallel(Style, scrip, image)));
  gulp.task('dev', gulp.series('build', 'watch'));