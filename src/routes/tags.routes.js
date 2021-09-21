'use strict';

const apiHandler = require('../middlewares/apiHandler');
const tagsController = require('../controllers/tags.controller');
const validator = require('../validations/tag.validation');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(tagsController.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(tagsController.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(tagsController.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(tagsController.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(tagsController.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(tagsController.searchBy));
router.get('/sort/:attribute/:direction', validator.validateSortByRequest, apiHandler.handle(tagsController.sortBy));

module.exports = router;