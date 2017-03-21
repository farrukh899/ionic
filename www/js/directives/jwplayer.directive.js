'use strict';
angular.module('app.directives', [])

.directive('jwPlayer',['$state', function(){
      return{
        restrict: 'E',
        templateUrl: "/templates/jwPlayer.html",
        scope: {
          feed: '='
        },
        link: function(scope, elem, attrs) {

          scope.loadFile = function() {
            console.log("got here");
            var file = "http://streamfe1.nayatel.com:1935/vodedge/_definst_/http/movies1/Warcraft-HD.mp4/playlist.m3u8";

            window.plugins.streamingMedia.playVideo(file);

            file.play();
          }
        }
      }
}]);
