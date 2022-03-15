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
  console.log('hit');
  try {
    const Tours = await tour.find();
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

exports.postTours = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTours = Object.assign({ id: newId }, req.body);
  // tours.push(newTours);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         tours: newTours,
  //       },
  //     });
  //   }
  // );
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
