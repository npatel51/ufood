var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var eventSchema = new Schema({
  title:        { type: String, required: true }, 
  date:         { type: Date, default: Date.now }, 
  description:  String,
  address:      String, 
  coordinates:  {
                latitude: Number, 
                longitude: Number
                },
  //TODO: add entries for food types
  created_at:   Date,
  updated_at:   Date
});

eventSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;