const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model { }

Song.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preview_track_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'artist',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'song',
  }
);



module.exports = Song;




