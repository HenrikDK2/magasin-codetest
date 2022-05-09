const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");

gulp.task("minifyJs", function () {
  return gulp.src("src/*.js").pipe(uglify()).pipe(gulp.dest("dist/"));
});

gulp.task("styles", function () {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("htmlMinify", function () {
  return gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("assets", function () {
  return gulp.src("./src/assets/**").pipe(gulp.dest("dist/assets/"));
});

gulp.task("build", gulp.series(["minifyJs", "styles", "htmlMinify", "assets"]));

gulp.task("start", function () {
  gulp.watch("./src/styles/*.scss", gulp.series("styles"));
  gulp.watch("./src/*.js", gulp.series("minifyJs"));
  gulp.watch("./src/*.html", gulp.series("htmlMinify"));
  gulp.watch("./src/assets/**", gulp.series("assets"));
});
