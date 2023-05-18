const sequelize = require('../config/connection');
const Artist = require('../models/artist');
const Song = require('../models/song');
const User = require('../models/user');
const userData = require('./userData.json');

const fetch = require('isomorphic-fetch');

// Fetch Artist Data
async function fetchArtistsFromAPI() {
  const response = await fetch('https://api.deezer.com/chart/0/artists?limit=40');
  const data = await response.json();

  const artists = data.data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    picture: artist.picture,
    link: artist.link,
  }));
  return artists;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Fetch Songs
async function fetchSongsFromAPI(artistId) {
  const response = await fetch(`https://api.deezer.com/artist/${artistId}/top?limit=1`);
  const data = await response.json();

  if (!Array.isArray(data.data) || data.data.length === 0) {
    console.error(`No songs found for artist with id ${artistId}`);
    return null;
  }

  const trackId = data.data[0].id;
  const previewTrackUrl = data.data[0].preview;
  console.log('Preview Track URL:', previewTrackUrl);

  const song = {
    id: trackId,
    title: data.data[0].title || '',
    release_date: data.data[0].release_date || '',
    preview_track_url: previewTrackUrl,
  };
  return song;
}

const seedDatabase = async () => {
  const artistData = await fetchArtistsFromAPI();
  const artists = await Artist.bulkCreate(artistData, { returning: true });

  for (let artist of artists) {
    const songData = await fetchSongsFromAPI(artist.id);

    if (songData) {
      const song = {
        id:songData.id,
        title: songData.title,
        release_date: songData.release_date,
        preview_track_url: songData.preview_track_url,
        artist_id: artist.id,
      };
      // console.log(song);

      await Song.create(song);
    }
  }

};

const syncAndSeedDatabase = async () => {
  
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await seedDatabase();
};


syncAndSeedDatabase();
