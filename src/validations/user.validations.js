const Joi = require('joi');
const DB = require('../configs/knex');

// helpers //
async function getUserByEmail(payload) {
  try {
    const { email } = payload;
    const record = await DB('users').where({ email }).select('*');
    return (Object.keys(record).length > 0 && record.email === email);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function roleExists(payload) {
  try {
    const { roleId } = payload;
    const record = await DB('roles').where({ id: roleId }).select('*');
    return Object.keys(record).length > 0;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// helpers finish //

exports.validateCreateRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      roleId: Joi.string().uuid().required(),
    });

    await schema.validateAsync(req.body);

    const roleIsExists = await roleExists(req.body);
    const userEmailInUser = await getUserByEmail(req.body);

    if (!roleIsExists) res.status(400).json({ message: 'Invalid role' });
    if (userEmailInUser) res.status(400).json({ message: 'Email in use' });

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
      attribute: Joi.string().required().valid('firstName', 'lastName', 'createdAt', 'email'),
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
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      roleId: Joi.string().uuid().required(),
    });
    await schema.validateAsync({ ...req.body, id });

    const roleIsExists = await roleExists(req.body);
    const userEmailInUser = await getUserByEmail(req.body);

    if (!roleIsExists) res.status(400).json({ message: 'Invalid role' });
    if (userEmailInUser) res.status(400).json({ message: 'Email in use' });

    next();
  } catch (errors) {
    const errorsMessages = errors.details.map((error) => error.message);
    res.status(422).json({ message: errorsMessages });
  }
};