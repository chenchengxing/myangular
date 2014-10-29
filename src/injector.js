'use strict';

function createInjector(modulesToLoad) {
  var services = {};
  var modulesLoaded = {};
  var provider = {
    constant: function (key, value) {
      if (key === 'hasOwnProperty') {
        throw 'can not register a constant named \'hasOwnProperty\'';
      }
      services[key] = value;
    }
  };
  loadModules(modulesToLoad);
  function loadModules(modules) {
    for (var i = 0; i < modules.length; i++) {
      var module = angular.module(modules[i]);
      if (modulesLoaded.hasOwnProperty(module.name)) {
        return false;
      } else {
        modulesLoaded[module.name] = true;
      }
      loadModules(module.requires);
      for (var j = 0; j < module._invokeList.length; j++) {
        var invokeItem = module._invokeList[j];
        provider[invokeItem[0]](invokeItem[1], invokeItem[2]);
      }
    }
    // body...
  }
  return {
    get: function (name) {
      return services[name];
    },
    has: function (name) {
      return services.hasOwnProperty(name);
    },
    invoke: function (fn, self, locals) {
      var args = fn.$inject;
      for (var i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'string') {
          throw 'not string in annotation';
        }
        args[i] = locals && locals[args[i]] ? locals[args[i]] : this.get(args[i]);
      }
      return fn.apply(self, args);
    },
    annotate: function (fn) {
      if (typeof fn === 'function') {
        if (fn.$inject) {
          return fn.$inject;
        }
        var argumentStr = fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/)[1];
        if (argumentStr) {
          argumentStr = argumentStr.replace(/\/\*[^\*]*?\*\//g, '');
          var arr = argumentStr.split(',');
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].match(/\s*(\S+)\s*/)[1];
          }
          return arr;
        }
        return [];
      }
      return fn.slice(0, fn.length - 1);
    }
  };
}
