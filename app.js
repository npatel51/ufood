var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGJhYnkxIiwiYSI6ImNqbjRuOXluYTByN3Uza3Fvc2xuOTAzaXMifQ.E2kQtGJ19Y6ofltNnZaa3w';
var map = new mapboxgl.Map({
  container: 'myMap',
  style: 'mapbox://styles/mapbox/streets-v10'
});
