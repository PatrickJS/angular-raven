(function() {
  "use strict";

  angular.module('angular-raven', ['ng'])
    .factory('$exceptionHandler', ['$window', '$log',
      function($window, $log) {
        if ($window.Raven) {
          return function(exception, cause) {
            $log.error.apply($log, arguments);
            Raven.captureException(exception);
          };
        } else {
          return function(exception, cause) {
            $log.error.apply($log, arguments);
          };
        }
      }
    ]);

}());

