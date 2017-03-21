angular.module('app.controllers')

.controller('vodPlayer', ['$scope', '$stateParams', 'vodFeed', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, vodFeed, $state) {
    this.vodFeed = vodFeed;
    this.options = {
      playlist: [{
        image: this.vodFeed.thumbnail,
        sources: [{
          file: "http://streamfe2.nayatel.com:1935/vodedge/_definst_/http/movies1/"+this.vodFeed.custom.name+"-HD.mp4/manifest.mpd"
        }, {
          file: "http://streamfe1.nayatel.com:1935/vodedge/_definst_/http/movies1/"+this.vodFeed.custom.name+"-HD.mp4/playlist.m3u8"
        }],

        tracks: [{
          file: "http://streambe2.nayatel.com/movies1/The.Legend.Of.Tarzan-HD.srt",
          label: "English",
          kind: "captions",

        }],

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
      },
      cast: {
        appid: "9DFF935C",
        loadscreen: "http://vod.nayatel.com/wp-content/uploads/2016/09/maxresdefault4.jpg",
        endscreen: "http://vod.nayatel.com/wp-content/uploads/2016/09/maxresdefault4.jpg",
        logo: "http://vod.nayatel.com/wp-content/themes/ivod/images/logo.png",
        railcolor: "#e0e0e0"
      }

    }
  }
]);
