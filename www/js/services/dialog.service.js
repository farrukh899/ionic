angular.module('app.services')

.service('dialog', ['$http', '$ionicModal', 'vodService', function($http, $ionicModal, vodService) {

  // Should have ionic modal functions over here
  this.openStream = function(feed, type, $scope) {
    if ($scope.modal) {
      $scope.modal.remove();
    }
    /**
      *  This function would load a templates
      *  Based on type of stream
      **/
    if(type[0] !== 'Live') {
      $ionicModal.fromTemplateUrl('templates/video.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        switch (type[0]) {
          case 'Movie':
            makePlaylist(feed, $scope);
            break;
          case 'Series':
            makePlaylistSeries(feed, $scope);
            break;
        }
      });
    } else {
      $ionicModal.fromTemplateUrl('templates/video.live.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        makePlaylistLive(feed, $scope);
      })
    }
  }
  function getServer(custom) {
    return custom.server ? custom.server[0] : "";
  }
  function makePlaylist(feed, $scope) {
    const file1 = feed.direct_url ? feed.direct_url : "http://streamfe2.nayatel.com:1935/vodedge/_definst_/http/movies"+ getServer(feed.custom) +"/" + feed.custom.name + "-HD.mp4/manifest.mpd";
    const file2 = feed.direct_url ? feed.direct_url : "http://streamfe1.nayatel.com:1935/vodedge/_definst_/http/movies" + getServer(feed.custom)+ "/" + feed.custom.name + "-HD.mp4/playlist.m3u8";
    $scope.options = undefined;
    $scope.feedSelected = feed;
    $scope.options = {
      playlist: [{
        image: feed.thumbnail,
        sources: [{
          file: file1
        }, {
          file: file2
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
    if(!feed.direct_url) {
      getRelated(feed.categories[0].id, $scope);
    }
    $scope.modal.show();
  }
  function makePlaylistLive(feed, $scope) {
    $scope.options = undefined;
    $scope.feedSelected = feed;
    $scope.optionsLive = {
      playlist: [{
        image: feed.custom.dp_video_poster[0],
        file: feed.custom.channel_url[0]
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
  getPrefix = function (num) {
    return  num < 10 ? "0" + num : num;
  }
  function makePlaylistSeries(feed, $scope) {
    $scope.options = undefined;
    $scope.feedSelected = feed;
    const playlist = [];
    for (var x = 1; x <= feed.custom.episodes[0]; x++) {
      const name = _.isArray(feed.custom.name) ? feed.custom.name[0] : feed.custom.name;
      const season = _.isArray(feed.custom.season) ? feed.custom.season[0]: feed.custom.season;
      const sources =
        [{
          file: "http://streamfe2.nayatel.com:1935/vodedge/_definst_/http/mp4:series"+ getServer(feed.custom) +"/" + name + "/s" + feed.custom.season[0] + '/' + name + '.S' + getPrefix(season) + 'E' + getPrefix(x) + '.mp4/manifest.mpd'
        },{
          file: "http://streamfe2.nayatel.com:1935/vodedge/_definst_/http/series"+ getServer(feed.custom) +"/" + name + "/s" + feed.custom.season[0] + '/' + name + '.S' + getPrefix(season) + 'E' + getPrefix(x) + '.mp4/playlist.m3u8'
        }];
        const data = {
          sources,
          title: "Episode " + x
        }

        playlist.push(data);
    }
    playlist.image = feed.thumbnail;
    $scope.options = {
      playlist: playlist,
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
    getRelated(feed.categories[0].id, $scope);
    $scope.modal.show();
  }

  function getRelated(feed, $scope) {
    vodService.getRelated(feed).then(function(response) {
      $scope.relatedMovies = response;
    });
  }

  this.closeStream = function($scope) {
    $scope.modal.remove();
  }
}]);
