const express = require('express');
const router = express.Router();
const { Artist, Song } = require('../models');

// Fetch a random set of 4 artists from the database
async function getRandomArtists() {
	try {
		const artists = await Artist.findAll({
			include: {
				model: Song,
				required: true 
			}
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

async function getSongData(previewTrackUrl) {
	try {
		const song = await Song.findOne({ where: { preview_track_url: previewTrackUrl } });

		if (!song) {
			throw new Error('Your song cannot be found');
		}
		
		const artist = await Artist.findOne({ where: { id: song.artist_id } });
		if (!artist) {
			throw new Error('Your artist cannot be found');
		}

		const songData = song.toJSON();
		songData.artistName = artist.name;
		return songData;
	} catch (err) {
		throw new Error('Error getting song data');
	}
}

// GET route for rendering the gameArtistName.handlebars template
let playedSongs = [];

router.get('/', async (req, res) => {
	try {
		const artists = await getRandomArtists();
		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
		const previewTrackUrl = await getPreviewTrack(randomArtist.id);

		req.session.randomArtist = randomArtist;

		return res.render('gameArtistName', {
			layout: 'gameboard-layout',
			artists,
			previewTrackUrl,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error getting artists' });
	}
});

router.get('/results', async (req, res) => {
	try {
		const randomArtistId = req.session.randomArtist.id;
		const previewTrackUrl = await getPreviewTrack(randomArtistId);
		const songData = await getSongData(previewTrackUrl);
		
		playedSongs.push(songData);
		req.session.playedSongs = playedSongs;
		req.session.artistName = songData.artistName;
		console.log('Song Data:', songData);
		console.log('Played Song:', playedSongs);
		res.render('results', {
			layout: 'gameboard-layout',
			songs: req.session.playedSongs,
			songData: songData,
			
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Error getting song data');
	}
});

module.exports = router;
