var should = require('should'), 
    mongoose = require('mongoose'), 
    Event = require('../models/events.server.model'), 
    config = require('../config/config');

var event, id;

event =  {
  title:"Friday Night Hacks (FNH - Fall 2018)", 
  date: new Date,
  time: "05:30PM",
  description: "NEXT FNH on October 19th, 2018! We had a great time last Friday Night Hacks eating cookies, pizza and snacks while having worthwhile conversations between old generation coders vs the new generation ones. Don't forget our rounds of chess. Hope to see you all again on October 19th at 7:00 PM. Location: Fishbowl.",
  address:"Stadium Rd, Gainesville, FL 32603",
  coordinates: {latitude: 44.50, longitude: 99.36},
  typeOfFood:"Vegetarian",
}

describe('Event Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when required properties are provided', function(done){
      new Event({
        title: event.title, 
        date: event.date,
        time: event.time,
        address:event.address,
        typeOfFood:event.typeOfFood
      }).save(function(err, event){
        should.not.exist(err);
        id = event._id;
        done();
      });
    });

    it('saves properly when all properties provided', function(done){
      new Event(event).save(function(err, event){
        should.not.exist(err);
        id = event._id;
        done();
      });
    });

    it('throws an error when title is not provided', function(done){
      new Event({
        code: event.code
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when address is not provided', function(done){
      new Event({
        title: event.title, 
        date: event.date,
        typeOfFood:event.typeOfFood
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      Event.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});