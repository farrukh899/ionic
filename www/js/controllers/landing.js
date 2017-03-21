angular.module('app.controllers', [])

.controller('landingCtrl', ['$state', 'featuredMovies', 'liveChannels', '$ionicModal', '$scope', 'vodService', 'dialog',
  function($state, featuredMovies, liveChannels, $ionicModal, $scope, vodService, dialog) {

    this.featuredMovies = featuredMovies;
    this.liveChannels = liveChannels;
    this.dialog = dialog;
    //Initialize the modal
    // Call the modal from here
    $scope.getWidth = function(items) {
       return items * 80 + 'px';
    }
    this.openStream = function(feed) {
        this.dialog.openStream(feed, feed.custom.type, $scope);
    }
    this.playEpisode = function (episode) {
        jwplayer().stop();
        jwplayer().playlistItem(episode);
    }
    // For opening live stream
    this.openLiveStream = function(feed) {
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

    function makePlaylist(feed) {
      $scope.options = undefined;
      $scope.feedSelected = feed;
      $scope.options = {
        playlist: [{
          image: feed.thumbnail,
          sources: [{
            file: "http://streamfe2.nayatel.com:1935/vodedge/_definst_/http/movies1/" + feed.custom.name + "-HD.mp4/manifest.mpd"
          }, {
            file: "http://streamfe1.nayatel.com:1935/vodedge/_definst_/http/movies1/" + feed.custom.name + "-HD.mp4/playlist.m3u8"
          }]
        }],
        abouttext: "iVOD",
        aboutlink: "http://nayatel.com/value-added-services/ivod",
        width: "100%",
        aspectratio: "16:9",
        logo: {
          file: '',
          link: 'http://vod.nayatel.com'
        },
        captions: {
          backgroundOpacity: 35
        }
      }
      getRelated(feed.categories[0].id);
      $scope.modal.show();
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

    function getRelated(feed) {
      vodService.getRelated(feed).then(function(response) {
        $scope.relatedMovies = response;
      })
    }
    $scope.closeModal = function() {
      if(jwplayer()) {
        jwplayer().remove();
      }
      $scope.modal.remove();
    }
    $scope.$on('modal.hidden', function() {
      $scope.modal.remove();
    });
  }
]);
