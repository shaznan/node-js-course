const mongoose = require('mongoose');

//We will use the modals in the controllers

//1) First define a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    //required the string is to show error message
    required: [true, 'Tour must have a name'],
    unique: true,
  },
  rating: {
    type: String,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },
});

//2) Then define a modal (use first upper case - usual convention)
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
