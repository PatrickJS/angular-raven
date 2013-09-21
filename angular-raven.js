;(function(__global, __document, __Raven) {
  "use strict";
  if (__Raven) {
    var scriptRaven = {
      raven: __document.createElement('script');
      script:
      load: function() {
        __document.getElementsByTagName('head').appendChild(this.raven);
      },
      init: function() {
        this.script.type = 'text/javascript';
        this.script.async = true;
        this.script.src = '//cdnjs.cloudflare.com/ajax/libs/raven.js/1.0.8/raven.min.js';
        this.load();
      };
    }
  }

  angular.module('angular-raven', [])
    .provider('$Raven', function() {

    })
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

}(window, document, Raven, undefined));

