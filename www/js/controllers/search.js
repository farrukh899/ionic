angular.module('app.controllers')

.controller('searchCtrl',['$scope','$ionicHistory', 'vodService', 'dialog', '$timeout', '$ionicScrollDelegate', '$timeout',
function($scope, $ionicHistory, vodService, dialog, $timeout, $ionicScrollDelegate, $timeout) {
    this.vodService = vodService;
    this.globalVideos = this.vodService.globalVideos;
    this.videos = [];
    this.dialog = dialog;
    $scope.page = 1;
    $scope.isLoading = false;

      this.quickSearch = function() {
        // Filter the existing content so that user does not have to wait for
        // A long time to get response
        var search = this.search;
        $scope.searchResults = _.filter(this.globalVideos, function(item) {
            if(((item.title).toLowerCase()).indexOf((search).toLowerCase()) !== -1) {
              return item;
            };
        });
        $scope.searchResults = _.uniqBy($scope.searchResults, 'title');
      }
      this.searchContent = function () {
          if(window.cordova) {
            cordova.plugins.Keyboard.close();
          }
          var search = this.search;
          if (this.search && this.search.length > 2 ) {
          if($scope.isLoading !== true) {
            $timeout(function(){
                $scope.isLoading = true;
                vodService.searchPosts(search).then(function(response){
                  $scope.searchResults = [];
                  response.map(function(item){
                    $scope.searchResults.push(item);
                    $scope.isLoading = false;
                  })
                });
            },1000);
          }

        }
      };
      //  Load more search results
      $scope.loadMore = function(search) {
         getScrollPosition(search);
      }
      getScrollPosition = function (search) {
        this.scrollHeight = $ionicScrollDelegate.$getByHandle('homeScroll').getScrollView().__maxScrollTop;
        this.scrollPosition = $ionicScrollDelegate.$getByHandle('homeScroll').getScrollPosition().top;

        if(this.scrollPosition === this.scrollHeight && $scope.searchResults) {
          loadMoreContent(search)
        }
      }
      loadMoreContent = function (search) {
        $scope.pageNo += 1;
        $scope.page +=1;
        if($scope.isLoading === false) {
          $scope.isLoading = true;
          vodService.searchPosts(search, $scope.page).then(function(response){
            response.map(function(item){
              $scope.searchResults.push(item);
            });
            $scope.isLoading = false;
          });
        }

      }
      // Show dialog box
      this.showTitle = function(feed) {
        dialog.openStream(feed, feed.custom.type, $scope);
      }
      $scope.closeModal = function () {
        if(jwplayer()) {
          jwplayer().remove();
        }
        $scope.modal.remove();
        dialog.closeStream($scope);
      }
      $scope.getWidth = function(items) {
         return items * 80 + 'px';
      }
      this.openStream = function(feed) {
        dialog.openStream(feed, feed.custom.type, $scope);
      }
      this.playEpisode = function (episode) {
          jwplayer().stop();
          jwplayer().playlistItem(episode);
      }
}]);
