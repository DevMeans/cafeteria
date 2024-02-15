const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const sourcemaps = require("gulp-sourcemaps");
const cssnano= require('cssnano')

const imagenmin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
function css(done) {
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  done();
}
function imagenes() {
  return src("src/img/**/*")
    .pipe(imagenmin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
}
function imageneswebp() {
  return src("src/img/**/*.{png,jpg}").pipe(webp()).pipe(dest("build/img"));
}
function imagenesavif() {
  const opciones = {
    quality: 50,
    lossless: false,
    speed: 0,
    chromaSubsampling: "4:2:0",
  };

  return src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
}
function dev() {
  /* watch("src/scss/header/_header.scss");*/
  watch("src/scss/**/*.scss");
  watch("src/scss/app.scss", css);
}
exports.css = css;
exports.dev = dev;
exports.imageneswebp = imageneswebp;
exports.imagenesavif = imagenesavif;
exports.imagenes = imagenes;
exports.default = series(css, dev);
exports.build = series(css, imagenes, webpImages, avifImages);