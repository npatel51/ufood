angular.module('events', []).factory('Events', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/events');
    },

    create: function (event) {
      return $http.post('/api/events', event);
    },

    delete: function (id) {
      return $http.delete('/api/events', event);
    }
  };
  return methods;
});