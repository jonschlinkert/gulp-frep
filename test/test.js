/*
 * gulp-frep
 * https://github.com/jonschlinkert/gulp-frep
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

/* globals describe, it */

'use strict';

// Node.js
var path = require('path');

// node_modules
var gulp = require('gulp');
var expect = require('chai').expect;
var es = require('event-stream');

// The module to test
var frep = require('../index.js');

// Tests
var findReplace = require('frep');
var read = function(src) {
  return require('fs').readFileSync(src, 'utf-8');
};

var opts = {
  patterns: [
    {
      pattern: /\bbanner\b/g,
      replacement: ''
    },
    {
      pattern: /\container\b/g,
      replacement: ''
    }
  ],
  patterns_as_object: {
    'banner': '',
    'container': ''
  },
  strip: [
    {
      pattern: /(<([^>]+)>)/ig,
      replacement: ''
    },
    {
      pattern: /(\r\n|\n){2,}/g,
      replacement: '\n'
    }
  ]
};

describe('find and replace HTML', function () {
  describe('gulp-frep', function () {

    it('should replace strings with replacement patterns', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(frep(opts.patterns))
        .pipe(es.map(function (file) {
          var expected = findReplace.strWithArr(read(filename), opts.patterns);
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
    it('should replace strings with object replacement patterns', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(frep(opts.patterns_as_object))
        .pipe(es.map(function (file) {
          var expected = findReplace.strWithObj(read(filename), opts.patterns_as_object);
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
    it('should strip HTML tags from HTML and normalize newlines', function (done) {
      var filename = path.join(__dirname, './fixtures/index.html');
      gulp.src(filename)
        .pipe(frep(opts.strip))
        .pipe(es.map(function (file) {
          var expected = findReplace.strWithArr(read(filename), opts.strip);
          expect(String(file.contents)).to.equal(expected);
          done();
        }));
    });
  });
});