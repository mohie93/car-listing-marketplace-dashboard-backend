'use strict';

const apiHandler = require('../middlewares/apiHandler');
const usersController = require('../controllers/users.controller');
const validator = require('../validations/user.validation');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(usersController.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(usersController.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(usersController.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(usersController.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(usersController.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(usersController.searchBy));
router.get('/sort/:attribute/:direction', validator.validateSortByRequest, apiHandler.handle(usersController.sortBy));

module.exports = router;