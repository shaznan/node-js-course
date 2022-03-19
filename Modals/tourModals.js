const mongoose = require('mongoose');

//We will use the modals in the controllers

//1) First define a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    //required the string is to show error message
    required: [true, 'Tour must have a name'],
    unique: true,
    //trim is a schema type available only for strings, it removes whitespace from begining and end
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: String,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  //an array of strings
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    //to permanantly hide this from the results of calling api
    select: false,
  },
  startDate: [Date],
});

//2) Then define a modal (use first upper case - usual convention)
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
