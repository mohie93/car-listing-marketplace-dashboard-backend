'use strict';

const apiHandler = require('../middlewares/apiHandler');
const carsListingController = require('../controllers/carsListing.controller');
const validator = require('../validations/user.validation');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(carsListingController.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(carsListingController.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(carsListingController.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(carsListingController.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(carsListingController.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(carsListingController.searchBy));
router.get('/sort/:attribute/:direction', validator.validateSortByRequest, apiHandler.handle(carsListingController.sortBy));

module.exports = router;