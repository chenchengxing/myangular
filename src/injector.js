'use strict';

function createInjector(modulesToLoad) {
  var services = {};
  var provider = {
    constant: function (value) {
      return function () {
        return value;
      };
    }
  };
  for (var i = 0; i < modulesToLoad.length; i++) {
    var module = angular.module(modulesToLoad[i]);
    for (var j = 0; j < module._invokeList.length; j++) {
      var invokeItem = module._invokeList[j];
      services[invokeItem[1]] = provider[invokeItem[0]](invokeItem[2]);
    }
  }
  return {
    get: function (name) {
      return services[name]();
    }
  };
}
