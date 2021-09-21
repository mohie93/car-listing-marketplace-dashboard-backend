'use strict';

exports.handle = (api) => async (req, res) => {
  try {
    const { statusCode, data } = await api(req, res);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, timeStamp: new Date().toISOString() });
  }
};