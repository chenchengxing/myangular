'use strict';

function createInjector(modulesToLoad) {
  var services = {};
  var provider = {
    constant: function (key, value) {
      if (key === 'hasOwnProperty') {
        throw 'can not register a constant named \'hasOwnProperty\'';
      }
      services[key] = value;
    }
  };
  for (var i = 0; i < modulesToLoad.length; i++) {
    var module = angular.module(modulesToLoad[i]);
    for (var j = 0; j < module._invokeList.length; j++) {
      var invokeItem = module._invokeList[j];
      provider[invokeItem[0]](invokeItem[1], invokeItem[2]);
    }
  }
  return {
    get: function (name) {
      return services[name];
    },
    has: function (name) {
      return services.hasOwnProperty(name);
    }
  };
}
