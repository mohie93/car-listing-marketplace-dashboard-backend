const apiHandler = require('../middlewares/apiHandler');
const rolesController = require('../controllers/roles.controller');
const validator = require('../validations/role.validations');
const router = require('express').Router();

router.get('/', validator.validateGetAllRequest, apiHandler.handle(rolesController.index));
router.get('/:id', validator.validateGetByIdRequest, apiHandler.handle(rolesController.show));
router.post('/', validator.validateCreateRequest, apiHandler.handle(rolesController.create));
router.patch('/:id', validator.validateUpdateRequest, apiHandler.handle(rolesController.update));
router.delete('/:id', validator.validateDestroyRequest, apiHandler.handle(rolesController.destroy));
router.get('/search/:needle', validator.validateSearchByRequest, apiHandler.handle(rolesController.searchBy));
router.get('/sort/:attribute/:direction', validator.validateSortByRequest, apiHandler.handle(rolesController.sortBy));

module.exports = router;