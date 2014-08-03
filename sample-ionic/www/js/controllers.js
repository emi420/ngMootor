angular.module('sample.controllers', ['sample.services'])

    .controller('IndexCtrl', function($scope, $state, Item) {
    
        $scope.items = Item.all();
          
        $scope.delete = function(item) {
            window.setTimeout(function() {
                if (confirm("¿Are you sure?") === true) {
                    Mootor.Data.models.Item.destroy(item.id);
                    $scope.items = Item.all();
                    $scope.$digest();
                }
            }, 10);
        }
    
    })

    .controller('FormCtrl', function($scope, $state, $stateParams, Item, $location) {
    
        var promise;
    
        if ($stateParams.itemId) {
            promise = Item.get($stateParams.itemId);
            promise.then(function(item) {
                $scope.item = item;
            });
        } else {
            $scope.item = Item.create({});
        }

        $scope.save = function() {
        
            var item = $scope.item;
                
            try {

                if (!item.id) {
                    item.save();
                } else {
                    item.put();
                }

                window.location = ("#/");
    
            } catch(e) {
                console.log(e);
                alert("Oops! something went wrong.");
            }
            
        };       
    
    
    });
  

