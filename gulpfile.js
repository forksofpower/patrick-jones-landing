'use strict';

var gulp          = require('gulp')
  , sass          = require('gulp-sass')
  , babel         = require('gulp-babel')
  , jshint        = require('gulp-jshint')
  , uglify        = require('gulp-uglify')
  , browserSync   = require('browser-sync')
  , nodemon       = require('gulp-nodemon')
  , path          = require('path');

var env     = '';

// Set Development environment
gulp.task('env:dev', function() {
  env = 'development';
  process.env.NODE_ENV = env;
});

// Set Production environment
gulp.task('env:prod', function() {
  env = 'production';
  process.env.NODE_ENV = env;
});

// Process ES6 to Javascript
gulp.task('babel', function() {
  gulp.src('./dist/client/js/**/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      // .pipe(uglify())
      .pipe(gulp.dest('./app/assets/js/'));
  gulp.src('./dist/server/**/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('./app/'));
});

// Process SASS
gulp.task('sass', function() {
  var option = {};
  if (env === 'production') { option = {outputStyle: 'compressed'} };
  gulp.src('./dist/client/scss/**/*.scss')
      // .pipe(sass().on('error', sass.logError))
      .pipe(sass(option).on('error', sass.logError))
      .pipe(gulp.dest('./app/assets/css/'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src('./assets/js/')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch JS
gulp.task('watch', function() {
  gulp.watch('dist/client/scss/**/*.scss', ['sass'], function() {
    console.log('Updating client styles!');
  });
  gulp.watch('dist/client/**/*.js', ['babel','jshint'], function() {
    console.log('Updating client scripts!');
  });
  gulp.watch('dist/server/**/*.js', ['babel','jshint'], function() {
    console.log('Updating server scripts!');
  });
});

// browserSync
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:3003',
    files: [
      'app/assets/**/*.*',
      'app/views/**/*.*',
      'app/data/**/*.*',
    ],
    port: 1337
  });
})
// nodemon
gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
            script: './app/app.js'
  }).on('start', function() {
    // Avoid nodemon starting multiple times
    if(!started) {
      cb();
      started = true;
    }
  });
});

// Build
gulp.task('build', ['sass', 'babel', 'jshint']);

// Run by default
gulp.task('default',['env:dev', 'build', 'watch', 'browser-sync']);

// Run production
gulp.task('prod', ['env:prod', 'build', 'nodemon']);
