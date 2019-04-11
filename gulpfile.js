const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    $ = require('gulp-load-plugins')
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
    gulp.src('./app.js')
        .pipe(uglify())
        .pipe(rename('script.js'))
        .pipe(gulp.dest('build'))
    done()
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
    gulp.src('./index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('build'))
    done()
})

gulp.task('css', done => {
    gulp.src('./index.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('build'))
    done()
})


gulp.task('image', done => {
    gulp.src('./img/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build/image'))
    done()
})

// gulp3 可以 gulp4 不可以
// gulp.task('default', ['script', 'html'], function () {
//     console.log('default')
// })

// gulp.task('default', gulp.series('script', 'html', 'image', done => done()))




// gulp.task('default', done => {
//     const jsFilter = filter('**/*.js', {
//             restore: true
//         }),
//         cssFilter = filter('**/*.css', {
//             restore: true
//         }),
//         indexHtmlFilter = filter(['**/*', '!index.html'], {
//             restore: ture
//         })


//     gulp.src('index.html')
//         .pipe(useref())


// })