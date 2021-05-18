const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// Webpack
const webPack = () => {
  return gulp.src('./source/js/main.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('build/js'));
}

exports.webPack = webPack;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true,
      conservativeCollapse: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// Sprite

const sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/ico/*.ico",
    "source/img/**/*.{jpg,png,svg}",
    "source/video/*",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(webPack));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    webPack,
    sprite,
    copy,
    images,
  ));

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    webPack,
    sprite,
    copy,
  ),
  gulp.series(
    server,
    watcher
  ));