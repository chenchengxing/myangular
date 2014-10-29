'use strict';
var expect = chai.expect;
describe('injector', function() {
  beforeEach(function() {
    delete window.angular;
    setupModuleLoader(window);
  });

  it('can be created', function() {
    var injector = createInjector([]);
    expect(injector).to.exist;
  });

  it('can register a constant', function() {
    var myModule = window.angular.module('app', []);
    myModule.constant('A', 1);
    var injector = createInjector(['app']);
    expect(injector.get('A')).to.exist;
    expect(injector.has('A')).to.equal(true);
    expect(injector.get('A')).to.equal(1);
  });

  it('can not register a constant named "hasOwnProperty"', function() {
    var app = angular.module('app', []);
    app.constant('hasOwnProperty', 1);
    expect(function() {
      createInjector(['app']);
    }).to.throw();
  })

  it('loads multiple modules', function() {
    var module1 = angular.module('myModule', []);
    var module2 = angular.module('myOtherModule', []);
    module1.constant('aConstant', 42);
    module2.constant('anotherConstant', 43);
    var injector = createInjector(['myModule', 'myOtherModule']);
    expect(injector.has('aConstant')).to.equal(true);
    expect(injector.has('anotherConstant')).to.equal(true);
  });

  it('loads otherModule', function() {
    var module1 = angular.module('module1', []);
    var module2 = angular.module('module2', ['module1']);
    module1.constant('aConstant', 42);
    module2.constant('anotherConstant', 43);
    var injector = createInjector(['module2']);
    expect(injector.has('aConstant')).to.equal(true);
    expect(injector.has('anotherConstant')).to.equal(true);
  });

  it('loads each module only once', function() {
    var module1 = angular.module('myModule', ['myOtherModule']);
    var module2 = angular.module('myOtherModule', ['myModule']);
    createInjector(['myModule']);
  });

  it('invokes an annotated function with dependency injection', function() {
    var module = angular.module('myModule', []);
    module.constant('a', 1);
    module.constant('b', 2);
    var injector = createInjector(['myModule']);
    var fn = function(one, two) {
      return one + two;
    };
    fn.$inject = ['a', 'b'];
    expect(injector.invoke(fn)).to.equal(3);
  });

  it('does not accept non-strings as injection tokens', function() {
    var module = angular.module('myModule', []);
    module.constant('a', 1);
    var injector = createInjector(['myModule']);
    var fn = function(one, two) {
      return one + two;
    };
    fn.$inject = ['a', 2];
    expect(function() {
      injector.invoke(fn);
    }).to.throw();
  });

  it('invokes a function with the given this context', function() {
    var module = angular.module('myModule', []);
    module.constant('a', 1);
    var injector = createInjector(['myModule']);
    var obj = {
      two: 2,
      fn: function(one) {
        return one + this.two;
      }
    };
    obj.fn.$inject = ['a'];
    expect(injector.invoke(obj.fn, obj)).to.equal(3);
  });

  it('overrides dependencies with locals when invoking', function() {
    var module = angular.module('myModule', []);
    module.constant('a', 1);
    module.constant('b', 2);
    var injector = createInjector(['myModule']);
    var fn = function(one, two) {
      return one + two;
    };
    fn.$inject = ['a', 'b'];
    expect(injector.invoke(fn, undefined, {
      b: 3
    })).to.equal(4);
  });

  it('inject annotate array', function () {
    var injector = createInjector([]);
    var fn = function (argument) {
      // body...
    };
    fn.$inject = ['a', 'b'];
    expect(injector.annotate(fn)).to.eql(['a', 'b']);
  });
  it('inject array fn annotation', function () {
    var injector = createInjector([]);
    var fn = ['a', 'b', function () {}];
    expect(injector.annotate(fn)).to.eql(['a', 'b']);
  });
  it('inject without annotation exitly', function () {
    var injector = createInjector([]);
    var fn = function () {};
    expect(injector.annotate(fn)).to.eql([]);
  });
  it('inject without annotation exitly', function () {
    var injector = createInjector([]);
    var fn = function (a, b) {};
    expect(injector.annotate(fn)).to.eql(['a', 'b']);
  });
  it('strip comment in fn annotation', function () {
    var injector = createInjector([]);
    var fn = function (a, /*b,*/ c) {};
    var fn2 = function (a, /*b,*/ c/*, d*/ ) {};
    expect(injector.annotate(fn)).to.eql(['a', 'c']);
    expect(injector.annotate(fn2)).to.eql(['a', 'c']);
  });
});