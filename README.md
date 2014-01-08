# gulp-frep (find and replace) [![NPM version](https://badge.fury.io/js/gulp-frep.png)](http://badge.fury.io/js/gulp-frep)

> A find and replace utility, using [Frep](https://github.com/jonschlinkert/frep). Replace strings or arrays of strings with an array of replacement patterns.

## Getting Started
Install the module with: `npm install gulp-frep`

## Usage

```js
var gulp = require('gulp');
var frep = require('gulp-frep');

gulp.task('frep', function() {
  gulp.src('./src/foo.html')
    .pipe(frep(patterns))
    .pipe(gulp.folder('./dist/foo.html'))
});
```
### Example replacement patterns

```js
var patterns: [
  {
    // Strip tags from HTML
    pattern: /(<([^>]+)>)/ig,
    replacement: ''
  },
  {
    // Normalize and condense newlines
    pattern: /(\r\n|\n){2,}/g,
    replacement: '\n'
  }
];
```

See the [frep docs](https://github.com/jonschlinkert/frep) for options.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Author

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert
Licensed under the MIT license.