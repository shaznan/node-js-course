const express = require('express');
const fs = require('fs');

//file path
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

const postTours = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tours: newTours,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  if (!tour)
    return res.status(404).json({ Status: 'Not Found', message: 'Invalid ID' });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

const patchTours = (req, res) => {
  res.status(201).json({
    message: 'Patch complete',
    data: {
      data: 'some patch data',
    },
  });
};

const router = express.Router();
router.route('/').get(getTours).post(postTours);
router.route('/:id').get(getTour).patch(patchTours);

module.exports = router;
