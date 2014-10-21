describe('injector', function() {
  beforeEach(function() {
    delete window.angular;
    setupModuleLoader(window);
  });
  it('can be created', function() {
    var injector = createInjector([]);
    expect(injector).to.exist;
  });
  it('can register a constant', function () {
    var myModule = window.angular.module('app', []);
    myModule.constant('A', 1);
    var injector = createInjector(['app']);
    expect(injector.get('A')).to.exist;
    expect(injector.get('A')).to.equal(1);
  });
});