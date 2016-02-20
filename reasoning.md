# The reasons behind the choices in Angular AppKit

## Directory structure

* /src /dist split                    : From the top level everything is seperated into source code and distribution code
* /src split into /app /assets        : Seperates JS source code from static files (styles, images, etc)
* /app split into /common /components : Modular structure which is great for building scalable and maintainable apps as [outlined here](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)

## Angular app files

* app.module.js : One place to see all the directive declarations, easy to find and manage
* app.routes.js : One place to see all the angular routing, easy to find and manage

## Gulp

* gulp vs. grunt     : Gulp is faster, tider, better for JS projects, see more in [this article](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4#.eagrxmnu8)
* gulp build task    : Keep the build task seperate from others, allows it to be used in a modular fashion
* gulp release tasks : Allows easy, seperate major, minor, patch and dev releases
* gulp code checks   : Using eslint and scss-lint to check code is kept at a high quality

## Included libraries

* angular          : It's an angular appkit, so you kinda need this one
* angular-material : Great support for flex layouts, good for wireframing, makes sense in an angular application
* angular-aria     : Accessibility is very important, every good application should use this where they can to increase accessibilty, comes with material
* angular-animate  : Required by angular-material for animating the buttons, sliders, etc
* font-awesome     : Great library of font icons, free, well known, easy to use

## Coding standards

* es-lint                 : This is the most modern and most flexible choice for JS linting
* scss-lint               : Good compatibilty with gulp, easier to configure than other options
* double vs. single quote : Double quote are generally easier to use, see [more here](https://www.quora.com/Should-I-use-single-quotes-or-double-quotes-for-JavaScript-strings)