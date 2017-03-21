angular.module('app.controllers')

.controller('vodController', ['$scope', '$stateParams', 'vodFeed', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, vodFeed, $state) {
    this.vodFeed = vodFeed;

    //  Show the movie and go to the next page
    this.showMovie = function (feed) {
      $state.go('movie', {id: feed.id})
    }
    this.options = {
        file: "http://streamfe1.nayatel.com:1935/vodedge/_definst_/http/movies1/Warcraft-HD.mp4/playlist.m3u8",
        image: "http://vod.nayatel.com/wp-content/uploads/2016/09/warcraft.jpg", // optionnal
        height: 360,
        width: 640,
        modes: [
        { type: "html5" },
        ]
    };
}]);
