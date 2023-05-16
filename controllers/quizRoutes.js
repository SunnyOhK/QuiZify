const fetch = require('isomorphic-fetch');
// const Artist = require('../models/Artist');

async function startQuiz(req, res) {
  try {
    const artists = await getRandomArtists();
    res.render('gameArtistName', { artists });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting artists');
  }
}

async function getRandomArtists() {
  const response = await fetch('https://api.deezer.com/chart/0/artists');
  const data = await response.json();

  const artists = data.data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    picture: artist.picture,
    
  }));
  return artists;
}

module.exports = {
  startQuiz,
};