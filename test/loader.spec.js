/* jshint globalstrict: true */
/* global setupModuleLoader: false */
'use strict';
var expect = require('chai').expect;
var setupModuleLoader = require('../src/loader');
var window = {};

describe('setupModuleLoader', function() {
  it('exposes angular on the window', function() {
    setupModuleLoader(window);
    expect(window.angular).to.exist;
  });
});