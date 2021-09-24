'use strict';

const apiHandler = require('../middlewares/apiHandler');
const usersTags = require('../controllers/usersTag.controller');
const validator = require('../validations/userTag.validations');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(usersTags.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(usersTags.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(usersTags.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(usersTags.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(usersTags.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(usersTags.searchBy));

module.exports = router;