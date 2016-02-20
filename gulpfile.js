// ---------- Plugins ----------

var gulp = require("gulp"),
    clean = require("gulp-clean"),
    zip = require("gulp-zip"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    htmlreplace = require("gulp-html-replace"),
    eslint = require("gulp-eslint"),
    scsslint = require("gulp-scss-lint"),
    bump = require("gulp-bump");

// ---------- Tidy up tasks ----------

// Clean /dist and remove everything
gulp.task("clean", function () {
  return gulp.src("dist/*", {read:false})
    .pipe(clean({
        force : true
    }));
});

// Check the JS code against ESLint standards
gulp.task("eslint", function() {
  return gulp.src("src/app/**/*.js").pipe(eslint({
    extends: "eslint:recommended",
    rules:{
        "quotes" : [1, "double"],
        "semi"   : [1, "always"]
    },
    globals: {
        "angular" : true,
        "appkit"  : true
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError()); // Fail task on lint errors
});

// Check the SCSS code against scss-lint standards
gulp.task("scsslint", function() {
  return gulp.src("src/assets/styles/*.scss")
    .pipe(scsslint())
    .pipe(scsslint.failReporter()); // Report failures in the console
});

// ---------- Code tasks ----------

// Build an artefact and zip everything up
gulp.task("build", ["scripts", "bower_components", "styles", "html", "images", "index", "misc"], function() {
  return gulp.src("dist/*")
    .pipe(zip("appkit.zip"))
    .pipe(gulp.dest("dist"));
});

// Combine all the src JS, minify and then uglify it
gulp.task("scripts", function() {
  return gulp.src("src/app/**/*.js")
    .pipe(concat("app.js"))
    .pipe(gulp.dest("dist"))
    .pipe(rename("app.min.js"))
    //.pipe(uglify()) // Causes problems loading bower.json
    .pipe(gulp.dest("dist"));
});

// Convert the sass into css, combine into one file, minify it
gulp.task("styles", function() {
  return gulp.src("src/assets/styles/*.scss")
    .pipe(sass().on("error", sass.logError)) // Log sass errors
    .pipe(concat("app.min.css"))
    .pipe(cssnano())
    .pipe(gulp.dest("dist"));
});

// Move all the html into /dist
gulp.task("html", function() {
  return gulp.src("src/app/**/*.html")
    .pipe(gulp.dest("dist/src/app"));
});

// Move the images into /dist
gulp.task("images", function() {
  return gulp.src("src/assets/img/**/*")
    .pipe(gulp.dest("dist/assets/img"));
});

// Move index.html into /dist and replace the filepaths as required
gulp.task("index", function() {
  return gulp.src("index.html")
    .pipe(htmlreplace({
        "css" : "app.min.css",
        "js"  : "app.min.js"
    }))
    .pipe(gulp.dest("dist"));
});

// Copy all the required bower dependencies into /dist
gulp.task("bower_components", function() {
  return gulp.src(["bower_components/angular/angular.min.js",
                   "bower_components/angular-animate/angular-animate.min.js",
                   "bower_components/angular-aria/angular-aria.min.js",
                   "bower_components/angular-material/angular-material.min.js",
                   "bower_components/angular-route/angular-route.min.js",
                   "bower_components/angular-material/angular-material.min.css",
                   "bower_components/font-awesome/**"],
                   {base : "bower_components/"})
    .pipe(gulp.dest("dist/bower_components"));
});

// Move other misc files into /dist
gulp.task("misc", function() {
  return gulp.src(["bower.json", "package.json", "README.md"])
    .pipe(gulp.dest("dist/"));
});

// ---------- Bump version number tasks ----------

// Pre-release update for bower and npm versions
gulp.task("bump-prerelease", function() {
  gulp.src(["./bower.json", "./package.json"])
  .pipe(bump({
        type  : "prerelease",
        preid : "SNAPSHOT"
    }))
  .pipe(gulp.dest("./"));
});

// Patch update for bower and npm versions
gulp.task("bump-patch", function() {
  gulp.src(["./bower.json", "./package.json"])
  .pipe(bump({
        type : "patch"
    }))
  .pipe(gulp.dest("./"));
});

// Minor update for bower and npm versions
gulp.task("bump-minor", function() {
  gulp.src(["./bower.json", "./package.json"])
  .pipe(bump({
        type : "minor"
    }))
  .pipe(gulp.dest("./"));
});

// Major update for bower and npm versions
gulp.task("bump-major", function() {
  gulp.src(["./bower.json", "./package.json"])
  .pipe(bump({
        type : "major"
    }))
  .pipe(gulp.dest("./"));
});

// ---------- Other tasks ----------

// Checks the .js and .scss files against coding standards
gulp.task("code-check", ["eslint", "scsslint"]);

// ---------- Release tasks ----------

// Check code standards, update the version numbers as
// needed then create the release artefact
gulp.task("dev-release",   ["code-check", "bump-prerelease", "build"]);
gulp.task("patch-release", ["code-check", "bump-patch", "build"]);
gulp.task("minor-release", ["code-check", "bump-minor", "build"]);
gulp.task("major-release", ["code-check", "bump-major", "build"]);