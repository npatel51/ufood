angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      var entry = angular.copy($scope.newListing);
      //console.log(entry);
      Listings.create(entry, function (err, list) {
        if (err) {
          console.log(err);
        }
        else {
          window.location.reload();
        }
      });

        //TODO: redirect
          window.location.reload();
      
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      console.log(index);
      
      Listings.delete(index, function (err, list) {
        if (err) {
          console.log(err);
        }
        else {
          window.location.reload();
        }
      });
      
      window.location.reload();
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = index;
    };
  }
]);