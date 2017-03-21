// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'app.routes',
  'app.controllers',
  'ngCordova',
  'app.services',
  'app.directives',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'angular-jwplayer',
  'ngAria',
  'ngMaterial',
  'infinite-scroll'
])

.run(function($ionicPlatform, $ionicSideMenuDelegate, $rootScope, $ionicLoading, $state, $timeout) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      $ionicSideMenuDelegate.toggleLeft();
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      StatusBar.styleLightContent(); // do not use default style
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      $cordovaStatusbar.styleColor('light');
    }
  });
    // Setup the loader
  $rootScope.$on('$stateChangeStart', function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      maxWidth: 200,
      showDelay: 0
    });
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    $ionicLoading.hide().then(function(){
    });
  })
})
