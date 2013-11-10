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
      VERSION: $window.Raven.VERSION,
      TraceKit: $window.Raven.TraceKit,
      captureException: function captureException(exception, cause) {
        if (_development) {
          $log.error('Raven: Exception ', exception, cause);
        } else {
          $window.Raven.captureException(exception, cause);
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
      },
      lastException: function lastException() {
        if (_development) {
          $log.error('Raven: Last Exception');
        } else {
          $window.Raven.lastException();
        }
      },
      context: function(options, func, args) {
        var RavenService = this;

        if (isFunction(options)) {
          args = func || [];
          func = options;
          options = undefined;
        }

        return RavenService.wrap(options, func).apply(this, args);
      },
      wrap: function(options, func) {
        var RavenService = this;

        if (isUndefined(func) && !isFunction(options)) {
          return options;
        }

        if (isFunction(options)) {
          func = options;
          options = undefined;
        }

        if (!isFunction(func)) {
          return func;
        }

        if (func.__raven__) {
          return func;
        }

        function wrapped() {
          var args = [], i = arguments.length;
          while(i--) args[i] = Raven.wrap(options, arguments[i]);
          try {
            return func.apply(this, args);
          } catch(e) {
            RavenService.captureException(e, options);
          }
        }

        for (var property in func) {
          if (func.hasOwnProperty(property)) {
            wrapped[property] = func[property];
          }
        }
        wrapped.__raven__ = true;
        return wrapped;
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
