angular.module('app.services', [])

.service('vodService', ['$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http) {
  // Function that will
  this.baseURL = 'http://vod.nayatel.com/api?json=get_recent_posts&&count=10page=';
  this.baseChannelUrl = "http://live.nayatel.com/api?json=get_posts&count=-1";
  this.getCategoryUrl = "http://vod.nayatel.com/api/get_category_posts/?id=";
  this.categoryList = "http://vod.nayatel.com/api/get_category_index/";
  this.searchUrl = "http://vod.nayatel.com/api/get_search_results?search=";
  this.categories = [];
  this.globalVideos = [];
  this.config = {
        cache: true
      };
  this.getRecent = function(page) {
    var that = this;
    return $http.get(this.baseURL+page, this.config).then(function(response){
        const data = response.data.posts.map(function(item){
          const post = makeData(item);
          that.globalVideos.push(post);
          return post;
        });
        return data
    })
    .catch(function(error) {
        return $http.get('./js/services/data.json').then(function(response) {
          const data = response.data.posts.map(function(item) {
            const post = makeData(item);
            that.globalVideos.push(post);
            return post;
          });
          return data;
        })
    });
  }
  this.getCategories = function() {
    return $http.get(this.categoryList, this.config).then(function(response){
      return response.data.categories;
    }).catch(function(error) {
      return $http.get('./js/services/category_index.json').then(function(response){
        return response.data.categories;
      })
    })
  }

  this.getRelated = function(tag) {
    var url = this.getCategoryUrl+tag+'&count=10';
    var that = this;
    return $http.get(url, this.config).then(function(response){
        const data = response.data.posts.map(function(item){
          const post = makeData(item);
          that.globalVideos.push(post);
          return post;
        });
        return data
    });
  }
  this.getRecentChannels = function() {
    return $http.get(this.baseChannelUrl, this.config).then(function(response){
        const data = response.data.posts.map(function(item){
          return makeDataLive(item);
        });
        return data
    }).catch( function(error) {
        return $http.get('./js/services/channels.json').then(function(response) {
          const data = response.data.posts.map(function(item){
            return makeDataLive(item);
          });
          return data;
        });
    });
  }
  //  Make data for live channels
  function makeDataLive(item) {
    var shortTitle = (item.title).split('(');
    return {
      title: item.title,
      thumbnail: item.thumbnail ? item.thumbnail : item.custom_fields.dp_video_poster_mobile_joy,
      id: item.id,
      tags: item.tags,
      content: item.content,
      comments: item.comments,
      custom: item['custom_fields'],
      name: item.title,
      shortTitle: (shortTitle[0]).substring(0,20),
      categories: item.categories.map(function(item,index){ if(index<2){return item}})
    }
  }
  //  Make data for vod
  function makeData(item) {
    var shortTitle = (item.title).split('(');
    const post =  {
      title: item.title,
      thumbnail: item.thumbnail_images.full.url,
      id: item.id,
      tags: item.tags,
      content: item.content,
      comments: item.comments,
      custom: item['custom_fields'],
      name: item.custom_fields.name[0],
      shortTitle: (shortTitle[0]).substring(0,20),
      categories: item.categories.map(function(item,index){ if(index<2){return item}}),
      direct_url: item.custom_fields.video_url ? item.custom_fields.video_url[0] : undefined
    }
    return post;
  }
  this.getMovie = function (id) {
    const baseURL = "http://vod.nayatel.com/api?json=get_post&post_id="
    return $http.get(baseURL+id, this.config).then(function(res){
      return makeData(res.data.post);
    })
  }

  this.getCategoryList = function (id, page, count) {
    var that = this;
    var url = this.getCategoryUrl+id+'&count='+count+'&page='+page;
    return $http.get(url, this.config).then(function(response){
        const data = response.data.posts.map(function(item){
          const post = makeData(item);
          that.globalVideos.push(post);
          return post;
        });
        return data
    }).catch(function(response) {
          return $http.get('./js/services/category_index.json').then(function(response ) {
            return response.data.categories;
          });
    });
  }

  this.searchPosts = function (title, page) {
    var url = this.searchUrl +title;
    url = page ? this.searchUrl + title + '&page=' + page : this.searchUrl + title;
    var that = this;
    return $http.get(url, this.config).then(function(response){
        const data = response.data.posts.map(function(item){
          const post = makeData(item);
          that.globalVideos.push(post);
          return post;
        });
        return data
    }).catch(function(error) {
          return $http.get('./js/services/category_index.json').then(function(response){
            return response.data.categories;
          })
    });
  }
  function convertHtmlToText(text) {
    return text.replace(/(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!\/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi, '');
}
}]);
