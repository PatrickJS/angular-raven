# angular-raven [![Build Status](https://travis-ci.org/gdi2290/angular-raven.png?branch=master)](https://travis-ci.org/gdi2290/angular-raven)
Include Raven.js and Raven.config('YOUR_PUBLIC_DSN').install() in production. To install angular-raven with bower
```bash
bower install angular-raven --save
```
Make sure you add angular-raven to your app modules
```javascript
angular.module('YOUR_APP', [
  'angular-raven'
]);
```
Initializing Raven outside of angular allows Raven to track errors when your Angular app blows up.
