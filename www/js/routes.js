angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('landing', {
    url: '/landing',
    templateUrl: './templates/landing.html',
    controller: 'landingCtrl',
    resolve: {
      featuredMovies: function(vodService) {
          return vodService.getRecent(1);
      },
      liveChannels: ['vodService', function(vodService) {
          return vodService.getRecentChannels();
      }]
    },
    controllerAs: 'vm'
  })
  .state('category', {
    url: '/category/:id/:title',
    params: {
      id: null,
      title: null
    },
    templateUrl: './templates/category.html',
    controller: 'categoryCtrl',
    controllerAs: 'vm',
    resolve: {
      catFeed: ['vodService', '$stateParams', function(vodService, $stateParams){
          return vodService.getCategoryList($stateParams.id, 1, 30);
      }]
    }
  })
  .state('search', {
    url: '/search',
    templateUrl: './templates/search.html',
    controller: 'searchCtrl',
    controllerAs: 'vm'
  })
$urlRouterProvider.otherwise('/landing')

});
