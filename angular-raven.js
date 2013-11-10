(function(module, angular, undefined) {
"use strict";

module.provider('Raven', function() {
  var _development = null;

  this.development = function(config) {
    _development = config || _development;
    return this;
  }

  this.$get = ['$window', '$log', function($window, $log) {
    var service = {
      captureException: function captureException(exception, cause) {
        if (_development) {
          $log.error('Raven: Exception ', exception, cause);
        } else {
          $window.Raven.captureException(exception);
        }
      },
      captureMessage: function captureMessage(message, data) {
        if (_development) {
          $log.error('Raven: Message ', message, data);
        } else {
          $window.Raven.captureMessage(message, data);
        }
      },
      context: function context(func) {
        try {
          func();
        } catch(event) {
          _captureException(event);
        }
      },
      setUser: function setUser(user) {
        if (_development) {
          $log.error('Raven: User ', user);
        } else {
          $window.Raven.setUser(user);
        }
      }

    };

    return service;
  }]; // end $get
}); // end provider

module.factory('$exceptionHandler', ['Raven', function(Raven) {
  return function(exception, cause) {
    Raven.captureException(exception, cause);
  };
}]);

}(angular.module('ngRaven', []), angular));
