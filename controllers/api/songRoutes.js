const router = require('express').Router();
const { Song, Artist, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const songData = await Song.findAll({ 
      include: [{
        model: Artist,
        as: 'songs',
        attributes: ['name'],
      }],
      attributes: ['id', 'title', 'artist_id']
    });
    res.render('profile.handlebars', { songs: songData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Song.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!songData) {
      res.status(404).json({ message: 'No song found with that id!' });
      return;
    }
    res.status(200).json(songData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;