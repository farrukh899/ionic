angular.module('app.controllers')

.controller('MainCtrl',['$scope','$mdSidenav', 'vodService','$state','$ionicHistory', '$rootScope','$ionicLoading','dialog', '$ionicModal',
    function($scope,  $mdSidenav, vodService, $state, $ionicHistory, $rootScope, $ionicLoading, dialog, $ionicModal) {
    $scope.searchOpen = false;
    vodService.getCategories().then(function(response) {
        var removeCategories = [70, 71, 66, 67, 64, 65, 13, 68];
        $scope.categoryList = _.filter(response, function(item){
           return !removeCategories.includes(item.id);
        });
    });
    // getting recent channels
    vodService.getRecentChannels().then(function(response){
      $scope.liveChannels = response;
    });
    // Getting recent channels
    /**
     * Goes home
     **/
     $scope.goHome = function() {
       $state.go('landing');
       $scope.isOpen = false;
       $mdSidenav('left', true).close();
     }
    /**
     * The select category function
     * params {id, title} id of category and title of category
     **/
    $scope.selectCat = function(id, title) {
      $state.go('category', {id:id, title: title});
      $scope.isOpen = false;
      $mdSidenav('left', true).close();
    }
    /**
     * Toggle left side menu open closes the sidebar
     **/
    $scope.toggleLeftSideMenu = function() {
        $mdSidenav('left', true).open();
        $scope.isOpen = true;
    };

    /**
     * Toggleing the search button will take the user to search view
     **/
    $scope.search = function () {
      if($scope.searchOpen === false || _.isUndefined($scope.searchOpen)) {
        $state.go('search');
        $scope.searchOpen = true;
      } else if ($scope.searchOpen === true) {
        $scope.searchOpen = false;
         $ionicHistory.goBack();
      }
    }
    /**
      * Opening dialog for live channels
      **/
    $scope.openLive = function (feed) {
        if ($scope.modal) {
          $scope.modal.remove();
        }
        $mdSidenav('left', true).close();
        dialog.openStream(feed, ['Live'], $scope);
    }
    /**
      * Closing an already existing modal
      **/
    $scope.closeModal = function() {
        $scope.modal.remove();
    }
    /**
      * For opening live streams right from the menu
      **/
      // For opening live stream
    $scope.openLiveStream = function(feed) {
        if ($scope.modal) {
          $scope.modal.remove();
        }
        $ionicModal.fromTemplateUrl('templates/video.live.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          makeLivePlaylist(feed);
        });
      }
      //  Making live playlist
      function makeLivePlaylist(feed) {
        $scope.options = undefined;
        $scope.feedSelected = feed;
        $scope.optionsLive = {
          playlist: [{
            image: feed.custom.dp_video_poster ? feed.custom.dp_video_poster[0] : feed.custom.dp_video_poster_mobile_joy[0],
            file: feed.custom.channel_url ? feed.custom.channel_url[0] : feed.custom.dp_video_url[0]
          }],
          primary: "HTML5",
          abouttext: "iVOD",
          aboutlink: "http://nayatel.com/value-added-services/ivod",
          width: "100%",
          aspectratio: "16:9",
          logo: {
            file: '',
            link: 'http://vod.nayatel.com'
          }
        }
        $scope.modal.show();
      }
}]);
