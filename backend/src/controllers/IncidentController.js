const connection = require('../database/connection');

module.exports = {
  create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    connection('ongs')
      .where('id', ong_id)
      .first()
      .then((ong) => {
        if (!ong) {
          return res.status(401).json({ error: 'Acesso negado' });
        }

        connection('incidents')
          .insert({
            title,
            description,
            value,
            ong_id
          })
          .then(([id]) => {
            return res.json({ id });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      });
  },

  index(req, res) {
    const { page = 1 } = req.query;

    connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .then((value) => {
        connection('incidents')
          .count()
          .then(([{ 'count(*)': count }]) => {
            res.header('X-Total-Count', count);

            return res.json(value);
          });
      });
  },

  delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()
      .then((value) => {
        if (value.ong_id !== ong_id) {
          return res.status(401).json({ error: 'Acesso negado' });
        }

        connection('incidents')
          .where('id', id)
          .delete()
          .then(() => {
            return res.status(202).send();
          });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};
