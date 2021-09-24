const UserTag = require('../models/userTag.model.js');

exports.index = async (req, res) => {
  const records = await UserTag.getAll();
  return records ? { statusCode: 200, data: records } : { statusCode: 404, data: [] };
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const record = await UserTag.getById(id);
  return record ? { statusCode: 200, data: record } : { statusCode: 404, data: {} };
};

exports.create = async (req, res) => {
  const record = new UserTag(req.body);
  return (await record.save()) ? { statusCode: 201, data: record } : { statusCode: 422, data: 'unprocessable entity' };
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  return (await UserTag.update(id, payload))
    ? { statusCode: 200, data: { message: 'updated!' } }
    : { statusCode: 422, data: { message: 'unprocessable entity' } };
};

exports.searchBy = async (req, res) => {
  const { needle } = req.params;
  const records = await UserTag.searchBy(needle);
  return records ? { statusCode: 200, data: records } : { statusCode: 404, data: [] };
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  return (await UserTag.destroy(id)) ? { statusCode: 204, data: {} } : { statusCode: 422, data: 'unprocessable entity' };
};