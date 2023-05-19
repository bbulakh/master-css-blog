const { src, dest, task, series, watch } = require("gulp");
const exec = require("child_process").exec;
const htmlreplace = require("gulp-html-replace");
const csso = require("gulp-csso");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const md5File = require("md5-file");



/**
 * Task: Prettier
 */
task("pretty", function (cb) {
  const command = "npx prettier --write src/pages/*.html";
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/**
 * Task: Export images and pages to public
 */
task("build-pages", function () {
  return src("./src/pages/*.html").pipe(dest("./public/"));
});

task("build-js", function () {
  return src("src/assets/js/script.js").pipe(dest("./public/assets/dist/js/"));
});

/**
 * Task: Build images
 */
task("build-images", function () {
  return src("./src/assets/images/*.{png,svg,ico,jpg,jpeg}").pipe(
    dest("./public/assets/images/")
  );
});

/**
 * Task: Build favicons
 */
task("build-favicons", function () {
  return src("./*.{png,svg,webmanifest}").pipe(dest("public"));
});

/**
 * Task: Clean
 */
task("clean", function () {
  return src("./public/assets/dist/css/*.css").pipe(clean());
});

/**
 * Task: watch
 */
task("watch", function () {
  watch("./src/pages/*.html", series("build"));
});

/**
 * Task: Build
 */
task(
  "build",
  series(
    "clean",
    "build-pages",
    "build-images",
    "build-js"
  )
);

/**
 * Task: Default
 */
task("default", series("build"));
