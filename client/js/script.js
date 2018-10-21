mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGJhYnkxIiwiYSI6ImNqbjRuOXluYTByN3Uza3Fvc2xuOTAzaXMifQ.E2kQtGJ19Y6ofltNnZaa3w';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-82.3, 29.6],
  zoom: 10
});

// code from the next step will go here!
var geojson = {
  type: 'FeatureCollection',
  features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.344351, 29.647903]
      },
      properties: {
        title: 'Free French Fries',
        description: 'October 18, 8:00pm'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.343204, 29.650113]
      },
      properties: {
        title: 'Krishna Lunch',
        description: 'Mon-Fri, 12pm - 4pm'
      }
    }
  ]
};

// add markers to map
geojson.features.forEach(function (marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map

  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({
        offset: 25
      }) // add popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    .addTo(map);

});