const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

//defining param middleware
// router.param('id', tourController.checkId);


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getTours);

//defining route params
router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTour);

module.exports = router;
