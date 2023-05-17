// const sequelize = require('../config/connection');
// const Artist = require('../models/artist.js');
// const fetch = require('isomorphic-fetch');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const artistData = await fetchArtistsFromAPI();
//   await Artist.bulkCreate(artistData);
// };

// async function fetchArtistsFromAPI() {
//   const response = await fetch('https://api.deezer.com/chart/0/artists?limit=50');
//   const data = await response.json();

//   const artists = data.data.map((artist) => ({
//     name: artist.name,
//     picture: artist.picture,
//     link: artist.link,
//   }));
//   return artists;
// }

// seedDatabase();


const sequelize = require('../config/connection');
const {User, Artist, Song}=require('../models/index')
// const Artist = require('../models/artist.js');
// const Song = require('../models/song');
const userData=require('./userData.json');

const fetch = require('isomorphic-fetch');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const artistData = await fetchArtistsFromAPI();
  await Artist.bulkCreate(artistData);

  const songData = await fetchSongsFromAPI();
  await Song.bulkCreate(songData);

  // const userData = await fetchSongsFromAPI();
  await User.bulkCreate(userData);
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
  return artists;
}

async function fetchSongsFromAPI() {
  const response = await fetch('https://api.deezer.com/chart/0/artists?limit=50');
  const data = await response.json();

  const artist = data.data.map((artist) => ({
    artist_id: artist.id
  }));
 const randomSongs=`https://api.deezer.com/artist/${artist}/top?limit=4`;

 const songResponse=await fetch(randomSongs);
 const songs=await songResponse.json();

 const song=songs.data.map((song)=>({
  id: song.id,
  title: song.title,
  release_date: song.release_date,
  link: song.link
 }));
 return song;
}


// "https://api.deezer.com/artist/246791/top?limit=4"


seedDatabase();
