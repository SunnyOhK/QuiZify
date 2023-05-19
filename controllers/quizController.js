const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const { Artist, Song } = require('../models');

// Fetch a random set of 4 artists from the database
async function getRandomArtists() {
	try {
		const artists = await Artist.findAll({
			include: Song,
		});

		const shuffledArtists = shuffleArray(artists);
		const randomArtists = shuffledArtists.slice(0, 4);

		return randomArtists.map(artist => artist.toJSON());
	} catch (err) {
		console.error(err);
		throw new Error('Error getting artists');
	}
}

// Fetch the song associated with the random artist from our database
async function getPreviewTrack(artistID) {
	try {
		const song = await Song.findOne({ where: { artist_id: artistID } });

		if (!song) {
			throw new Error('Your song cannot be found');
		}

		return song.preview_track_url;
	} catch (err) {
		throw new Error('Error getting preview track');
	}
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
	const shuffledArray = [...array];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

// GET route for rendering the gameArtistName.handlebars template
router.get('/', async (req, res) => {
	try {
		const maxRounds = 5;
		const round = req.session.round || 0;
		let score = req.session.score || 0;

		if (round >= maxRounds) {
			return res.redirect('/results');
		}

		const artists = await getRandomArtists();
		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
		const previewTrackUrl = await getPreviewTrack(randomArtist.id);

		if (req.query.artistId && req.query.artistId === randomArtist.id.toString()) {
			const remainingTime = req.session.remainingTime || 0;
			score += remainingTime * 10;
			req.session.score = score;
		}

		req.session.remainingTime = 30;
		req.session.score = score;
		req.session.round = round + 1;

		return res.render('gameArtistName', {
			layout: 'gameboard-layout',
			artists,
			previewTrackUrl,
			score,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).render('error', {
			layout: 'gameboard-layout',
			message: 'Error getting artists',
		});
	}
});

module.exports = router;
