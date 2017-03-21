'use strict';
angular.module('app.directives')

.directive('ngScrollMore',['$state', function(){
      return{
        restrict: 'EA',
        link: function(scope, elem, attrs) {
          angular.element(elem).bind("scroll", function(){
            console.log(elem.getScrollPosition());
          })
        }
      }
}]);
