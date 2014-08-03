(function(angular, Mootor) {
    
    var ItemModel = Mootor.Data.models.Item;
    
    angular.module('sample.services', [])
    
    .factory('Item', function($q, $window) {
      return {
          all: function() {
              return ItemModel.all();
          },
          get: function(options) {
              
              var deferred = $q.defer(),
                  item = ItemModel.get(options),
                  fail;
                  
              if (item && !item.sign) {
                  item.sign = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }
                  

              window.setTimeout(function() {
                  deferred.resolve(item);
              }, 1);

              return deferred.promise;
              

          },

          getWithPictures: function(options) {
              
              var deferred = $q.defer(),
                  item = ItemModel.get(options),
                  fail;
                  
              if (item && !item.sign) {
                  item.sign = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }
                  

              if (window.cordova !== undefined && item.picture) {

                  fail = function(e) {
                      console.log(e.toString());
                      deferred.resolve(item);
                  }

                  function onInitFs(fs) {
                      
                    resolveLocalFileSystemURL(item.picture, function(fileEntry) {
                        
                      // Get a File object representing the file,
                      // then use FileReader to read its contents.
                      fileEntry.file(function(file) {
                         var reader = new FileReader();

                         reader.onloadend = function(e) {
                             item.picture = this.result;
                             deferred.resolve(item);
                         };

                         reader.readAsDataURL(file);

                      }, fail);
                         
                         
                     }, fail);

                  };
                  
                  window.setTimeout(function() {
                      window.requestFileSystem(window.PERSISTENT, 10*1024*1024, onInitFs, fail);
                  }, 10);

              } else {
                  window.setTimeout(function() {
                      deferred.resolve(item);
                  }, 1);
              }

              return deferred.promise;
              
          },

          create: function(options) {
              return ItemModel.create(options);
          },
          save: function() {
              return ItemModel.save();
          },
          put: function() {
              return ItemModel.put();
          },
          destroy: function() {
              return ItemModel.destroy();
          },
          count: function() {
              return ItemModel.count();
          },
          filter: function() {
              return ItemModel.filter();
          },
      };
    });



}(window.angular, window.Mootor));
