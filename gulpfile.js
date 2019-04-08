const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
// jshint = require('gulp-jshint')
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
gulp.task('script', function () {
    return gulp.src('./app.js')
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('build'))
});

// gulp.task('default', function (done) {
//     done()
// })