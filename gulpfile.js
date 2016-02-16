var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var styleguide = require('sc5-styleguide');
var del = require('del');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var image = require('gulp-image');

    // files
    var tempFolderAssets = 'temp/assets';
    var outputPath = 'temp/styleguide';
    var buildPath = 'build/assets';

// Browser definitions for autoprefixer
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Static Server + watching scss/html files
gulp.task('serve', ['clean', 'compile-css', 'compile-html', 'compile-javascript', 'move-images',], function() {

    browserSync.init({
        server: "./temp"
    });

    gulp.watch("src/scss/**/*.scss", ['compile-css']);
    gulp.watch("src/**/*.html", ['compile-html']);
    gulp.watch("src/svg/**/*.svg", ['compile-html']);
    gulp.watch("src/js/**/*.js", ['compile-javascript']);
    gulp.watch("src/img/**/*", ['move-images']);
});

// Compile CSS
gulp.task('compile-css', function() {

    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
          style: 'expanded',
        }).on('error', notify.onError(function (error) {
          return "Problem file : " + error.message;
        })))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(tempFolderAssets + '/css'))
        .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('build-css', function() {

    return gulp.src('src/scss/main.scss')
        .pipe(sass({
          style: 'compressed',
        }).on('error', notify.onError(function (error) {
          return "Problem file : " + error.message;
        })))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(buildPath + '/css'))
        .pipe(notify({
          title: 'Gulp',
          subtitle: 'success',
          message: 'Sass task',
          sound: "Pop"
        }));
});

// Move HTML
gulp.task('compile-html', function() {

    var svgs = gulp.src('src/svg/*.svg')
        .pipe(rename({prefix: 'icn-'}))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    gulp.src('src/*.html')
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest('temp'))
      .pipe(browserSync.stream());
});

// Build HTML
gulp.task('build-html', function() {

    var svgs = gulp.src('src/svg/*.svg')
        .pipe(rename({prefix: 'icn-'}))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    gulp.src('src/*.html')
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest('build'));
});

// Compile Development JavaScript
gulp.task('compile-javascript', function() {

    gulp.src(['src/js/libs/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(tempFolderAssets +'/js'))
        .pipe(browserSync.stream());


    gulp.src(['src/js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(tempFolderAssets +'/js'))
        .pipe(browserSync.stream());
});

// Build JS
gulp.task('build-javascript', function() {

    gulp.src(['src/js/libs/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath +'/js'));

    gulp.src(['src/js/main.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath +'/js'));
});

// Move Images
gulp.task('move-images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest(tempFolderAssets + '/img'));
});

// Compress Images
gulp.task('build-images', function() {
  return gulp.src('src/img/**/*')
    .pipe(image({svgo: false}))
    .pipe(gulp.dest(buildPath + '/img'));
});

// Move CNAME to Build
gulp.task('build-cname', function() {
  return gulp.src('CNAME')
    .pipe(gulp.dest('build'));
});

// Move favicon to Build
gulp.task('build-favicon', function() {
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('build'));
});

// Move icons to Build
gulp.task('build-icons', function() {
  return gulp.src('src/*.png')
    .pipe(image())
    .pipe(gulp.dest('build'));
});


// Clean up Temp
gulp.task('clean', function () {
  return del.sync([
    './temp/**'
  ]);
});

// Clean up Temp
gulp.task('clean-build', function () {
  return del.sync([
    './build/**'
  ]);
});

// styleguide

gulp.task('styleguide:generate', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        port: 5000,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('default', ['styleguide', 'serve'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['src/scss/**/*.scss'], ['styleguide']);
});

// Styleguide
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Default task
gulp.task('watch', ['serve']);

// Build Production
gulp.task('build', ['clean-build', 'build-css', 'build-html', 'build-javascript', 'build-images', 'build-favicon', 'build-icons', 'build-cname']);
