angular.module('events').controller('EventsController', ['$scope', 'Events', 
  function($scope, Events) {
    /* Get all the events, then bind it to the scope */
    Events.getAll().then(function(response) {
      $scope.events = response.data;
    }, function(error) {
      console.log('Unable to retrieve events:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.showDetail = false;

    $scope.addEvent = function() {
      //create a new event object
      let newEvent = {
        title:$scope.title,
        date:$scope.date,        
        time:$scope.time,         
        description:$scope.description,  
        address:$scope.address,      
        typeOfFood:$scope.typeOfFood 
       };  

    Events.create(newEvent).then(function(response){
        Events.getAll().then(function(response) {
          $scope.events = response.data;
        }, function(error) {
          console.log('Unable to retrieve events:', error);
        });
      },function(error){
        console.log('Unable to add new event:', error);
      });
      
    };

    $scope.deleteEvent = function($event,index) {
      $event.stopPropagation();
      Events.delete($scope.events[index]).then(function(response){
         //if delete was succesfull, then redirect to listing.list which retrieves all the events
         Events.getAll().then(function(response) {
          $scope.events = response.data;
        }, function(error) {
          console.log('Unable to retrieve events:', error);
        });
      },function(error){
         console.log('Unable to remove listing:',error);
      });
    
    };
  }
]);