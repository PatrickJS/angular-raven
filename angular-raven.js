(function(global, angular, undefined) {
  'use strict';

  var _development = null;

  function $RavenProvider() {

    this.development = function(config) {
      _development = config || _development;
      return this;
    };

    this.$get = ['$window', '$log', function($window, $log) {
      var service = {
        VERSION: ($window.Raven) ? $window.Raven.VERSION : 'development',
        TraceKit: ($window.Raven) ? $window.Raven.TraceKit : 'development',
        captureException: function captureException(exception, cause) {
          if (!_development) {
            $window.Raven.captureException(exception, cause);
          } else {
            $log.error('Raven: Exception ', exception, cause);
          }
        },
        captureMessage: function captureMessage(message, data) {
          if (!_development) {
            $window.Raven.captureMessage(message, data);
          } else {
            $log.error('Raven: Message ', message, data);
          }
        },
        setUser: function setUser(user) {
          if (_development) {
            $log.info('Raven: User ', user);
          } else {
            if ($window.Raven.setUser) {
              $window.Raven.setUser(user);
            } else if ($window.Raven.setUserContext) {
              $window.Raven.setUserContext(user);
            }
          }
        },
        setUserContext: function setUserContext(user) {
          if (_development) {
            $log.info('Raven: User ', user);
          } else {
            if ($window.Raven.setUserContext) {
              $window.Raven.setUserContext(user);
            } else if ($window.Raven.setUser) {
              $window.Raven.setUser(user);
            }
          }
        },
        lastException: function lastException() {
          if (_development) {
            $log.error('Raven: Last Exception');
          } else {
            $window.Raven.lastException();
          }
        },
        setExtraContext: function setExtraContext(data) {
          if (_development) {
            $log.info('Raven: Extra Context ', data);
          } else {
            $window.Raven.setExtraContext(data);
          }
        },
        setTagsContext: function setTagsContext(data) {
          if (_development) {
            $log.info('Raven: Tags Context ', data);
          } else {
            $window.Raven.setTagsContext(data);
          }
        },
        context: function context(options, func, args) {
          var RavenService = this;

          if (angular.isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
          }

          return RavenService.wrap(options, func).apply(RavenService, args);
        },
        wrap: function wrap(options, func) {
          var RavenService = this;

          if (angular.isUndefined(func) && !angular.isFunction(options)) {
            return options;
          }

          if (angular.isFunction(options)) {
            func = options;
            options = undefined;
          }

          if (!angular.isFunction(func)) {
            return func;
          }

          if (func.__raven__) {
            return func;
          }

          function Wrapped() {
            var args = [], i = arguments.length;
            while(i--) {
              args[i] = RavenService.wrap(options, arguments[i]);
            }
            try {
              return func.apply(this, args);
            } catch(e) {
              RavenService.captureException(e, options);
            }
          }

          for (var property in func) {
            if (func.hasOwnProperty(property)) {
              Wrapped[property] = func[property];
            }
          }
          Wrapped.__raven__ = true;
          return Wrapped;
        }

      };

      return service;
    }]; // end $get
  } // end provider

  function $ExceptionHandlerProvider($provide) {
    $provide.decorator('$exceptionHandler', [
      '$delegate', '$raven', '$injector',
      $ExceptionHandlerDecorator
    ]);
  }

  function $ExceptionHandlerDecorator($delegate, $raven, $injector) {
    // If we try to include a $location object, we will get:
    // "Circular dependency found: $location <- $exceptionHandler <- $rootScope"
    // Therefore, we inject it.
    var $location;

    function $ExceptionHandler(exception, cause) {
      $location = $location || $injector.get('$location');

      var exception_data = {
        culprit: $location.absUrl(),
        extra: {
          exception: exception,
          cause: cause
        }
      };

      $raven.captureException(exception, exception_data);

      $delegate(exception, cause);
    }

    return $ExceptionHandler;
  }


  angular.module('ngRaven', [])
  .provider('$raven', $RavenProvider)
  .provider('Raven',  $RavenProvider)
  .config(['$provide', $ExceptionHandlerProvider]);


  angular.module('angular-raven', ['ngRaven']);

}(this, angular));
