const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
function css(done) {
  src("src/scss/app.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));
  done();
}
function dev() {
  /* watch("src/scss/header/_header.scss");*/
  watch("src/scss/**/*.scss");
  watch("src/scss/app.scss", css);
}
exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);
