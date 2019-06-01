var gulp = require('gulp'),
browserSync  = require('browser-sync'),
reload       = browserSync.reload;
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
//编译es6
gulp.task('babel', () => {
  console.log(11)
  return gulp.src(['src/*.js'])
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}));
});
gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: "./"
      }
  });
});
// 使用 gulp.task('default') 定义默认任务
gulp.task('default', [ 'babel', 'browser-sync'], function (){
  gulp.watch(['src/*.js'], ['babel']);
})