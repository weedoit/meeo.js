var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    paths;

gulp.task('compile', function() {
    var tsProject = ts.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js
        .pipe(concat('meeo.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
    return gulp.src('dist/meeo.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('meeo.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    watch(['src/**/*.ts'], function () {
        gulp.start('compile');
    });

    watch(['dist/meeo.js'], function () {
        gulp.start('uglify');
    });
});

gulp.task('default', ['compile', 'watch']);
