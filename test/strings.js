'use strict';

var path = require('path');
var gulp = require('gulp');
var expect = require('chai').expect;
var es = require('event-stream');
var frep = require('../index.js');

var findReplace = require('frep');
var read = function(src) {
  return require('fs').readFileSync(src, 'utf-8');
};

var patterns = {
  array_like: [
    {
      pattern: '[a+]',
      replacement: ''
    }
  ],
  object_like: {
    pattern: '[a+]',
    replacement: ''
  }
};

describe('when a string is passed as pattern', function () {
  describe('gulp-frep', function () {
    it('should work as string and not as regexp', function (done) {
      var filename = path.join(__dirname, './fixtures/strings.txt');
      gulp.src(filename)
        .pipe(frep(patterns.array_like))
        .pipe(es.map(function (file) {
          // findReplace is commented because it returns the same result as frep: []b
          var expected = 'ab';//findReplace.strWithArr(read(filename), patterns.array_like);
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
    it('should work as string and not as regexp', function (done) {
      var filename = path.join(__dirname, './fixtures/strings.txt');
      gulp.src(filename)
        .pipe(frep(patterns.object_like))
        .pipe(es.map(function (file) {
          // findReplace is commented because it returns the same result as frep: []b
          var expected = 'ab';//findReplace.strWithObj(read(filename), patterns.object_like);
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
  });
});
