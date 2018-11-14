//Events conroller

angular.module('events').controller('EventsController', ['$scope', 'Events', 
  function($scope, Events) {


    mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGJhYnkxIiwiYSI6ImNqbjRuOXluYTByN3Uza3Fvc2xuOTAzaXMifQ.E2kQtGJ19Y6ofltNnZaa3w';

    //Map
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-82.34196788596483,29.649893117253313],
      zoom: 14
    });
    
   
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });
    map.addControl(geocoder);
    // code from the next step will go here!
    
    
    //Function to add event to the map
    function addEventToMap(){
    console.log($scope.events);
    
    var geojson = {
      type: 'FeatureCollection',
      features: $scope.events
    };
    // add markers to map
    geojson.features.forEach(function (event) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat([event.coordinates.longitude,event.coordinates.latitude])
        .setPopup(new mapboxgl.Popup({ className:'popup',
            offset: 10, maxHeight: 14
          }) // add popups
          .setHTML('<h6>' + event.title + '</h6><p>' + new Date(event.date).toLocaleDateString() + '</p><p>' + event.startTime + '-' + event.endTime + '</p><p>' + event.description + '</p><p>' + event.typeOfFood + '</p><p>' + event.address + '</p>'))
        .addTo(map);
    });
    }
    /* Get all the events, then bind it to the scope */
    Events.getAll().then(function(response) {
      $scope.events = response.data;
      addEventToMap();
    }, function(error) {
      console.log('Unable to retrieve events:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.showDetail = false;
    

    $scope.foodType = "Select Diet Specification";
    $scope.foodTypes = ["Vegan","Vegetarian","Gluten Free","Nut Free","Paleo","Kosher","Halal","Not decided yet","Not decided yet,probably pizza"]; // add food type as needed here 

    $scope.foodTypeSelected = function(item) {
      $scope.foodType = item;
    }

    
    function formatTime(time){
      var [hour,min] = time.split(":");
      return (hour%12+12*(hour%12==0))+":"+min+""+(hour >= 12 ? 'PM' : 'AM');
    }

    $scope.addEvent = function() {
       // translate address into geo-coordinates

       new MapboxClient(mapboxgl.accessToken).geocodeForward($scope.address, function(err, data, res) {
        // data is the geocoding result as parsed JSON
        // res is the http response, including: status, headers and entity properties
        if( !err ){
                var coordinates = data.features[0].center;
                //create a new event object
                let newEvent = {
                  title:$scope.title,
                  date:$scope.date,        
                  startTime:formatTime(document.getElementById("startTime").value),
                  endTime:formatTime(document.getElementById("endTime").value),       
                  description:$scope.description,  
                  address:$scope.address,      
                  typeOfFood:($scope.foodType == "Select Diet Specification"?"Not specified":$scope.foodType),
                  coordinates:{ 
                      latitude:coordinates[1],
                      longitude:coordinates[0] // api returns coordinates in this order [longitude,latitude]
                  } 
                }; 

          
          //New Event
              console.log(newEvent);

              Events.create(newEvent).then(function(response){
                  Events.getAll().then(function(response) {
                    $scope.events = response.data;
                    // not needed if just reload the page
                    $("#myModal").modal('hide');   // hide the modal
                    $('#eventForm').trigger("reset"); // reset the form 
    
                  }, function(error) {
                    console.log('Unable to retrieve events:', error);
                  });
                },function(error){
                  console.log('Unable to add new event:', error);
                });
              } else { // error
                  console.log(err);
              }
        });
   
    };
    
//Delete Event
    $scope.deleteEvent = function($event,index) {
      $event.stopPropagation();
      Events.delete($scope.events[index]).then(function(response){
         Events.getAll().then(function(response) {
          $scope.events = response.data;
        }, function(error) {
          console.log('Unable to retrieve events:', error);
        });
      },function(error){
         console.log('Unable to remove listing:',error);
      });
    
    };

     $scope.showDetails = function(index) {
      $scope.showDetail = true;
      $scope.events[index].date = new Date($scope.events[index].date).toLocaleDateString();
      $scope.detailedInfo = $scope.events[index];
    };
  }
]);
