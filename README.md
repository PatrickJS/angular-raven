# angular-raven [![Build Status](https://travis-ci.org/gdi2290/angular-raven.png?branch=master)](https://travis-ci.org/gdi2290/angular-raven)
A Raven.js / Sentry wrapper for Angular.js to hook into the exception handler that Angular provides

#How do I add this to my project?

You can download angular-raven by:

* (prefered) Using bower and running `bower install angular-raven --save`
* Using npm and running `npm install angular-raven --save`
* Downloading it manually by clicking [here to download development unminified version](https://raw.github.com/gdi2290/angular-raven/master/angular-raven.js)


````html
<script src="http://cdnjs.cloudflare.com/ajax/libs/raven.js/1.0.8/raven.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min.js"></script>
<script>
  Raven.config('YOUR_PUBLIC_DSN').install();
<script>
<script src="app/bower_components/angular-raven/angular-raven.js"></script>
<script>
  angular.module('YOUR_APP', [
    'angular-raven'
  ]);
</script>

````

Initializing Raven.js outside of Angular allows Raven to track errors when Angular wasn't able to bootstrap correctly.
