'use strict';
angular.module('app.directives')
.controller('sidenavCtrl', function($state){
    this.selectCat = function(id, title) {
      $state.go('category', {id:id, title: title});
    }
})
.directive('sidenav',['$state', 'vodService', function($state, vodService){
      return{
        restrict: 'E',
        templateUrl: "/templates/sidenav.html",
        controller: "sidenavCtrl",
        controllerAs: 'vm',
        scope: {

        },
        link: function(scope, elem, attrs) {
            vodService.getCategories().then(function(response) {
                scope.categoryList = response;
            })
        }
      }
}]);
