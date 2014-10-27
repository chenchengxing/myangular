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
});