const Artist = require('./artist');
const Song = require('./song');
const User = require('./user');

// Associations 
// Songs belongs to Artist
Song.belongsTo(Artist, {
    foreignKey: 'artist_id',
});
// An Artist has many songs
Artist.hasMany(Song, {
    foreignKey: 'artist_id',
    onDelete: 'CASCADE',
});

// Song belongTo User

Song.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Song, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


module.exports = { Artist, User, Song };
