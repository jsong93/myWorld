const gulp = require('gulp'),
  uglify = require('gulp-uglify'), // 压缩文件
  rename = require('gulp-rename'), // 重命名
  jshint = require('gulp-jshint'),
  minifyHtml = require('gulp-minify-html'),
  miniHtml = require('gulp-htmlmin'),
  minifyCss = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  useref = require('gulp-useref'),
  csso = require('gulp-csso'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  filter = require('gulp-filter'),
  clean = require('gulp-clean'),
  fs = require('fs'),
  gulpIf = require('gulp-if'),
  gulpUtil = require('gulp-util'),
  babel = require('gulp-babel'),
  gulpZip = require('gulp-zip'),
  del = require('del'),
  $ = require('gulp-load-plugins')();
// gulp.task('js', function () {
//     return gulp.src('dist/js/*.js').pipe(uglify())
// })

// gulp.src('./node_modules/**/*.js').pipe(uglify()).pipe(gulp.dest('build'))

//js代码的处理
// gulp.task('vendor', function () {
//     return gulp.src('./node_modules/**')
//         .pipe(uglify())
//         .pipe(rename('index.min.js'))
//         .pipe(gulp.dest('build'))
// });
//js代码的处理
gulp.task('script', done => {
  gulp
    .src('./node_modules/jquery/dist/jquery.min.js')
    .pipe($.uglify())
    .pipe(rename('script.js'))
    .pipe(gulp.dest('build'));
  done();
});

// [20:08:56] The following tasks did not complete: default, script
// [20:08:56] Did you forget to signal async completion?
// gulp.task('css', function () {
//     gulp.src('')
// })

// gulp.task('html', function () {
//     gulp.src('./index.html')
//         .pipe(minifyHtml())
//         .pipe(gulp.dest('build'))
// })

gulp.task('html', done => {
  gulp
    .src('./index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('build'));
  done();
});

gulp.task('css', done => {
  gulp
    .src('./index.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('build'));
  done();
});

gulp.task('image', done => {
  gulp
    .src('./img/**')
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest('build/img'));
  done();
});

// hero
gulp.task('hero', done => {
  gulp.src('./resource/**').pipe(gulp.dest('build/resource'));
  done();
});

gulp.task('font', done => {
  // settimeout build 还没有删除玩就看是 build  会出问题
  setTimeout(() => {
    gulp.src('./css/font/**').pipe(gulp.dest('build/css/font'));
    done();
  }, 2000);
});

gulp.task('music', done => {
  gulp.src('./music/**').pipe(gulp.dest('build/music'));
  done();
});

const checkDir = path => {
  console.log(fs.existsSync(path));
  return fs.existsSync(path);
};

// gulp3 可以 gulp4 不可以
// gulp.task('default', ['script', 'html'], function () {
//     console.log('default')
// })
// gulp.task('default', gulp.series('script', 'html', 'image', done => done()))
gulp.task('clean', d => {
  if (checkDir('./build')) {
    del(['build']);
    // gulp.src('./build/').pipe(clean());
  }
  d();
});

// gulp.series 同步 gulp。parallel异步
gulp.task(
  'default',
  gulp.series('clean', 'font', gulp.parallel('image', 'hero'), done => {
    const jsFilter = filter('**/*.js', {
        restore: true
      }),
      cssFilter = filter('**/*.css', {
        restore: true
      }),
      // 第一个参数代表所有 第二个参数代表除了index.html
      indexHtmlFilter = filter(['**/*', '!index.html'], {
        restore: true
      });

    // pump

    gulp
      .src('index.html')
      .pipe($.useref()) /**找到注释 */
      .pipe(jsFilter) /**筛选js */
      .pipe(
        babel({
          presets: ['es2015'],
          compact: false
        })
      )
      .pipe(uglify()) /**压缩js */
      .on('error', err => {
        gulpUtil.log(gulpUtil.colors.red('Error'), err.toString());
      })
      .pipe(jsFilter.restore) /** 把js文件扔回流里 */
      .pipe(cssFilter)
      // .pipe(minifyCss())
      .pipe(csso())
      .pipe(cssFilter.restore)
      .pipe(indexHtmlFilter)
      .pipe(
        rev()
      ) /**前面的filter排除了index.html 然后再打版本号  gulp-rev 为静态文件随机添加hash值 */
      .pipe(indexHtmlFilter.restore)
      .pipe(revReplace()) /**更新index中的引用 */
      // .pipe(minifyHtml()) // 压缩后 js报错
      // .pipe(miniHtml({ removeComments: true }))
      .pipe(gulp.dest('build'));
    // gulp
    //   .src('build')
    //   .pipe(gulpZip('myWorld.zip'))
    //   .pipe(gulp.dest('build-zip'));
    done();
  })
);
