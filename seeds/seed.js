const sequelize = require('../config/connection');
const Artist = require('../models/artist.js');
const fetch = require('isomorphic-fetch');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const artistData = await fetchArtistsFromAPI();
  await Artist.bulkCreate(artistData);
};

async function fetchArtistsFromAPI() {
  const response = await fetch('https://api.deezer.com/chart/0/artists?limit=50');
  const data = await response.json();

  const artists = data.data.map((artist) => ({
    name: artist.name,
    picture: artist.picture,
    link: artist.link,
  }));
  return artists;
}

seedDatabase();
