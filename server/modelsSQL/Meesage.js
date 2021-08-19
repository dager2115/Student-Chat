const { STRING, ENUM, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define('message', {
    message:{
      type: STRING,
      allowNull: false,
    }
  });
};