const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class UserSong extends Model {}

UserSong.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   user_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'user',
        key:'id',
      },
    },
    song_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'song',
        key:'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user-song',
  }
);

module.exports = UserSong;
