const express = require('express');
const tour = require('../Modals/tourModals');

//define route methods to export

exports.createTour = async (req, res) => {
  try {
    //Tour.create saves in the DB
    const newTour = await tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTours = async (req, res) => {
  // console.log(req.query);
  // 1) normal filter way using params
  // find({ duration: 5, difficulty: 'easy' });
  //2) filter way using mongoose methods
  // find().where('duration).equals(5).where('difficulty).equals('easy')
  try {
    //BUILD QUERY
    // * 1) Filtering
    // ? 1A) Filtering
    //`````remove unwanted params from req.query
    const queryObj = { ...req.query };
    const excludeFeilds = ['page', 'sort', 'limit', 'feilds'];
    excludeFeilds.forEach((item) => delete queryObj[item]);
    //````

    // ? 1B) Advance Filtering
    // Adding advance filtering for ur params such as 127.0.0.1:8000/api/v1/tours?duration[gte]=5&difficulty=easy ([gte]) greater than eqial
    // when u log req.query you get {difficulty: easy, duration: {gte:5}}
    //but what mongoDB expects is to have $ sign before gte {difficulty: easy, duration: {$gte:5}}

    //so we replace all mongodb operators with a $ sign in front of it
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = tour.find(JSON.parse(queryStr));

    // * 2) a) Sorting (normal)
    //127.0.0.1:8000/api/v1/tours?sort=price (Ascending)
    //127.0.0.1:8000/api/v1/tours?sort=-price (Descending => "-" before the value)
    if (req.query.sort) {
      // ? b) sorting normal and adding more specifics (scenario 2 obj same value)
      //here req.query.sort = price, so query.sort('price'), sorts by price
      //if we r sorting by some value, say price, and there are 2 obj with same price, we pass muliple feilds to sort accordingly
      //127.0.0.1:8000/api/v1/tours?sort=price,ratingsAverage (Ascending)
      //127.0.0.1:8000/api/v1/tours?sort=price,-ratingsAverage (Descending)
      //remove the comma from the query and replace with space coz mongoose accepts it this way => sort('price ratingAverage)
      const sortBy = req.query.sort.split(',').join(' ');

      // query = query.sort(req.query.sort) (sorting normal)
      //sorting by scenario b
      query = query.sort(sortBy);
    } else {
      //other wise sort by newest created time
      query = query.sort('-createdAt');
    }

    // * 3) Feild Limiting aka projecting (limiting what propertise we get from the obj)
    //127.0.0.1:8000/api/v1/tours?fields=name,duration,difficulty,price
    if (req.query.fields) {
      //mongodb expects something like query.select)('name price duration') with spaces
      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);
      query.select(fields);
    } else {
      //return every item exept the version number, include90 a '-' in front
      query = query.select('-__v');
    }

    //* 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //if we request more data in pagination compared to what we have
    if (req.query.page) {
      //countDocuments return number of documents in a collection
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    //EXECUTE QUERY
    const Tours = await query;
    console.log(Tours);
    res.status(200).json({
      status: 'success',
      results: Tours.length,
      requestedAt: req.requestTime,
      data: {
        Tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  console.log(req.params.id);
  try {
    //findById is a mongoose shortcut for tour.findOne({_id: req.params.id})
    const Tour = await tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: Tour.length,
      data: {
        Tour,
      },
    });
  } catch (err) {
    res.send(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTours = async (req, res) => {
  //findByIdAndUpdate => shortcut for findOneAndUpdate
  //req.body => payload of what has to be updated
  //patch only updates one key value pair, if put we cannot use this implementation
  try {
    const updatedTour = await tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour: updatedTour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
