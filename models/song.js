const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Song extends Model {}

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    readable: {
      type: DataTypes.BOOLEAN,
    },
    // The url of the track on Deezer
    link:{
      type: DataTypes.URL,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.OBJECT,
      references:{
        model:'artist',
        key:'id'
      }
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
