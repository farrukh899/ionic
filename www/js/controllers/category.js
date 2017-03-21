angular.module('app.controllers')

.controller('categoryCtrl', ['catFeed', '$stateParams',
  '$ionicModal', '$scope', 'vodService', '$ionicScrollDelegate', '$ionicLoading', 'dialog', '$timeout',

  function(catFeed, $stateParams, $ionicModal, $scope, vodService, $ionicScrollDelegate, $ionicLoading, dialog, $timeout) {
    const latest = _.take(catFeed, 10);
    const feeds = _.drop(catFeed, 10);
    $scope.isLoading = false;
    $scope.pageNo = 1;
    this.latestContent = latest;
    $scope.feeds = feeds;
    this.title = $stateParams.title;
    // Make data for the slider

    this.openStream = function(feed) {
      dialog.openStream(feed, feed.custom.type, $scope);
    }
    // Load more function will load more content on page scroll
    this.loadMore = function() {
       getScrollPosition();
    }
    this.playEpisode = function (episode) {
      jwplayer().stop();
      jwplayer().playlistItem(episode);
    }
    getScrollPosition = function () {
      this.scrollHeight = $ionicScrollDelegate.$getByHandle('homeScroll').getScrollView().__maxScrollTop;
      this.scrollPosition = $ionicScrollDelegate.$getByHandle('homeScroll').getScrollPosition().top;

      if(this.scrollPosition === this.scrollHeight) {
        loadMoreContent()
      }
    }
    loadMoreContent = function () {
      $ionicScrollDelegate.$getByHandle('homeScroll').freezeScroll(true);
      $scope.pageNo += 1;
      $timeout(function(){
          $ionicScrollDelegate.$getByHandle('homeScroll').freezeScroll(false);
      },500);
      if($scope.isLoading === false) {
        $scope.isLoading = true;
        vodService.getCategoryList($stateParams.id, $scope.pageNo, 30).then(function(response){
            response.map(function(item){
              feeds.push(item);
              $scope.feeds = feeds;
            });
            $scope.isLoading = false;
        })
      }
    }
    // Load more function ends here
    $scope.closeModal = function() {
      jwplayer().remove();
      $scope.modal.remove();
    }
    $scope.$on('modal.hidden', function() {
      $scope.modal.remove();
    });
    $scope.getWidth = function(items) {
       return items * 80 + 'px';
    }

  }
]);
