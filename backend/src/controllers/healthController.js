const db = require('../database/db');

const healthCheck = async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Database connection failed');
  }
};

module.exports = {
  healthCheck,
};
