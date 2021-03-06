/* Dependencies */
var events = require('../controllers/events.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/')
  .get(events.list)
  .post(events.create);

//retreive all events
router.route('/api/events')
  .get(events.list)
  .post(events.create);

// get specific event
router.route('/api/events/:eventID')
  .get(events.read)
  .put(events.update)
  .delete(events.delete);


/*
  The ':' specifies a URL parameter. 
 */
router.route('/:eventID')
  .get(events.read)
  .put(events.update)
  .delete(events.delete);

  

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/events/566372f4d11de3498e2941c9'

  The request handler will first find the specific event using this 'eventsById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this event to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific event (depending on the HTTP verb specified)
 */
router.param('eventID', events.eventByID);

module.exports = router;