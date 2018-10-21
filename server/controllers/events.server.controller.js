/* Dependencies */
var mongoose = require('mongoose'), 
    Event = require('../models/events.server.model.js');

/* Create an event */
exports.create = function(req, res) {
  /* Instantiate a Event */
  var newEvent = new Event(req.body);
  /* Then save the event */
  newEvent.save(function(err,event) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(event);
    }
  });
};

/* Show the current event */
exports.read = function(req, res) {
  /* send back the event as json from the request */
  res.json(req.event);
};

/* Update a event */
exports.update = function(req, res) {
  var event = req.event;
  Event.findOne({_id:event._id},function (err, event) {
      if (err)  return res.status(500).send(err);
       // update all params set in request body 
      for(param in req.body){
        event[param] = req.body[param];
      }
      //save the event
      event.save(function(err,event){
        if (err)  return res.status(500).send(err);
        return res.status(200).send(event);  
      });
    });
};

/* Delete a event */
exports.delete = function(req, res) {
  var event = req.event;
  Event.remove({code:event._id},function (err, event) {
    if (err)  return res.status(500).send(err);
    // document deleted succesfully 
    return res.status(200).send();
   });
};

/* Retreive all the events by time*/
exports.list = function(req, res) {
  console.log("called");
  Event.find().sort().exec(function(err,events){
    if (err) {
      res.status(404).send(JSON.stringify({'message':'Something went wrong on our side :('}));
    }
    res.status(200).send(events);
  });
};

/* 
  Middleware: find a event by its ID, then pass it to the next request handler. 

  Find the event using a mongoose query, 
        bind it to the request object as the property 'event', 
        then finally call next
 */
exports.eventByID = function(req, res, next, id) {
  Event.findById(id).exec(function(err, event) {
    if(err) {
      console.log('error');
      res.status(400).redirect('/');
    } else {
      req.event = event;
      next();
    }
  });
};