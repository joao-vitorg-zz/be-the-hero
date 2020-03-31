const connection = require('../database/connection');

module.exports = {
  index(req, res) {
    const ong_id = req.headers.authorization;

    connection('incidents')
      .where('ong_id', ong_id)
      .select('*')
      .then((value) => {
        return res.json(value);
      });
  }
};
