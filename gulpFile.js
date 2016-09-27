/**
 * Created by Mtui on 9/26/16.
 */
var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var typescript = require("gulp-typescript");
var ts = typescript;
var systemjsBuilder = require("systemjs-builder");
var uglify = require('uglifyjs');

gulp.task('compile:ts', function() {
    return gulp.src([
        "./app/**/*.ts",
        "typings/*.d.ts"
    ])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            "module": "system",
            "moduleResolution": "node",
            "outDir": "dist",
            "target": "es2015"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("app"))
});

gulp.task("bundle:app", function() {
    var builder = new systemjsBuilder(".", "./system.config.js");
    return builder.buildStatic("app", "app/app.js");
});

gulp.task("bundle:vendor", function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system.src.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("vendor"))
});

gulp.task("copy:vendor", function() {
    gulp.src([
        "node_modules/rxjs/**/*"
    ])
        .pipe(gulp.dest("public/lib/js/rxjs"));

    gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
        .pipe(gulp.dest('public/lib/js/angular2-in-memory-web-api'));

    return gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('public/lib/js/@angular'));
});


gulp.task('vendor', ['bundle:vendor', 'copy:vendor']);
gulp.task('app', ['compile:ts', 'bundle:app']);


// Bundle dependencies and app into one file (app.bundle.js)
gulp.task('bundle', ['vendor', 'app'], function () {
    return gulp.src([
        'app/app.js',
        'vendor/vendor.js'
    ])
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest('./app'));
});

var tsProject = typescript.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: 'app.js'
});

gulp.task('tscompile', function () {
    var tsResult = gulp.src('./app/**/*.ts')
        .pipe(typescript(tsProject));

    return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('app-bundle', function () {
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: require('typescript'),
        outFile: 'app.js'
    });

    var tsResult = gulp.src('app/**/*.ts')
        .pipe(ts(tsProject));

    return tsResult.js.pipe(concat('app.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-bundle', function() {
    gulp.src([
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js"
    ])
        .pipe(concat('vendors.min.js'))

        .pipe(gulp.dest('./dist'));
});

gulp.task('boot-bundle', function() {
    gulp.src('config.prod.js')
        .pipe(concat('boot.min.js'))

        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'vendor': 'vendors.min.js',
            'app': 'app.min.js',
            'boot': 'boot.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["bundle"]);