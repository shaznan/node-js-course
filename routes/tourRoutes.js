const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

//defining param middleware
// router.param('id', tourController.checkId);

//defining route params
router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours);

module.exports = router;
