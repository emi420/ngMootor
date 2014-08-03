// Ionic Field App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'field' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'field.services' is found in services.js
// 'field.controllers' is found in controllers.js
angular.module('sample', ['ionic', 'sample.controllers', 'ngMootorUIForm'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('index', {
      url: '/index',
	  templateUrl: 'templates/index/index.html',
	  controller: 'IndexCtrl'
    })

    .state('form', {
      url: '/form/:itemId',
	  templateUrl: 'templates/form/form.html',
	  controller: 'FormCtrl'
    })
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');

});

