const router = require('express').Router();
const { Song, User, Artist } = require('../models');


async function getName(req){
      const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const name = dbUser.get({ plain: true });
    return name;
}

async function getSongs(req){
      const dbSong = await Song.findAll({
      where: {
        id: req.body.id,
        title: req.body.title,
      },
      include: { model: Artist, attributes: ['name'] },
    })
    const songs=dbSong.map((song)=>song.get({plain:true}));
    return songs;
}
// Get username
router.get('/', async (req, res) => {
  try {
    const name=getName(req);
    const songs=getSongs(req);

    res.render('profile', {
      layout: 'main',
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