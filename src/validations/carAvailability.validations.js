const Joi = require('joi');

exports.validateCreateRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      // carId, startAt, endAt
      carId: Joi.string().required(),
      startAt: Joi.date().required(),
      endAt: Joi.date().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (errors) {
    const errorsMessages = errors.details.map((error) => error.message);
    res.status(422).json({ message: errorsMessages });
  }
};

exports.validateGetAllRequest = (req, res, next) => {
  try {
    // TODO: @Mohie Think about validation case or remove it.
    next();
  } catch (error) {
    res.status(422).json({ message: error.toString() });
  }
};

exports.validateGetByIdRequest = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Id param is missing' });
    next();
    // TODO: @Mohie Think about validation case or remove it.
  } catch (error) {
    res.status(422).json({ message: error.toString() });
  }
};

exports.validateDestroyRequest = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Id param is missing' });
    next();
  } catch (error) {
    res.status(422).json({ message: error.toString() });
  }
};

exports.validateSortByRequest = async (req, res, next) => {
  try {
    const { attribute, direction } = req.params;
    if (!attribute) res.status(400).json({ message: 'attribute param is required' });
    if (!direction) res.status(400).json({ message: 'direction param is required' });
    const schema = Joi.object({
      attribute: Joi.string().required().valid( 'startAt', 'endAt'),
      direction: Joi.string().required().valid('asc', 'desc').default('asc'),
    });
    await schema.validateAsync({ attribute, direction });
    next();
  } catch (errors) {
    const errorsMessages = errors.details.map((error) => error.message);
    res.status(422).json({ message: errorsMessages });
  }
};

exports.validateSearchByRequest = (req, res, next) => {
  try {
    const { needle } = req.params;
    if (!needle) res.status(400).json({ message: 'search key param is required' });
    next();
  } catch (error) {
    res.status(422).json({ message: error.toString() });
  }
};

exports.validateUpdateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Id param is missing' });
    const schema = Joi.object({
      id: Joi.string().required(),
      carId: Joi.string().required(),
      startAt: Joi.date().required(),
      endAt: Joi.date().required(),
    });
    await schema.validateAsync({ ...req.body, id });
    next();
  } catch (errors) {
    const errorsMessages = errors.details.map((error) => error.message);
    res.status(422).json({ message: errorsMessages });
  }
};