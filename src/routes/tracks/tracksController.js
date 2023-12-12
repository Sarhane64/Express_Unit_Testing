const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tracksById = await db.query('SELECT * from track WHERE id = ?', [id]);
    res.status(200).json(tracksById[0][0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.sendStatus(500);
  }
};

const getAll = async (req, res) => {
  try {
    const test = await db.query('SELECT * from track');
    // eslint-disable-next-line no-console
    console.log(test);
    res.status(200).json(test[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.sendStatus(500);
  }
};

const postTracks = (req, res) => {
  const { title, youtube_url, id_album } = req.body;

  db.query(
    'INSERT INTO tracks(title, youtube_url, id_album) VALUES (?, ?, ?)',
    [title, youtube_url, id_album]
  )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
};

const updateTracks = (req, res) => {
  res.status(200).send('Update route is OK');
};

const deleteTracks = (req, res) => {
  res.status(200).send('Delete route is OK');
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
