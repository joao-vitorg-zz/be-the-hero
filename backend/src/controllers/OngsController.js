const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    connection('ongs')
      .insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      })
      .then(() => {
        return res.status(201).json({ id });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  index(req, res) {
    connection('ongs')
      .select('*')
      .then((value) => {
        return res.json(value);
      });
  }
};
