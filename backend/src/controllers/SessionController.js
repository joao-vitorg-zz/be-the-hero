const connection = require('../database/connection');

module.exports = {
  create(req, res) {
    const { id } = req.body;

    connection('ongs')
      .where('id', id)
      .select('name')
      .first()
      .then((ong) => {
        if (!ong) {
          return res.status(400).json({ error: 'No ONG found with this ID.' });
        }

        return res.json(ong);
      });
  }
};
