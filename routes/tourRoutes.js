const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();
router.route('/').get(tourController.getTours).post(tourController.postTours);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTours);

module.exports = router;
