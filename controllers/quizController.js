const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const Artist = require('../models/Artist');
// const { Howl } = require('howler');
// let sounds = [];

async function getRandomArtists() {
	try {
		const artists = await Artist.findAll();
		const shuffledArtists = shuffleArray(artists);
		const randomArtists = shuffledArtists.slice(0, 4);
		console.log(randomArtists);
		return randomArtists.map(artist => artist.toJSON());
	} catch (err) {
		throw new Error('Error getting artists');
	}
}

async function getPreviewTrack(artistID) {
	try {
		console.log('Artist ID:', artistID);
		const response = await fetch(`https://api.deezer.com/artist/${artistID}/top?limit=5`);
		console.log('API Response:', response);
		if (!response.ok) {
			throw new Error('Error getting preview track');
		}
		const data = await response.json();
		const topTracks = data.data;
		const previewTracks = data.data.map(track => track.preview);
		const randomTrack = Math.floor(Math.random() * previewTracks.length);
		const previewTrackUrl = previewTracks[randomTrack];
		console.log('Preview Track URL:', previewTrackUrl);
		return previewTrackUrl;
	} catch (err) {
		throw new Error('Error getting preview track');
	}
}

// async function startQuiz(req, res) {
// 	try {
// 		const artists = await getRandomArtists();
// 		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
// 		const previewTrackUrl = await getPreviewTrack(randomArtist.id);

// 		const sound = new Howl({
// 			src: [previewTrackUrl],
// 			format: ['mp3'],
// 			autoplay: true,
// 		});
// 		sounds.push(sound);
// 		console.log(sounds);

// 		res.render('gameArtistName', { artists });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send('Error getting artists');
// 	}
// }

// function playSound() {
// 	const sound = sounds[0];
// 	if (sound) {
// 		sound.play();
// 	}
// }

function shuffleArray(array) {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

router.get('/', async (req, res) => {
	try {
		const artists = await getRandomArtists();
		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
		const previewTrackUrl = await getPreviewTrack(randomArtist.id);

		// const sound = new Howl({
		// 	src: [previewTrackUrl],
		// 	format: ['mp3'],
		// 	autoplay: true,
	

		res.render('gameArtistName', { artists });
	} catch (err) {
		console.error(err);
		res.status(500).send('Error getting artists');
	}
});

module.exports = router;

