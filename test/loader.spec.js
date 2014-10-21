
'use strict';
var expect = chai.expect;

beforeEach(function () {
  delete window.angular;
});

describe('setupModuleLoader', function() {
  it('exposes angular on the window', function() {
    setupModuleLoader(window);
    expect(window.angular).to.exist;
  });
  it('creates angular just once', function() {
    setupModuleLoader(window);
    var ng = window.angular;
    setupModuleLoader(window);
    expect(window.angular).to.equal(ng);
  });
  it('exposes angular module', function () {
    setupModuleLoader(window);
    expect(window.angular.module).to.exist;
  });

  describe('modules', function() {

    beforeEach(function() {
      setupModuleLoader(window);
    });

    it('allows registering a module', function () {
      var module = window.angular.module('app', []);
      expect(module).to.exist;
      expect(module.name).to.equal('app');
    });

    it('replaces a module when registered with same name again', function() {
      var myModule = window.angular.module('myModule', []);
      var myNewModule = window.angular.module('myModule', []);
      expect(myNewModule).to.not.equal(myModule);
    });

    it('attaches the requires array to the registered module', function() {
      var requires = ['myOtherModule'];
      var myModule = window.angular.module('myModule', requires);
      expect(myModule.requires).to.equal(requires);
      // expect(myModule.requires == requires).to.be.true;
    });

    it('get a module if defined', function () {
      var myModule = window.angular.module('app', []);
      var get = window.angular.module('app');
      expect(get).to.exist;
      expect(get).to.equal(myModule);
      // var get2 = window.angular.module('appa');
      // console.log(get2);
      // expect(get2).to.not.exist;
    });

    it('throws when trying to get a nonexistent module', function() {
      expect(function() {
        window.angular.module('myModule');
      }).to.throw();
    });
    // it('d', function () {
    //   var myModule = window.angular.module('hasOwnProperty', []);
    //   window.angular.module('fdskjf');
    // })
    it('does not allow a module to be called hasOwnProperty', function() {
      expect(function() {
        window.angular.module('hasOwnProperty', []);
      }).to.throw();
    });
  });
});