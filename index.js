/*
 * gulp-frep
 * https://github.com/jonschlinkert/gulp-frep
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */


var Buffer = require('buffer').Buffer;
var es = require('event-stream');
var frep = require('frep');

module.exports = function (opts) {
  'use strict';

  opts = opts || {};
  opts.patterns = opts.patterns || [];

  return es.map(function (file, cb) {
    try {
      if (Array.isArray(opts)) {
        file.contents = new Buffer(frep.strWithArr(String(file.contents), opts));
      } else {
        file.contents = new Buffer(frep.strWithObj(String(file.contents), opts));
      }
    } catch (err) {
      console.warn('Error caught from frep: ' + err.message + '.');
    }
    cb(null, file);
  });
};
