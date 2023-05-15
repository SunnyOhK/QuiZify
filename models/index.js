const User = require('./user');
const Song = require('./song');
const Artist = require('./artist');
const UserSong = require('./usersongs');

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


// Song belongToMany User (through UserSong)
Song.belongsToMany(User, {
    through: {
        model: UserSong
    },
    as: 'songs'
});
User.belongsToMany(Song, {
    through: {
        model: UserSong
    },
    as: 'songs'
});


module.exports = { User, Artist, Song, UserSong };
