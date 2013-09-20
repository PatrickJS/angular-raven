# angular-raven [![Build Status](https://travis-ci.org/gdi2290/angular-raven.png?branch=master)](https://travis-ci.org/gdi2290/angular-raven)
Include Raven.js and Raven.config('YOUR_PUBLIC_DSN').install() in production.
<code><pre>
  angular.module('YOUR_APP', [
    'angular-raven'
  ])
</code></pre>
doing Raven .install() outside of angular allows Raven to track errors if your Angular app blows up
