const express = require('express');
const tour = require('../Modals/tourModals');

//define route methods to export

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.createTour = async (req, res) => {
  try {
    //Tour.create saves in the DB
    const newTour = await Tour.create(req.body);
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

exports.getTours = (req, res) => {
  res.status(200).json({
    // status: 'success',
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours,
    // },
  });
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

exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((item) => item.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.patchTours = (req, res) => {
  res.status(201).json({
    message: 'Patch complete',
    data: {
      data: 'some patch data',
    },
  });
};
