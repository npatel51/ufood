var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/*const mongoURL = 'mongodb://admin:ABC123@ds037468.mlab.com:37468/foodbaby1';
mongoose.connect(mongoURL, function(err){
  if(err) throw err;
});
*/


/* Constraints for an even to be listed also has type of food for each listing */


var eventSchema = new Schema({
  title:        { type: String, required: true }, 
  date:         { type: Date, default: Date.now, required:true}, 
  time:         { type:String, required:true},
  description:  { type: String },
  address:      { type:String, required:true },
  coordinates:  { latitude: Number,  longitude: Number},
  typeOfFood:   { type:String, required:true},

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

/* New event created */

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
