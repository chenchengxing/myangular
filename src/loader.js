/* jshint globalstrict: true */
'use strict';

function setupModuleLoader(window) {
  var angular = ensure(window, 'angular', Object);
  angular.module = ensure(angular, 'module', function () {
    var modules = {};

    function getModule (name) {
      if (!modules.hasOwnProperty(name)) {
        throw 'Module '+name+' is not available!';
      }
      return modules[name];
    }

    function setModule (name, dependencies) {
      if (name === 'hasOwnProperty') {
        throw 'can not set a module with name hasOwnProperty';
      }
      var moduleInstance = modules[name] = {
        _invokeList: [],
        name: name,
        requires: dependencies,
        constant: function (name, value) {
          moduleInstance._invokeList.push(['constant', name, value]);
          return moduleInstance;
        }
      };
      return moduleInstance;
    }
    // function invokeLater (type) {
    //   return function (name, value) {
    //     provider[type].call(null, name, value);
    //   };
    // }
    return function (name, dependencies) {
      if (!dependencies) {
        return getModule(name);
      } else {
        return setModule(name, dependencies);
      }
    };
  });
  function ensure (obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  }
}

