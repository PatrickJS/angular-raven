(function(module, angular, undefined) {
"use strict";

module.provider('Raven', function() {
  var _development = null;

  this.development = function(config) {
    _development = config || _development;
    return this;
  }

  this.$get = ['$window', '$log', function($window, $log) {
        } else {
          return function(exception, cause) {
            $log.error.apply($log, arguments);
          };
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
