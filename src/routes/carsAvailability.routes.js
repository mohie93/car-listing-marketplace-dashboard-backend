'use strict';

const apiHandler = require('../middlewares/apiHandler');
const carsAvailabilityController = require('../controllers/carsAvailability.controller');
const validator = require('../validations/user.validations');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(carsAvailabilityController.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(carsAvailabilityController.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(carsAvailabilityController.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(carsAvailabilityController.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(carsAvailabilityController.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(carsAvailabilityController.searchBy));
router.get('/sort/:attribute/:direction', validator.validateSortByRequest, apiHandler.handle(carsAvailabilityController.sortBy));

module.exports = router;