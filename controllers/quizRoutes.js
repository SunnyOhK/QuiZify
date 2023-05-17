const fetch = require('isomorphic-fetch');
const Artist = require('../models/Artist');
const { Howl } = require('howler');

async function getRandomArtists() {
  try {
    const artists = await Artist.findAll();
    const shuffledArtists = shuffleArray(artists);
    const randomArtists = shuffledArtists.slice(0, 4);
    console.log(randomArtists);
    return randomArtists.map(artist=>artist.toJSON());
  } catch (err) {
    throw new Error('Error getting artists');
}
}

async function getPreviewTrack(artistID) {
  try {
    const response = await fetch(`https://api.deezer.com/artist/${artistID}/top?limit=5`);
    if (!response.ok) {
      throw new Error('Error getting preview track');
    }
    const data = await response.json();
    const previewTracks = data.data.map(track => track.preview);
    const randomTrack = Math.floor(Math.random() * previewTracks.length);
    const previewTrackUrl = previewTracks[randomTrack];
    console.log('Preview Track URL:', previewTrackUrl);
    return previewTracks[randomTrack];
  } catch (err) {
    throw new Error('Error getting preview track');
  }
}

async function startQuiz(req, res) {
  try {
    const artists = await getRandomArtists();
    // const artistRounds = generateArtistRounds(artists, 5);
    const previewTrackUrls = await Promise.all(artists.map(artist => getPreviewTrack(artist.id)));

    const sound = new Howl({
      src: [previewTrackUrls[0]],
      format: ['mp3'],
      autoplay: true,
      
    });

    
    res.render('gameArtistName', { artists, previewTrackUrls });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting artists');
  }
}


function generateArtistRounds(artists, rounds) {
  const shuffledArtists = shuffleArray(artists);
  const artistRounds = [];

  const numArtistsPerRound = Math.ceil(artists.length / rounds);

  for (let i = 0; i < rounds; i++) {
    const roundArtists = shuffledArtists.slice(i * numArtistsPerRound, (i + 1) * numArtistsPerRound);
    artistRounds.push(roundArtists);
  }

  return artistRounds;
}


function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i=shuffledArray.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

module.exports = {
  startQuiz,
};