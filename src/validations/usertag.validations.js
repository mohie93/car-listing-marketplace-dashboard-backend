const Joi = require('joi');
const DB = require('../configs/knex');

// helpers //
async function tagExists(payload) {
  try {
    const { tagId } = payload;
    const record = await DB('tags').where({ id: tagId }).select('*');
    return Object.keys(record).length > 0;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function userExists(payload) {
  try {
    const { userId } = payload;
    const record = await DB('users').where({ id: userId }).select('*');
    return Object.keys(record).length > 0;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// helpers finish //

exports.validateCreateRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      tagId: Joi.string().required(),
      userId: Joi.string().required(),
    });
    await schema.validateAsync(req.body);

    const tagIsExists = await tagExists(req.body);
    const userIsExists = await userExists(req.body);

    if (!tagIsExists) res.status(400).json({ message: 'Invalid tag' });
    if (!userIsExists) res.status(400).json({ message: 'Invalid user' });

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
    const { id, type } = req.params;
    if (!id) res.status(400).json({ message: 'Id param is missing' });
    if (!type) res.status(400).json({ message: 'type param is missing' });

    if (!['user', 'tag'].includes(type)) res.status(400).json({ message: 'type must be in [user, tag]' });

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

exports.validateSearchByRequest = (req, res, next) => {
  try {
    const { needle } = req.params;
    if (!needle) res.status(400).json({ message: 'search key param is required' });
    next();
  } catch (error) {
    res.status(422).json({ message: error.toString() });
  }
};