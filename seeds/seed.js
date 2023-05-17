const sequelize = require('../config/connection');

const Artist = require('../models/artist');
const Song = require('../models/song');
const User = require('../models/user');

// const { User, Artist, Song } = require('../models/index');
const Artist = require('../models/artist.js');
const Song = require('../models/song');
const User = require('../models/user');
const userData = require('./userData.json');


const fetch = require('isomorphic-fetch');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const artistData = await fetchArtistsFromAPI();
  const artists = await Artist.bulkCreate(artistData, { returning: true });

  for (let artist of artists) {
    const songData = await fetchSongsFromAPI(artist.id);

    if (songData) {
      const song = {
        title: songData.title,
        release_date: songData.release_date,
        link: songData.link,
        artistId: artist.id,
      };

      await Song.create(song);
    }
  }
};

const syncAndSeedDatabase = async () => {
  const userData = [];


  await User.bulkCreate(userData);

  await seedDatabase();
=======

  await User.bulkCreate(userData);

  const artistData = await fetchArtistsFromAPI();
  await Artist.bulkCreate(artistData);

  const songData = await fetchSongsFromAPI();
  await Song.bulkCreate(songData);

  // const userData = await fetchSongsFromAPI();


};



async function fetchArtistsFromAPI() {
  const response = await fetch('https://api.deezer.com/chart/0/artists?limit=50');
  const data = await response.json();

  const artists = data.data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    picture: artist.picture,
    link: artist.link,
  }));
  // console.log(artists)
  return artists;
}


async function fetchSongsFromAPI(artistId) {
  const response = await fetch(`https://api.deezer.com/artist/${artistId}/top?limit=1`);
  const data = await response.json();
  console.log(data);

  if (!Array.isArray(data.data) || !data.data.length === 0) {
    console.error(`No songs found for artist with id ${artistId}`);
    return null;
  }

  const song = {
    title: data.data[0]?.title || '',
    link: data.data[0]?.link || '',
  };
  return song;
}

syncAndSeedDatabase();

async function fetchSongsFromAPI() {
  const response = await fetch('https://api.deezer.com/chart/0/artists?limit=50');
  const data = await response.json();
  // console.log(data)

  const artist = data.data.map((artist) => ({
    id: artist.id
  }));
  console.log(artist)
  const randomSongs = `https://api.deezer.com/artist/${artist.id}/top?limit=4`;

  const songResponse = await fetch(randomSongs);
  const differentSongs = await songResponse.json();
console.log(differentSongs)

  const song = differentSongs.map((song) => ({
    id: song.id,
    title: song.title,
    release_date: song.release_date,
    link: song.link
  }));
  
  return song;
}

// "https://api.deezer.com/artist/246791/top?limit=4"

seedDatabase(); 

