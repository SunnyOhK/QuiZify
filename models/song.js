// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../config/connection');

// class Song extends Model { }

// Song.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     release_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     link: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     artist_id: {
//       type: DataTypes.STRING,
//       references: {
//         model: 'artist',
//         key: 'id'
//       }
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'user',
//         key: 'id'
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'song',
//   }
// );



// module.exports = Song;
