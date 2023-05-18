const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const Artist = require('../models/artist');
const Song = require('../models/song');


// this will fetch a random set of 4 artists from the database
async function getRandomArtists() {
	try {
		const artists = await Artist.findAll();
		console.log('Retrieved Artists:', artists);
		const shuffledArtists = shuffleArray(artists);
		const randomArtists = shuffledArtists.slice(0, 4);
		console.log('Random Artists', randomArtists);
		return randomArtists.map(artist => artist.toJSON());
	} catch (err) {
		throw new Error('Error getting artists');
	}
}

// !THIS WORKS DON'T DELETE.
// async function getPreviewTrack(artistID) {
// 	try {
// 		console.log('Artist ID:', artistID);
// 		const response = await fetch(`https://api.deezer.com/artist/${artistID}/top?limit=5`);
// 		console.log('API Response:', response);
// 		if (!response.ok) {
// 			throw new Error('Error getting preview track');
// 		}
// 		const data = await response.json();
// 		const topTracks = data.data;
// 		const previewTracks = data.data.map(track => track.preview);
// 		const randomTrack = Math.floor(Math.random() * previewTracks.length);
// 		const previewTrackUrl = previewTracks[randomTrack];
// 		console.log('Preview Track URL:', previewTrackUrl);
// 		return previewTrackUrl;
// 	} catch (err) {
// 		throw new Error('Error getting preview track');
// 	}
// }

// this will fetch the song associated with the random artist from our database
async function getPreviewTrack(artistID) {
	try {
		const song = await Song.findOne({ where: { artist_id: artistID } });
		if (!song) {
			throw new Error('Your song cannot be found');
		}
		const previewTrackUrl = song.preview_track_url;
		console.log('Preview Track URL:', previewTrackUrl);
		return previewTrackUrl;
	} catch (err) {
		throw new Error('Error detected.  Cannot get preview track');
	}
}

//this is the Fisher-Yates shuffle algorithm
function shuffleArray(array) {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

// this is our GET route that handles rendering the gameArtistName.handlebars template
router.get('/', async (req, res) => {
	try {
		const artists = await getRandomArtists();
		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
		const previewTrackUrl = await getPreviewTrack(randomArtist.id);
		console.log('Preview Track URL:', previewTrackUrl);


		res.render('gameArtistName', { artists, previewTrackUrl });
	} catch (err) {
		console.error(err);
		res.status(500).send('Error getting artists');
	}
});

module.exports = router;

