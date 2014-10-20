/* jshint globalstrict: true */
'use strict';

function setupModuleLoader(window) {
  var angular = ensure(window, 'angular', Object);
  angular.module = ensure(angular, 'module', function () {
    return function (name, dependencies) {
      var modules = {};
      if (!modules[name]) {
        modules[name] = {
          name: name,
          requires: dependencies
        };
      }
      return modules[name];
    };
  });
  function ensure (obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  }
}

module.exports = setupModuleLoader;