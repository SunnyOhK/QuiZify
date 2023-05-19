const router = require('express').Router();
const { Song, User, Artist } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      attributes: {
        username: req.body.username,
      },
    });
    const name = dbUser.get({ plain: true });

    const { count, rows } = await Song.findAndCountAll({
      attributes: {
        id: req.body.id,
        title: req.body.title,
      },
      include: { model: Artist, attributes: ['name'] },

      offset: 10,
      limit: 5
    });

    const songs =rows.map((song) => song.get({ plain: true }));

    res.render('profile', {
      layout: 'pro-main',
      name,
      songs,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const songData = await Song.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!songData) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }
    res.status(200).json(songData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;