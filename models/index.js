const User = require('./user');
const Song = require('./song');
const Artist = require('./artist');

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
    foreignKey: 'user__id',
    onDelete: 'CASCADE',
});


module.exports = { User, Artist, Song };
